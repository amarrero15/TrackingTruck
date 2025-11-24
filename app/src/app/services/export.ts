import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Injectable({
  providedIn: 'root'

})
export class ExportService {

  constructor() { }

  exportToExcel(data: any[], fileName: string = 'reporte.xlsx'): void {
    // 1. Crear hoja a partir de un array de objetos
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);

    // 2. Crear el libro
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Datos': worksheet },
      SheetNames: ['Datos'],
    };

    // 3. Generar buffer binario
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // 4. Crear blob y disparar descarga
    const blob: Blob = new Blob([excelBuffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8',
    });

    saveAs(blob, fileName);
  }

/*
  convertToXlsxCsv = (jsonData: any[], outputFilePath: string, fileType: 'xlsx' | 'csv') => {
    // Create a new workbook
    const workbook = xlsx.utils.book_new();
  
    // Add the JSON data to a new sheet
    const sheet = xlsx.utils.json_to_sheet(jsonData);
  
    // Add the sheet to the workbook
    xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet 1');
  
    // Write the workbook to a file
    if (fileType === 'xlsx') {
      xlsx.writeFile(workbook, outputFilePath);
    } else if (fileType === 'csv') {
      const csvData = xlsx.utils.sheet_to_csv(sheet);
      fs.writeFileSync(outputFilePath, csvData);
    }
  
    console.log(`Conversion from JSON to ${fileType.toUpperCase()} successful!`);
  };
*/

  
}