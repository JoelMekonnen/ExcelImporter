import React from 'react'
import * as XLSX from 'xlsx';
import { useState } from 'react';
import  * as Data from '@mui/x-data-grid';
import { Button, Grid, Box } from '@mui/material';
interface ExcelData {
    [key: string]: string | number | null;
}
export default function Datatable() {
    const [data, setData] = useState<ExcelData[]>([]);
    const [myColmuns, setColumns] = useState([]);
    const columns = [{ field: 'Item No ' }, { field: 'Description',  editable:true, width: 700, resizable:true, minWidth: 150, maxWidth: 900 }, {field: 'Amount ', editable:true}, {field:'Qty ', editable:true}, {field: 'Rate ', editable:true}, {field: 'Unit ', editable:true}]
    const [myRows, setRows] = useState([]);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          if (evt.target) {
            const workbook = XLSX.read(evt.target.result, { type: 'binary' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const  headers = excelData[1]
            const rows = excelData.slice(1).map((row: any, idx:any) => {
              const rowData: RowData = {};
              headers.forEach((header: any, index: number) => {
                rowData[header] = row[index];
                rowData['id'] = idx;
              });
              return rowData;
            });
            console.log(rows)
            setData(rows);
          }
        };
        reader.readAsBinaryString(file);
        console.log(data);
      }
    };
  return (
    <div>
       <Box sx={{ display:'flex', width:'100%', justifyContent:'center', marginTop:'30px'}}>
              <Grid item xs={8} sm={8} lg={8}>
                      <Button fullWidth variant='contained' component="label" style={{  backgroundColor:'#004c3f', color:"white" }}>
                          Upload Excel File
                          <input type="file" accept=".xlsx" hidden onChange={handleFileChange} />
                     </Button>
                </Grid>  
        </Box>
       <div style={{ width: '80%', marginTop:'30px', marginLeft:'100px' }}>
        <div style={{ height: 350, width: '100%' }}>
          <Data.DataGrid initialState={{ pagination: { paginationModel: { pageSize: 20 } }, }} sx={{ height:'800px' }} pageSizeOptions={[25, 30, 40]} rowHeight={40} columns={columns} rows={data.slice(1, data.length - 1)}/>
        </div>
    </div>
    </div>
  )
}
