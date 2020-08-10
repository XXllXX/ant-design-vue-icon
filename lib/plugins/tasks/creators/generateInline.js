"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const __1 = require("../..");
exports.ExtractRegExp = /({\s*".*});/;
exports.generateInline = ({ from, toDir, getIconDefinitionFromSource, renderOptions = {}, }) => function GenerateInline() {
    return gulp_1.src(from)
        .pipe(__1.useRender({
        getIconDefinitionFromSource,
        renderOptions,
    }))
        .pipe(gulp_1.dest(toDir));
};
