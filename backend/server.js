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
const http = require('http')
const { Server } = require('socket.io')

const app = express();
const server = http.createServer(app)


// Route files
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const auth = require('./routes/auth')

// Load env vars
dotenv.config({ path: './config/config.env' });


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


const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true
  }
})

//python3 -m http.server
io.on('connection', (socket) => {
  console.log('a user connected: ', socket.id)
  
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
  // socket.on('disconnect', () => {
  //   console.log('user disconnected')
  // })
})

server.listen(process.env.PORT, async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    console.log(`server is running on port ${process.env.PORT}`.yellow.bold)
  } catch (err) {
    console.log(err.red)
  }
})




// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
console.log(`Error: ${err.message}`.red);
  // Close server & exit process
server.close(() => process.exit(1));
});