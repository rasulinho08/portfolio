-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table  
CREATE TABLE testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    position TEXT,
    message TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (username, email, password, role) VALUES 
('admin', 'admin@rasulmamishov.com', 'admin123', 'admin');

-- Insert test user (password: password123)  
INSERT INTO users (username, email, password, role) VALUES 
('testuser', 'test@example.com', 'password123', 'user');

-- Insert sample testimonials
INSERT INTO testimonials (name, email, company, position, message, rating, status) VALUES 
('John Smith', 'john@example.com', 'Tech Solutions Inc', 'CTO', 'Rasul delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.', 5, 'approved'),
('Sarah Johnson', 'sarah@example.com', 'Digital Marketing Co', 'Project Manager', 'Working with Rasul was a fantastic experience. The project was completed on time and the code quality is excellent.', 5, 'approved');