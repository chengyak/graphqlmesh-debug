import fs from 'fs'
import os from 'os'
import path from 'path'

import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

require('dotenv').config();

var CONFIG = require(path.join(process.cwd(), 'config.json'))

const secretsManagerClient = new SecretsManagerClient({
    region: CONFIG.aws_secrets_region
  });
  
const command = new GetSecretValueCommand({
    SecretId: process.env.aws_secret_name,
  });

function setEnvValue(key: string, value: string) {
    const ENV_VARS = fs.readFileSync(path.join(process.cwd(), '.env'), "utf8").split(os.EOL);
    const target = ENV_VARS.indexOf(ENV_VARS.find((line) => {
        return line.match(new RegExp(key));
    }));
    if (target != -1) {
        console.log(`update ${key} value`)
        ENV_VARS.splice(target, 1, `${key}=${value}`);
    } else 
    {
        console.log(`insert ${key} value`)
        fs.appendFile(path.join(process.cwd(), '.env'), `\n${key}=${value}`, err => {
            if (err) {
              console.log(err)
            }
          })
    }
    // write everything back to the file system
    fs.writeFileSync(path.join(process.cwd(), '.env'), ENV_VARS.join(os.EOL));
}

const writeSecrets = () => {
    console.log(CONFIG.aws_secrets_region)
    console.log(process.cwd())
    const secretsHandler = new Promise(async(resolve, reject) => {
        try {
                secretsManagerClient.send(command).then((value) => {
                    const secret = JSON.parse(value.SecretString);
                    Object.keys(CONFIG.secret_values).forEach(function(key) {
                        setEnvValue(key, secret[CONFIG.secret_values[key]])
                })})
                resolve("success")
        } catch (error) {
            console.log(error, error.stack);
            reject("error");
        } 
    })
}
writeSecrets()