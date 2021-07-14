const xl = require('excel4node');
const moment = require('moment');

module.exports = class Excel {
        
        constructor(titleWorksheet,headersAndValues,nameFile) {
            this.configSpreadsheet = {
                dateFormat: 'dd/mm/yyyy',
            }
            this._headingColumnIndex = 1;
            this._rowIndex = 2;
            this._columnIndex = 1;
            this._wb = new xl.Workbook(this.configSpreadsheet); 
            this.result = this.createDoc(titleWorksheet,headersAndValues,nameFile);
        }
        createDoc(titleWorksheet,headersAndValues,nameFile){
            this.ws = this._createSheet(titleWorksheet);
            this._createHeaders(headersAndValues);
            this._headingColumnIndex = 1;
            this._inserValues(headersAndValues);
            return this._finished(nameFile);
        }
        _createSheet(titleWorksheet){
            return this._wb.addWorksheet(titleWorksheet);//titulo da planilha
        }
        _createHeaders(headersWithValues){
            Object.keys(headersWithValues).forEach((headerName) => {
                if(!isNaN(headerName) && typeof headersWithValues[headerName] === 'object' && headersWithValues[headerName]) this._createHeaders(headersWithValues[headerName]);
                if(isNaN(headerName)) this._setField(headerName, 1,this._headingColumnIndex++);
            }) 
        }
        _setField(column,rowIndex,columnIndex){
            let sizeColumn;
            if(column){
                if(Object.keys(column).length !== undefined) sizeColumn = (parseInt(Object.keys(column).length)+20);
                if(column.length !== undefined) sizeColumn = (parseInt(column.length)+5);
                this.ws.column(columnIndex).setWidth(sizeColumn);
                if(typeof column === 'string') return this.ws.cell(rowIndex,columnIndex).string(column)
                if(typeof column === 'number') return this.ws.cell(rowIndex,columnIndex).number(column);
                if(moment.isDate(column)) return this.ws.cell(rowIndex,columnIndex).date(column);
            }
            return this.ws.cell(rowIndex,columnIndex).string('NAO PREENCHIDO')
        }
        _inserValues(headersWithValues){
            if(headersWithValues){
                Object.keys(headersWithValues).forEach((headerName) => {
                    if(!isNaN(headerName) && typeof headersWithValues[headerName] === 'object' && headersWithValues[headerName]) this._inserValues(headersWithValues[headerName]);
                    if(isNaN(headerName)) this._setField(headersWithValues[headerName],this._rowIndex, this._headingColumnIndex++);
                })
            }
        }
        _finished(nameFile){
            const result =  this._wb.write(`${nameFile}`);
        }  
    }