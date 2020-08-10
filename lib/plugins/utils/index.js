"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_upperfirst_1 = __importDefault(require("lodash.upperfirst"));
const lodash_camelcase_1 = __importDefault(require("lodash.camelcase"));
const ramda_1 = require("ramda");
exports.getIdentifier = ramda_1.pipe(({ name, themeSuffix }) => name + (themeSuffix ? `-${themeSuffix}` : ''), lodash_camelcase_1.default, lodash_upperfirst_1.default);
exports.getContent = ramda_1.pipe((Content) => {
    let { icon } = JSON.parse(Content);
    let { name, theme } = icon;
    delete icon.name;
    delete icon.theme;
    return JSON.stringify({
        name,
        theme,
        icon,
    }, null, 2);
});
