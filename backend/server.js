const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')
const routes = require("./src/routes/index");
const db = require("./src/models/index");

const PORT = process.env.PORT || 3001

const app = express()
var corsOptions = {
  credentials: true
};
app.use(cors(corsOptions))
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", routes);

// Start express app
app.listen(PORT, async ()=> {
  console.log(`Server is running on: ${PORT}`)
  await db.sequelize.sync({ force: true });
});