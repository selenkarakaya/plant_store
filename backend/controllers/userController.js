// Import bcrypt for hashing passwords
// Import database client (db) for PostgreSQL queries
// Import express-async-handler to catch async errors automatically
const bcrypt = require("bcrypt");
const db = require("../db");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// registerUser handles user registration
const registerUser = asyncHandler(async (req, res) => {
  // Destructure user input from request body
  const { name, email, password, phone, address } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name, email and password are required.");
  }

  // Check if the email is already registered in the database
  const { rows } = await db.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);
  if (rows.length > 0) {
    res.status(409);
    throw new Error("Email already registered");
  }

  // Hash the password using bcrypt
  const saltRounds = 10;
  const password_hash = await bcrypt.hash(password, saltRounds);

  // Prepare SQL query to insert new user data
  const query = `
    INSERT INTO users (name, email, password_hash, phone, address, created_at, updated_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
    RETURNING id, name, email, phone, address, created_at, updated_at
  `;

  // Insert user data, setting phone and address to null if missing
  const userData = [name, email, password_hash, phone || null, address || null];

  // Execute the query and get the inserted user data
  const result = await db.query(query, userData);

  // Return the created user object with status 201 (Created)
  res.status(201).json({ user: result.rows[0] });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  // find the user
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = rows[0];

  if (!user) {
    res.status(401);
    throw new Error("Invalid email");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, is_admin: user.is_admin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    token,
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;

  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  if (!rows[0]) {
    res.status(400);
  }
  if (!rows[0]) {
    res.status(404);
    throw new Error("User not found");
  }
  res.json(rows[0]);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { name, email, password, phone, address } = req.body;

  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

  const user = rows[0];

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let password_hash = user.password_hash;
  if (password) {
    const saltRounds = 10;
    password_hash = await bcrypt.hash(password, saltRounds);
  }

  const updated = await db.query(
    `
  UPDATE users
  SET name =$1, email = $2,  password_hash= $3, phone = $4, address = $5,  updated_at = NOW()
  WHERE id = $6
  RETURNING id,name,email,password_hash,phone,address,updated_at`,
    [
      name || user.name,
      email || user.email,
      password_hash,
      phone || user.phone,
      address || user.address,
      id,
    ]
  );

  res.json(updated.rows[0]);
});

// Export the registerUser function so it can be used in other files
module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
