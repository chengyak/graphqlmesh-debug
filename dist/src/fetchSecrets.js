"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const client_secrets_manager_1 = require("@aws-sdk/client-secrets-manager");
require('dotenv').config();
var CONFIG = require(path_1.default.join(process.cwd(), 'config.json'));
const secretsManagerClient = new client_secrets_manager_1.SecretsManagerClient({
    region: CONFIG.aws_secrets_region
});
const command = new client_secrets_manager_1.GetSecretValueCommand({
    SecretId: process.env.aws_secret_name,
});
function setEnvValue(key, value) {
    const ENV_VARS = fs_1.default.readFileSync(path_1.default.join(process.cwd(), '.env'), "utf8").split(os_1.default.EOL);
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));
    if (target != -1) {
        console.log(`update ${key} value`);
        ENV_VARS.splice(target, 1, `${key}=${value}`);
    }
    else {
        console.log(`insert ${key} value`);
        fs_1.default.appendFile(path_1.default.join(process.cwd(), '.env'), `\n${key}=${value}`, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    // write everything back to the file system
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), '.env'), ENV_VARS.join(os_1.default.EOL));
}
const writeSecrets = () => {
    console.log(CONFIG.aws_secrets_region);
    console.log(process.cwd());
    const secretsHandler = new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            secretsManagerClient.send(command).then((value) => {
                const secret = JSON.parse(value.SecretString);
                Object.keys(CONFIG.secret_values).forEach(function (key) {
                    setEnvValue(key, secret[CONFIG.secret_values[key]]);
                });
            });
            resolve("success");
        }
        catch (error) {
            console.log(error, error.stack);
            reject("error");
        }
    }));
};
writeSecrets();
//# sourceMappingURL=fetchSecrets.js.map