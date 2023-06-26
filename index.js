const fs = require('fs');


if (process.argv[2] === undefined) {
    console.log(`Usage: node csvToJson.js <file.csv>`);
    process.exit(1);
}

const filename = process.argv[2];

const fileText = fs.readFileSync(filename).toString();
const allLines = fileText.split('\r\n');

const header = allLines[0];
const dataLines = allLines.slice(1);

const fileNames = header.split(';');


let obList = [];
for ( let i = 0; i < dataLines.length; i++) {
    if (dataLines[i] === '') {
        continue;
    }
    let obj = {};
    const data = dataLines[i].split(';');
    for (let j = 0; j < fileNames.length; j++ ) {
        const fileName = fileNames[j].toLowerCase();
        const asNumber = Number(data[j]);
        obj[fileName] = isNaN(asNumber) ? data[j] : asNumber
    }
    obList.push(obj);
}

console.log(obList)

const jsonText = JSON.stringify(obList, null, 2 );
const outputFileName = filename.replace('.csv', 'json');
fs.writeFileSync(outputFileName, jsonText);

