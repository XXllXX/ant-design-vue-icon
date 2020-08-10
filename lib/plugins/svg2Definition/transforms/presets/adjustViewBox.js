"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transforms_1 = require("../../transforms");
const OLD_ICON_NAMES = [
    'step-backward',
    'step-forward',
    'fast-backward',
    'fast-forward',
    'forward',
    'backward',
    'caret-up',
    'caret-down',
    'caret-left',
    'caret-right',
    'retweet',
    'swap-left',
    'swap-right',
    'loading',
    'loading-3-quarters',
    'coffee',
    'bars',
    'file-jpg',
    'inbox',
    'shopping-cart',
    'safety',
    'medium-workmark'
];
exports.adjustViewBox = transforms_1.assignAttrsAtTag('svg', ({ previousAttrs }) => ({
    viewBox: previousAttrs.viewBox
}));
