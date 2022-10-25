"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dsCheckPlugin_1 = __importDefault(require("./dsCheckPlugin"));
const authorizationPlugin_1 = __importDefault(require("./authorizationPlugin"));
const plugins = [
    authorizationPlugin_1.default,
    dsCheckPlugin_1.default
];
exports.default = plugins;
//# sourceMappingURL=index.js.map