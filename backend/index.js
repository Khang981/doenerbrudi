const express = require('express');
const app = express();
const cors = require("cors");
// const bodyParser = require('body-parser');
// var mysql = require('mysql');

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;
// const user = process.env.USER;
// const password = process.env.PW;
// const URL = process.env.DB_URL;
// const database = process.env.DATABASE;

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.use(cors({}));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json());

app.use("/doenerbrudi", require("./routes/postRoutes"));
// app.get('/doenerbrudi', (req, res) => {
//   res.send('Hello World!');
// });

app.use((err,req,res,next) => {
  console.log(err.stack);
  console.log(err.name);
  console.log(err.code);
  
  res.status(500).json({
    "success": false , "message": err.message
  })
})


