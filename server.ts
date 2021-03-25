import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";

config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};

const app = express();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

app.get("/", async (req, res) => {
  try {
    const dbres = await client.query('select * from blog');
    res.json(dbres.rows); 
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Cannot select all from blog table'
    }
    )
  }
});

app.post("/", async (req, res) => {
  try {
    const {title, article} = req.body;
    const dbres = await client.query('insert into blog(title, article) values($1, $2) returning *', [title, article]);
    res.json(dbres.rows); 
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Cannot select all from blog table'
    }
    )
  }
});

app.put("/", async (req, res) => {
  try {
    const dbres = await client.query('select * from blog');
    res.json(dbres.rows); 
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Cannot select all from blog table'
    }
    )
  }
});

app.delete("/", async (req, res) => {
  try {
    const dbres = await client.query('select * from blog');
    res.json(dbres.rows); 
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Cannot select all from blog table'
    }
    )
  }
});


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
