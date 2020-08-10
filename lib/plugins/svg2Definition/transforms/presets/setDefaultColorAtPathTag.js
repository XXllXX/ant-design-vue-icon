"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transforms_1 = require("../../transforms");
exports.setDefaultColorAtPathTag = defaultColor => transforms_1.assignAttrsAtTag('path', ({ previousAttrs }) => ({
    fill: previousAttrs.fill || defaultColor
}));
