"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
require('dotenv').config();
const setPlayground = () => {
    console.log('Set GraphQL Playground from dotenv value');
    (0, fs_1.readFile)(path_1.default.join(process.cwd(), '.mesh', 'index.ts'), 'utf-8', function (err, contents) {
        if (err) {
            console.log(err);
            return;
        }
        const replaced = contents.replace(/\"playground\":true/g, '\"playground\":(process.env.playground==\"true\")');
        (0, fs_1.writeFile)(path_1.default.join(process.cwd(), '.mesh', 'index.ts'), replaced, 'utf-8', function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
};
setPlayground();
//# sourceMappingURL=setPlayground.js.map