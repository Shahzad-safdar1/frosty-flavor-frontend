
import React, { useState } from 'react';

export const SetupInstructions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'database' | 'backend' | 'frontend'>('database');

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Setup Instructions</h2>
      
      <div className="mb-4">
        <div className="flex border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'database' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('database')}
          >
            1. Database Setup
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'backend' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('backend')}
          >
            2. Backend Setup
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'frontend' ? 'border-b-2 border-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('frontend')}
          >
            3. Frontend Setup
          </button>
        </div>
      </div>

      {activeTab === 'database' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Database Setup with XAMPP and phpMyAdmin</h3>
          
          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 1: Install XAMPP</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Download XAMPP from <a href="https://www.apachefriends.org/download.html" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">https://www.apachefriends.org</a></li>
              <li>Install XAMPP by following the installation wizard</li>
            </ol>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 2: Start Apache and MySQL Services</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open the XAMPP Control Panel</li>
              <li>Start the Apache and MySQL modules by clicking on the "Start" buttons</li>
            </ol>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 3: Create Database in phpMyAdmin</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Open your browser and navigate to <code className="bg-gray-200 px-1 rounded">http://localhost/phpmyadmin</code></li>
              <li>Click on "New" in the left sidebar</li>
              <li>Enter "icecream_shop" as the database name and click "Create"</li>
            </ol>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 4: Create Ice Creams Table</h4>
            <p className="mb-2">Once your database is created, click on it in the left sidebar, then click on the "SQL" tab and paste the following SQL query:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`CREATE TABLE icecreams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  flavor VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  expiryDate DATE NOT NULL,
  category VARCHAR(50) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`}
            </pre>
            <p className="mt-2">Click "Go" to execute the query and create the table.</p>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 5: (Optional) Insert Sample Data</h4>
            <p className="mb-2">To add some sample data, click on the "SQL" tab again and paste:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`INSERT INTO icecreams (name, flavor, price, stock, expiryDate, category) VALUES
('Vanilla Dream', 'Vanilla', 3.99, 50, '2023-12-31', 'Dairy'),
('Chocolate Explosion', 'Chocolate', 4.50, 45, '2023-12-25', 'Dairy'),
('Strawberry Fields', 'Strawberry', 4.25, 30, '2023-12-20', 'Dairy'),
('Mango Tango', 'Mango', 4.99, 25, '2023-12-15', 'Sorbet'),
('Mint Chocolate Chip', 'Mint', 4.75, 35, '2023-12-22', 'Dairy');`}
            </pre>
            <p className="mt-2">Click "Go" to execute the query and insert the sample data.</p>
          </div>
        </div>
      )}

      {activeTab === 'backend' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Backend Setup (Node.js with Express)</h3>
          
          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 1: Create Backend Project</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Create a new folder named <code className="bg-gray-200 px-1 rounded">ice-cream-shop-backend</code></li>
              <li>Open a terminal in that folder and run <code className="bg-gray-200 px-1 rounded">npm init -y</code></li>
            </ol>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 2: Install Dependencies</h4>
            <p>Run the following command to install necessary packages:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`npm install express mysql2 cors dotenv`}
            </pre>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 3: Create .env File</h4>
            <p>Create a file named <code className="bg-gray-200 px-1 rounded">.env</code> in the root directory with the following content:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=icecream_shop
PORT=3001`}
            </pre>
            <p className="mt-2">Note: If you've set a password for your MySQL in XAMPP, replace the empty DB_PASSWORD with your actual password.</p>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 4: Create Database Connection File</h4>
            <p>Create a file named <code className="bg-gray-200 px-1 rounded">db.js</code> with the following content:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;`}
            </pre>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 5: Create Server File</h4>
            <p>Create a file named <code className="bg-gray-200 px-1 rounded">server.js</code> with the following content:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Route: Get all ice creams
app.get('/api/icecreams', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM icecreams ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching ice creams:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Get a single ice cream by ID
app.get('/api/icecreams/:id', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM icecreams WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Ice cream not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching ice cream:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Create a new ice cream
app.post('/api/icecreams', async (req, res) => {
  try {
    const { name, flavor, price, stock, expiryDate, category } = req.body;
    
    // Basic validation
    if (!name || !flavor || !price || stock === undefined || !expiryDate || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const [result] = await db.query(
      'INSERT INTO icecreams (name, flavor, price, stock, expiryDate, category) VALUES (?, ?, ?, ?, ?, ?)',
      [name, flavor, price, stock, expiryDate, category]
    );
    
    const [newIceCream] = await db.query('SELECT * FROM icecreams WHERE id = ?', [result.insertId]);
    
    res.status(201).json(newIceCream[0]);
  } catch (error) {
    console.error('Error creating ice cream:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Update an ice cream
app.put('/api/icecreams/:id', async (req, res) => {
  try {
    const { name, flavor, price, stock, expiryDate, category } = req.body;
    const { id } = req.params;
    
    // Basic validation
    if (!name || !flavor || !price || stock === undefined || !expiryDate || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const [result] = await db.query(
      'UPDATE icecreams SET name = ?, flavor = ?, price = ?, stock = ?, expiryDate = ?, category = ? WHERE id = ?',
      [name, flavor, price, stock, expiryDate, category, id]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ice cream not found' });
    }
    
    const [updatedIceCream] = await db.query('SELECT * FROM icecreams WHERE id = ?', [id]);
    
    res.json(updatedIceCream[0]);
  } catch (error) {
    console.error('Error updating ice cream:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route: Delete an ice cream
app.delete('/api/icecreams/:id', async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM icecreams WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ice cream not found' });
    }
    
    res.json({ message: 'Ice cream deleted successfully' });
  } catch (error) {
    console.error('Error deleting ice cream:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}
            </pre>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 6: Start the Server</h4>
            <p>Run the following command to start your backend server:</p>
            <pre className="bg-gray-800 text-white p-3 rounded overflow-x-auto">
              {`node server.js`}
            </pre>
            <p className="mt-2">You should see "Server running on port 3001" in the console.</p>
          </div>
        </div>
      )}

      {activeTab === 'frontend' && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Frontend Setup</h3>
          
          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 1: Update API URL (if needed)</h4>
            <p>The frontend is configured to connect to <code className="bg-gray-200 px-1 rounded">http://localhost:3001/api</code>. If your backend is running on a different URL, update the <code className="bg-gray-200 px-1 rounded">API_URL</code> constant in <code className="bg-gray-200 px-1 rounded">src/pages/Index.tsx</code>.</p>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 2: Run the Frontend</h4>
            <p>This frontend is already running if you're seeing this page. Just make sure the backend is running as well to see the full functionality.</p>
          </div>

          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Step 3: Testing the Application</h4>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Add a new ice cream using the form at the top of the page</li>
              <li>View the ice cream in the table below</li>
              <li>Edit an ice cream by clicking the "Edit" button</li>
              <li>Delete an ice cream by clicking the "Delete" button</li>
            </ol>
          </div>
          
          <div className="rounded bg-gray-100 p-4">
            <h4 className="font-semibold mb-2">Troubleshooting</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>If you see "Could not connect to the server" message, make sure the backend server is running.</li>
              <li>Check that XAMPP's MySQL service is running.</li>
              <li>Ensure the database and table are created correctly.</li>
              <li>Check the browser's console for any errors.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
