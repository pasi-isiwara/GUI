import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();

const db = {
  host: 'bagzohmlwp71pya3e1fy-mysql.services.clever-cloud.com',               // Your host
  user: 'utexprev7p2pq1bf',                    // Your database username
  password: 'hz1NX7QILg6eDvMmaB83',            // Your database password
  database: 'bagzohmlwp71pya3e1fy'     // Your database name
}

const connection = mysql.createConnection(db);
connection.connect((err)=>{
  if(err){
    console.log(err);
  }else{
    console.log('Connected to the database');
  }
});


app.listen(5005, () => {
  console.log('Server is running on http://localhost:3000');
})