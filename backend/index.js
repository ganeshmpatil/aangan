const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

// Initialize database tables
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS demo_requests (
        id SERIAL PRIMARY KEY,
        contact_person VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        society_name VARCHAR(255),
        city VARCHAR(100),
        total_flats VARCHAR(20),
        role VARCHAR(50),
        message TEXT,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(255),
        society_name VARCHAR(255),
        message TEXT,
        status VARCHAR(20) DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)
    console.log('Database tables initialized')
  } catch (err) {
    console.error('Database init error:', err.message)
    console.log('Running without database - forms will log to console')
  }
}

// Book a demo
app.post('/api/demos', async (req, res) => {
  const { contact_person, phone, email, society_name, city, total_flats, role, message } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO demo_requests (contact_person, phone, email, society_name, city, total_flats, role, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
      [contact_person, phone, email, society_name, city, total_flats, role, message]
    )
    res.json({ success: true, id: result.rows[0].id })
  } catch (err) {
    console.log('Demo request (no DB):', req.body)
    res.json({ success: true, message: 'Recorded (offline mode)' })
  }
})

// Contact / Sales inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, society_name, message } = req.body
  try {
    const result = await pool.query(
      `INSERT INTO inquiries (name, phone, email, society_name, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [name, phone, email, society_name, message]
    )
    res.json({ success: true, id: result.rows[0].id })
  } catch (err) {
    console.log('Inquiry (no DB):', req.body)
    res.json({ success: true, message: 'Recorded (offline mode)' })
  }
})

// Get all demo requests (admin)
app.get('/api/demos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM demo_requests ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Database not available' })
  }
})

// Get all inquiries (admin)
app.get('/api/inquiries', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC')
    res.json(result.rows)
  } catch (err) {
    res.status(500).json({ error: 'Database not available' })
  }
})

app.listen(port, async () => {
  console.log(`Aangan API running on port ${port}`)
  await initDB()
})
