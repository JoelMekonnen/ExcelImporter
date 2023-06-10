import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connection } from './config';
import { Excel_table } from './models';
import { Get_Excel_Data, Add_Excel_Data, Delete_Excel_Data, Update_Excel_Data  } from './controllers';
// import dotenv from 'dotenv';

// dotenv.config();

const app: Express = express();
const port = 4000;

// Connect to the database
connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    console.log('Connected to the database');
  });
  
Excel_table
app.use(cors());
app.use(bodyParser.json());
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});
app.get('/api/excel/get', Get_Excel_Data)
app.post('/api/excel/create', Add_Excel_Data)
app.put('/api/excel/update/:id', Update_Excel_Data)
app.delete('/api/excel/delete/:id', Delete_Excel_Data)
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});