const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const connectDB = require('./config/db');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const WebSocket = require('ws');


// Route files
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const auth = require('./routes/auth')

// Load env vars
dotenv.config({ path: './config/config.env' });

connectDB();

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

//Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173"}))

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use('/api/', shop);
app.use('/api/admin', admin)
app.use('/api/auth', auth)


app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
PORT,
console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected WebSocket clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
console.log(`Error: ${err.message}`.red);
  // Close server & exit process
server.close(() => process.exit(1));
});