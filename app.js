const express = require('express');
require('dotenv').config();
const mongoose = require("mongoose");
const userRouter = require('./routes/user');

const User = require('./models/user');

const app = express();
mongoose.connect("mongodb+srv://mahesh12:mahesh12@cluster0.vk2eq.mongodb.net/?retryWrites=true&w=majority").then(
       () => console.log("connected mongoose")
    ).catch(err => console.log(err))


// app.use((req, res, next) => {
//   req.on('data', chunk => {
//     const data = JSON.parse(chunk);
//     req.body = data;
//     next();
//   });
// });

app.use(express.json());
app.use(userRouter);

// const test = async (email, password) => {
//   const user = await User.findOne({ email: email });
//   const result = await user.comparePassword(password);
//   console.log(result);
// };



app.get('/test', (req, res) => {
  res.send('Hello world');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(8000, () => {
  console.log('port is listening');
});
