import { connection } from "../config";

const Excel_table = connection.query(
    'CREATE TABLE IF NOT EXISTS excel_data (id INT AUTO_INCREMENT PRIMARY KEY, Item_no VARCHAR(255), Description VARCHAR(255), Amount VARCHAR(255), Qty VARCHAR(255), Rate VARCHAR(255), Unit VARCHAR(255))',
    (err) => {
      if (err) {
        console.error('Error creating table: ', err);
        return;
      }
      console.log('Table created or already exists');
    }
);

export { Excel_table }
  