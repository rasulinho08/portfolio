# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
import sqlite3
import bcrypt
from datetime import datetime, timedelta
import os

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['JWT_SECRET_KEY'] = 'your-super-secret-jwt-key-2024'  # Change this in production
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize extensions
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5174', 'http://localhost:5175'])

# Database path
DB_PATH = 'portfolio.db'

def get_db_connection():
    """Get database connection"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row  # This allows us to access columns by name
    return conn

def init_database():
    """Initialize database with tables"""
    conn = get_db_connection()
    
    # Create users table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create testimonials table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS testimonials (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            company TEXT,
            position TEXT,
            message TEXT NOT NULL,
            rating INTEGER DEFAULT 5,
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create contact_messages table
    conn.execute('''
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT,
            message TEXT NOT NULL,
            status TEXT DEFAULT 'unread',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Insert admin user if not exists
    admin_password = bcrypt.hashpw('admin123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    try:
        conn.execute('''
            INSERT OR IGNORE INTO users (username, email, password, role)
            VALUES (?, ?, ?, ?)
        ''', ('admin', 'admin@rasulmamishov.com', admin_password, 'admin'))
    except:
        pass
    
    # Insert test user if not exists
    test_password = bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    try:
        conn.execute('''
            INSERT OR IGNORE INTO users (username, email, password, role)
            VALUES (?, ?, ?, ?)
        ''', ('testuser', 'test@example.com', test_password, 'user'))
    except:
        pass
    
    # Sample testimonials removed - using only real user submissions
    # No longer inserting sample data to keep database clean
    
    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")

# =====================
# AUTH ROUTES
# =====================

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password required'}), 400
        
        print(f"🔐 Login attempt for: {email}")
        
        conn = get_db_connection()
        user = conn.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            (email, email)
        ).fetchone()
        conn.close()
        
        if not user:
            print(f"❌ User not found: {email}")
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # For now, simple password comparison (you can use bcrypt later)
        if user['password'] == password or bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            access_token = create_access_token(
                identity=str(user['id']),
                additional_claims={
                    'username': user['username'],
                    'email': user['email'],
                    'role': user['role']
                }
            )
            
            print(f"✅ Login successful for: {user['username']} (Role: {user['role']})")
            
            return jsonify({
                'message': 'Login successful',
                'token': access_token,
                'user': {
                    'id': user['id'],
                    'username': user['username'],
                    'email': user['email'],
                    'role': user['role']
                }
            })
        else:
            print(f"❌ Invalid password for: {email}")
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except Exception as e:
        print(f"❌ Login error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        if not username or not email or not password:
            return jsonify({'error': 'All fields required'}), 400
        
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400
        
        print(f"📝 Registration attempt: {username}, {email}")
        
        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        
        conn = get_db_connection()
        
        try:
            cursor = conn.execute('''
                INSERT INTO users (username, email, password)
                VALUES (?, ?, ?)
            ''', (username, email, hashed_password))
            
            user_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            access_token = create_access_token(
                identity=str(user_id),
                additional_claims={
                    'username': username,
                    'email': email,
                    'role': 'user'
                }
            )
            
            print(f"✅ Registration successful: {username}")
            
            return jsonify({
                'message': 'Registration successful',
                'token': access_token,
                'user': {
                    'id': user_id,
                    'username': username,
                    'email': email,
                    'role': 'user'
                }
            }), 201
            
        except sqlite3.IntegrityError:
            conn.close()
            return jsonify({'error': 'Username or email already exists'}), 400
            
    except Exception as e:
        print(f"❌ Registration error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# =====================
# TESTIMONIALS ROUTES
# =====================

@app.route('/api/testimonials', methods=['GET'])
def get_testimonials():
    try:
        conn = get_db_connection()
        
        if request.args.get('all') == 'true':
            testimonials = conn.execute(
                'SELECT * FROM testimonials ORDER BY created_at DESC'
            ).fetchall()
        else:
            testimonials = conn.execute(
                'SELECT * FROM testimonials WHERE status = "approved" ORDER BY created_at DESC'
            ).fetchall()
        
        conn.close()
        
        # Convert to list of dictionaries
        result = [dict(testimonial) for testimonial in testimonials]
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Error fetching testimonials: {str(e)}")
        return jsonify({'error': 'Failed to fetch testimonials'}), 500

@app.route('/api/testimonials', methods=['POST'])
def submit_testimonial():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        company = data.get('company', '')
        position = data.get('position', '')
        message = data.get('message')
        rating = data.get('rating', 5)
        
        if not name or not email or not message:
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        print(f"⭐ New testimonial from: {name}")
        
        conn = get_db_connection()
        cursor = conn.execute('''
            INSERT INTO testimonials (name, email, company, position, message, rating)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (name, email, company, position, message, int(rating)))
        
        testimonial_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return jsonify({
            'message': 'Testimonial submitted successfully! It will be reviewed before publication.',
            'id': testimonial_id
        }), 201
        
    except Exception as e:
        print(f"❌ Testimonial error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# =====================
# CONTACT ROUTES
# =====================

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject', 'General Inquiry')
        message = data.get('message')
        
        if not name or not email or not message:
            return jsonify({'error': 'Name, email, and message are required'}), 400
        
        print(f"📧 New contact message from: {name}")
        
        conn = get_db_connection()
        cursor = conn.execute('''
            INSERT INTO contact_messages (name, email, subject, message)
            VALUES (?, ?, ?, ?)
        ''', (name, email, subject, message))
        
        message_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        print(f"✅ Contact message saved with ID: {message_id}")
        
        return jsonify({
            'message': 'Message sent successfully! I will get back to you soon.',
            'id': message_id
        })
        
    except Exception as e:
        print(f"❌ Contact error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# =====================
# ADMIN ROUTES
# =====================

@app.route('/api/admin/stats', methods=['GET'])
@jwt_required()
def admin_stats():
    try:
        # Get current user info from JWT
        current_user = get_jwt_identity()
        print(f"🔐 Admin stats request from user ID: {current_user}")
        
        # Check if user is admin
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            conn.close()
            print(f"❌ Access denied - User role: {user['role'] if user else 'None'}")
            return jsonify({'error': 'Admin access required'}), 403
        
        # Get statistics
        stats = {}
        
        stats['totalUsers'] = conn.execute('SELECT COUNT(*) as count FROM users').fetchone()['count']
        stats['totalTestimonials'] = conn.execute('SELECT COUNT(*) as count FROM testimonials').fetchone()['count']
        stats['pendingTestimonials'] = conn.execute('SELECT COUNT(*) as count FROM testimonials WHERE status = "pending"').fetchone()['count']
        stats['totalMessages'] = conn.execute('SELECT COUNT(*) as count FROM contact_messages').fetchone()['count']
        stats['unreadMessages'] = conn.execute('SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"').fetchone()['count']
        
        conn.close()
        return jsonify(stats)
        
    except Exception as e:
        print(f"❌ Admin stats error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/testimonials', methods=['GET'])
@jwt_required()
def admin_get_testimonials():
    try:
        current_user = get_jwt_identity()
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        testimonials = conn.execute(
            'SELECT * FROM testimonials ORDER BY created_at DESC'
        ).fetchall()
        
        conn.close()
        
        result = [dict(testimonial) for testimonial in testimonials]
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Admin testimonials error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/testimonials/<int:testimonial_id>', methods=['PUT'])
@jwt_required()
def update_testimonial(testimonial_id):
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        status = data.get('status')
        
        if status not in ['approved', 'rejected', 'pending']:
            return jsonify({'error': 'Invalid status'}), 400
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        conn.execute(
            'UPDATE testimonials SET status = ? WHERE id = ?',
            (status, testimonial_id)
        )
        conn.commit()
        
        if conn.total_changes == 0:
            conn.close()
            return jsonify({'error': 'Testimonial not found'}), 404
        
        conn.close()
        print(f"✅ Testimonial {testimonial_id} updated to {status}")
        
        return jsonify({'message': 'Testimonial updated successfully'})
        
    except Exception as e:
        print(f"❌ Update testimonial error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/testimonials/<int:testimonial_id>', methods=['DELETE'])
@jwt_required()
def delete_testimonial(testimonial_id):
    try:
        current_user = get_jwt_identity()
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            conn.close()
            return jsonify({'error': 'Admin access required'}), 403
        
        # Delete the testimonial
        cursor = conn.execute('DELETE FROM testimonials WHERE id = ?', (testimonial_id,))
        conn.commit()
        
        if cursor.rowcount == 0:
            conn.close()
            return jsonify({'error': 'Testimonial not found'}), 404
        
        conn.close()
        print(f"✅ Testimonial {testimonial_id} deleted successfully")
        
        return jsonify({'message': 'Testimonial deleted successfully'})
        
    except Exception as e:
        print(f"❌ Delete testimonial error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/messages', methods=['GET'])
@jwt_required()
def admin_get_messages():
    try:
        current_user = get_jwt_identity()
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        messages = conn.execute(
            'SELECT * FROM contact_messages ORDER BY created_at DESC'
        ).fetchall()
        
        conn.close()
        
        result = [dict(message) for message in messages]
        print(f"📧 Returning {len(result)} contact messages")
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Admin messages error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/messages/<int:message_id>', methods=['PUT'])
@jwt_required()
def update_message(message_id):
    try:
        current_user = get_jwt_identity()
        data = request.get_json()
        status = data.get('status')
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        conn.execute(
            'UPDATE contact_messages SET status = ? WHERE id = ?',
            (status, message_id)
        )
        conn.commit()
        conn.close()
        
        return jsonify({'message': 'Message updated successfully'})
        
    except Exception as e:
        print(f"❌ Update message error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/admin/users', methods=['GET'])
@jwt_required()
def admin_get_users():
    try:
        current_user = get_jwt_identity()
        
        conn = get_db_connection()
        user = conn.execute('SELECT role FROM users WHERE id = ?', (int(current_user),)).fetchone()
        
        if not user or user['role'] != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        
        users = conn.execute(
            'SELECT id, username, email, role, created_at FROM users ORDER BY created_at DESC'
        ).fetchall()
        
        conn.close()
        
        result = [dict(user) for user in users]
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Admin users error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

# =====================
# HEALTH CHECK & DEBUG
# =====================

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'OK',
        'message': 'Flask Portfolio Server Running',
        'timestamp': datetime.now().isoformat(),
        'database': 'Connected'
    })

@app.route('/api/test-auth', methods=['GET'])
@jwt_required()
def test_auth():
    try:
        current_user = get_jwt_identity()
        print(f"🔍 Test Auth - User ID: {current_user}")
        
        conn = get_db_connection()
        user = conn.execute('SELECT * FROM users WHERE id = ?', (int(current_user),)).fetchone()
        conn.close()
        
        if user:
            return jsonify({
                'message': 'JWT Authentication working!',
                'user_id': current_user,
                'username': user['username'],
                'role': user['role']
            })
        else:
            return jsonify({'error': 'User not found'}), 404
            
    except Exception as e:
        print(f"❌ Test auth error: {str(e)}")
        return jsonify({'error': str(e)}), 500

# =====================
# ERROR HANDLERS
# =====================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# JWT Error handlers
@jwt.expired_token_loader
def expired_token_callback(jwt_header, jwt_payload):
    print("❌ JWT Token expired")
    return jsonify({'error': 'Token has expired'}), 401

@jwt.invalid_token_loader
def invalid_token_callback(error):
    print(f"❌ Invalid JWT Token: {error}")
    return jsonify({'error': 'Invalid token'}), 422

@jwt.unauthorized_loader
def missing_token_callback(error):
    print(f"❌ Missing JWT Token: {error}")
    return jsonify({'error': 'Authorization token is required'}), 401

# =====================
# MAIN
# =====================

if __name__ == '__main__':
    print("*** Initializing Flask Portfolio Server...")
    init_database()
    
    print("🚀 Flask Portfolio Server running on port 5000")
    print("🌐 Health check: http://localhost:5000/health")
    print("📊 Admin API: http://localhost:5000/api/admin/stats")
    print("")
    print("📋 Login Credentials:")
    print("   Admin: username=admin, password=admin123")
    print("   User:  username=testuser, password=password123")
    print("")
    print("✅ Ready for frontend at http://localhost:5173/")
    
    app.run(debug=True, port=5000, host='0.0.0.0')