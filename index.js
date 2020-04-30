const mysql = require('mysql');
const process = require('process');
const fs = require('fs');
const { parse } = require('flatted/cjs');

const con = mysql.createConnection({
    host: '',
    user: '',
    password: '',
    database: ''
});

con.connect(err => {
    if (err)
        throw err;

    fs.readFile('query.sql', 'utf-8', (err, contents) => {
        if (err)
            throw err;

        con.query(contents, (err, result, fields) => {
            if (err)
                throw err;

            const mappedRes = result.map(row => JSON.parse(row.postedObject))
                .map(po => {
                    if (po.json && po.json.originalError) {
                        try {
                            po.json.originalError = parse(po.json.originalError);
                        } catch (e) {
                            po.json.originalError = JSON.parse(po.json.originalError);
                        }
                    }
                });

            // console.log(mappedRes);

            process.exit(0);
        });
    })
});

