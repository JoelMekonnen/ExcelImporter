import express, { Express, Request, Response } from 'express';
import { connection } from '../config';

const Get_Excel_Data = (req: Request, res: Response) => {
    connection.query('SELECT * FROM excel_data', (err, results) => {
      if (err) {
        console.error('Error getting data from table: ', err);
        res.status(500).json({ error: 'Error getting data from table' });
        return;
      }
      res.json(results);
    });
  }
;
const Add_Excel_Data = (req: Request, res: Response) => {
    const { Item_no, Description, Rate, Unit, Qty, Amount } = req.body;
  
    connection.query(
      'INSERT INTO excel_data (Item_no, Description, Amount, Rate, Unit, Qty) VALUES (?, ?, ?)',
      [Item_no, Description, Amount, Rate, Unit, Qty],
      (err, result) => {
        if (err) {
          console.error('Error creating new row: ', err);
          res.status(500).json({ error: 'Error creating new row' });
          return;
        }
        res.json({ id: result.insertId });
      }
    );
}
const Update_Excel_Data = (req: Request, res: Response) => {
    const id = req.params.id;
    const { Item_no, Description, Rate, Unit, Qty, Amount } = req.body;
    
    connection.query(
      'UPDATE excel_data SET Item_no = ?, Description= ?, Amount = ?,  Rate = ?, Unit = ?, Qty = ? WHERE id = ?',
      [Item_no, Description, Rate, Unit, Qty, Amount, id],
      (err) => {
        if (err) {
          console.error('Error updating row: ', err);
          res.status(500).json({ error: 'Error updating row' });
          return;
        }
        res.json({ message: 'Row updated successfully' });
      }
    );
};
const Delete_Excel_Data = (req: Request, res: Response) => {
    const id = req.params.id;
    connection.query('DELETE FROM excel_data WHERE id = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting row: ', err);
        res.status(500).json({ error: 'Error deleting row' });
        return;
      }
      res.json({ message: 'Row deleted successfully' });
    });
}
export { Add_Excel_Data, Get_Excel_Data, Update_Excel_Data, Delete_Excel_Data }