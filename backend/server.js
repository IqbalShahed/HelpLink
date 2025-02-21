const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
const volunteerRoutes = require('./routes/volunteerRoutes');
const orgRoutes = require('./routes/orgRoutes');
const oppRoutes = require('./routes/oppRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const cors = require('cors');
const path = require("path");




connectDB();

const app = express();
app.use(express.json());

// Configure CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Allowed HTTP methods
    credentials: true, // Allow cookies
  })
);

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/organization', orgRoutes);
app.use('/api/opportunities', oppRoutes);
app.use('/api/applications', applicationRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('App listing on ', PORT);

})