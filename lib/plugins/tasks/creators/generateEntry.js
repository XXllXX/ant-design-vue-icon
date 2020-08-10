"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = require("gulp");
const __1 = require("../..");
const gulp_concat_1 = __importDefault(require("gulp-concat"));
const gulp_header_1 = __importDefault(require("gulp-header"));
exports.generateEntry = ({ from, toDir, template, mapToInterpolate, entryName, banner = '', }) => function GenerateEntry() {
    return gulp_1.src(from)
        .pipe(__1.useTemplate({
        template,
        mapToInterpolate,
    }))
        .pipe(gulp_concat_1.default(entryName))
        .pipe(gulp_header_1.default(banner))
        .pipe(gulp_1.dest(toDir));
};
