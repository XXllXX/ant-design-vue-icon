"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
exports.copy = ({ from, toDir }) => function CopyFiles() {
    return gulp_1.src(from).pipe(gulp_1.dest(toDir));
};
