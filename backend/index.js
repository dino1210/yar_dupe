const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(express.json());  // For parsing JSON request bodies
app.use(cors());          // Enable Cross-Origin Request sharing

// MySQL database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',            // Replace with your MySQL username
  password: '',            // Replace with your MySQL password
  database: 'yar_db' // Replace with your database name
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// L O G I N // U S E R S //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Helper function to get user by email
const getUserByEmail = async (email) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save to database
  pool.query(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to register user' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },  // Include username in the payload
      'your_jwt_secret', // Secret key for JWT
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      username: user.username,  // Send username to frontend
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function for executing queries
const query = (sql, params) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// C A T E G O R I E S //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 1. Get all categories with subcategories
app.get('/api/categories', (req, res) => {
  const query = `
    SELECT c.id, c.name AS category_name, s.name AS subcategory_name
    FROM categories c
    LEFT JOIN subcategories s ON c.id = s.category_id
    ORDER BY c.id, s.id;
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories: ', err);
      return res.status(500).send('Error fetching categories');
    }

    const categories = [];
    results.forEach((row) => {
      let category = categories.find((c) => c.id === row.id);
      if (!category) {
        category = {
          id: row.id,
          name: row.category_name,
          subcategories: [],
        };
        categories.push(category);
      }
      if (row.subcategory_name) {
        category.subcategories.push(row.subcategory_name);
      }
    });

    res.json(categories);
  });
});

// 2. Add a new category
app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Category name is required');
  }

  const query = 'INSERT INTO categories (name) VALUES (?)';
  pool.query(query, [name], (err, result) => {
    if (err) {
      console.error('Error adding category: ', err);
      return res.status(500).send('Error adding category');
    }
    res.status(201).send('Category added');
  });
});

// 3. Add a new subcategory
app.post('/api/subcategories', (req, res) => {
  const { name, categoryId } = req.body;
  if (!name || !categoryId) {
    return res.status(400).send('Subcategory name and category ID are required');
  }

  const query = 'INSERT INTO subcategories (name, category_id) VALUES (?, ?)';
  pool.query(query, [name, categoryId], (err, result) => {
    if (err) {
      console.error('Error adding subcategory: ', err);
      return res.status(500).send('Error adding subcategory');
    }
    res.status(201).send('Subcategory added');
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// I N V E N T O R Y //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fetch inventory items (filtered by category and subcategory)
app.get("/api/inventory", (req, res) => {
  const { category, subcategory, searchTerm } = req.query;

  let query = "SELECT * FROM inventory WHERE 1 = 1";
  let queryParams = [];

  if (category && category !== "All") {
    query += " AND category = ?";
    queryParams.push(category);
  }

  if (subcategory) {
    query += " AND subcategory = ?";
    queryParams.push(subcategory);
  }

  if (searchTerm) {
    query += " AND name LIKE ?";
    queryParams.push(`%${searchTerm}%`);
  }

  pool.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching inventory:", err);
      return res.status(500).json({ message: "Error fetching inventory" });
    }
    res.status(200).json(results);
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// P R O J E C T S //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// API endpoint to fetch projects
app.get('/api/projects', (req, res) => {
  const query = 'SELECT * FROM projects ORDER BY startDate DESC';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching projects: ', err);
      return res.status(500).json({ message: 'Error fetching projects' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }

    res.json(results);  // Send projects data as JSON
  });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// M O B I L E //
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Fetch inventory data
app.get('/api/inventory', (req, res) => {
  // Fetch the inventory data from the database
  res.json(inventoryData); // Ideally, replace this with a DB query
});

// Endpoint to save the project
app.post('/api/projects', (req, res) => {
  const { title, manager, creator, startDate, endDate, tools } = req.body;

  // Ensure all required fields are present
  if (!title || !manager || !creator || !startDate || !endDate || !tools) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert project data into the database
  const query = `INSERT INTO projects (title, manager, creator, startDate, endDate, tools) VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(query, [title, manager, creator, startDate, endDate, JSON.stringify(tools)], (err, result) => {
    if (err) {
      console.error('Error inserting project:', err);
      return res.status(500).json({ error: 'Failed to save project' });
    }
    res.status(200).json({ message: 'Project saved successfully', projectId: result.insertId });
  });
});




app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}.`);
});
