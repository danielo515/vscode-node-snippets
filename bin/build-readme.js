const { readdir, writeFile: _writeFile, readFile: _readFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(_writeFile);
const readFile = promisify(_readFile);

const makeRow = ({prefix,description}) => `| ${prefix} | ${description} |`

const main = async () => {
    const template = await readFile(path.resolve('./bin/README.tpl.md'),'utf8');
    const snippets = JSON.parse((await readFile(path.resolve('./snippets/snippets.json'),'utf8')).replace(/^\s*\/\/.*$/gm,''));
    const tableBody = Object.entries(snippets).map(( [k,value] ) =>  makeRow(value) ).join('\n');
    await writeFile(path.resolve('README.md'),[
        template,
        '| Prefix | Description |', '|----|----|',tableBody
    ].join('\n'),'utf8')
};

main();