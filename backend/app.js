const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const widgetRoutes = require("./routes/widget");
const path = require("path"); // for the static images accsess

const app = express();

mongoose
  .connect(
    'mongodb+srv://yonikan:' +
    process.env.MONGO_ATLAS_PW + 
    '@cluster0-wc4ia.mongodb.net/test?retryWrites=true',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");

    const server = app.listen(8080);
    const io = require('./socket').init(server);
    io.on('connection', socket => {
      // console.log('Client connected');
      socket.on("getNotification", () => {
        let numberId = 0;
        setInterval(() => {
          const singleNotification = {
            id: numberId++,
            title: 'test title',
            date: new Date(),
            read: false,
            type: 'system',
            icon: 'settings',
            colorClass: ''
          };
          socket.emit('notifications', singleNotification);
        }, 60000);
      });
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(__dirname + '/public')); // for production only
app.use("/images", express.static(path.join("backend/images")));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/widgets", widgetRoutes);

// for errors middleware
// app.use((error, req, res, next) => {
//   console.log('error: ', error);
//   if(error.httpStatusCode = 500) {
//     res.status(500).json({
//       message: "Invalid authentication credentials!"
//     });
//   }
// });

module.exports = app;
