"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const del_1 = __importDefault(require("del"));
exports.clean = (dirs) => function CleanDirectories() {
    return del_1.default(dirs);
};
