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
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const url_1 = require("url");
require('dotenv').config();
/**
 * plugin to add health check endpoint, support graphql and openapi source handlers for now.
 * graphql: check url.origin/readiness
 * openapi: check the swagger endpoint: url from 'source'
 */
const dsCheckPlugin = {
    onRequest({ url, fetchAPI, endResponse }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (url.pathname == '/healthchecks') {
                console.log(url.pathname);
                try {
                    const doc = js_yaml_1.default.load(fs_1.default.readFileSync(path_1.default.join(process.cwd(), '.meshrc.yml'), 'utf8'));
                    for (const ds of doc.sources) {
                        console.log('check data source:' + ds.name);
                        if (ds.handler.graphql != undefined) {
                            const ep_var = ds.handler.graphql.endpoint.replace('{', '').replace('}', '').split('.');
                            const url = new url_1.URL(process[ep_var[0]][ep_var[1]]);
                            const response = yield (0, node_fetch_1.default)(url.origin + '/readiness');
                            console.log('health check for data source: ' + ds.name + ' status code: ' + response.status);
                            if (response.status != 200) {
                                const response = new fetchAPI.Response('Data Soource connection check failed', {
                                    headers: {
                                        'Content-Type': 'text/html; charset=UTF-8',
                                    },
                                    status: 400
                                });
                                endResponse(response);
                                return;
                            }
                        }
                        else if (ds.handler.openapi != undefined) {
                            const ep_var = ds.handler.openapi.source.replace('{', '').replace('}', '').split('.');
                            const url = new url_1.URL(process[ep_var[0]][ep_var[1]]);
                            const response = yield (0, node_fetch_1.default)(url.href);
                            console.log('health check for data source: ' + ds.name + ' status code: ' + response.status);
                            if (response.status != 200) {
                                const response = new fetchAPI.Response('Data Soource connection check failed', {
                                    headers: {
                                        'Content-Type': 'text/html; charset=UTF-8',
                                    },
                                    status: 400
                                });
                                endResponse(response);
                                return;
                            }
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                    const response = new fetchAPI.Response('Data Soource connection check failed', {
                        headers: {
                            'Content-Type': 'text/html; charset=UTF-8',
                        },
                        status: 400
                    });
                    endResponse(response);
                    return;
                }
                const response = new fetchAPI.Response("Data Soource connection check successful", {
                    headers: {
                        'Content-Type': 'text/html; charset=UTF-8',
                    },
                    status: 200
                });
                endResponse(response);
            }
        });
    }
};
exports.default = dsCheckPlugin;
//# sourceMappingURL=dsCheckPlugin.js.map