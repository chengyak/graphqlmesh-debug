import { readFile, writeFile } from 'fs';
import path from 'path'

require('dotenv').config();

const setPlayground = () => {
    console.log('Set GraphQL Playground from dotenv value')
    readFile(path.join(process.cwd(), '.mesh', 'index.ts'), 'utf-8', function (err, contents) {
        if (err) {
            console.log(err);
            return;
        }
        const replaced = contents.replace(/\"playground\":true/g, '\"playground\":(process.env.playground==\"true\")');
        writeFile(path.join(process.cwd(), '.mesh', 'index.ts'), replaced, 'utf-8', function (err) {
            if (err) {
                console.log(err);
                return
            }
        });
    });

}

setPlayground()