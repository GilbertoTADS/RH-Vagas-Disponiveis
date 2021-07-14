const xl = require('excel4node');

const wb = new xl.Workbook(); 
const ws = wb.addWorksheet('Nome da planilha');//titulo da planilha

const data = [//dados do banco de dados
    {
        "NOME":"GILBERTO CARLOS DE MELO",
        "DTNASCIMENTO":"1996-09-02T00:00:00:00",
        "CPFCNPJ":"14309361692",
        "ESTADOCIVIL":"S",
        "SEXO":"M",
        "UFNASCIMENTO":"MG",
        "DEFICIENTE":"S",
        "APRESENTACAO":"KKK",
        "EMAIL":"gilbertotads@gmail.com",
        "CONTATO":"3899239297",
        "RECADO":"null",
        "LINKEDIN":"NULL",
        "FLAGATIVO":"S",
        "CEP":"39480000",
        "LOGRADOURO":"RU A ",
        "NUMERO":"79",
        "BAIRRO":"AAAA",
        "CIDADE":"JANUARIA",
        "ESTADO":"MG",
        "DTALTERACAO":"2021-07-09 12:06:23",
    }
];
const headingColumnNames = [//titulo das colunas
    "NOME",
    "DTNASCIMENTO",
    "CPFCNPJ",
    "ESTADOCIVIL",
    "SEXO",
    "UFNASCIMENTO",
    "DEFICIENTE",
    "APRESENTACAO",
    "EMAIL",
    "CONTATO",
    "RECADO",
    "LINKEDIN",
    "FLAGATIVO",
    "CEP",
    "LOGRADOURO",
    "NUMERO",
    "BAIRRO",
    "CIDADE",
    "ESTADO",
    "DTALTERACAO",
];
let headingColumnIndex = 1;//posição da coluna 1
headingColumnNames.forEach(heading => {//escreve os nomes das colunas
    ws.cell(1,headingColumnIndex++).string(heading);
});
let rowIndex = 2;
data.forEach( record => {
    let columnIndex = 1;
    Object.keys(record).forEach( columnName => {
        ws.cell(rowIndex, columnIndex++).string(record[columnName])
    })
    rowIndex++;
})
wb.write('CURRICULO_EXCEL.xlsx');