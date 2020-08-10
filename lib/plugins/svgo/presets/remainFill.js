"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const base_1 = require("./base");
exports.remainFillConfig = ramda_1.mergeRight(base_1.base, {
    plugins: [...(base_1.base.plugins || []), { removeAttrs: { attrs: ['class'] } }],
});
