"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creator_1 = require("../creator");
const lodash_template_1 = __importDefault(require("lodash.template"));
exports.useTemplate = ({ template: tplContent, mapToInterpolate, }) => {
    const executor = lodash_template_1.default(tplContent);
    return creator_1.createTrasformStream((content, { stem: name, path }) => executor(mapToInterpolate({ name, content, path })));
};
