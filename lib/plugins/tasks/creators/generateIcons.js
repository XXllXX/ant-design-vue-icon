"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
const gulp_rename_1 = __importDefault(require("gulp-rename"));
const gulp_1 = require("gulp");
exports.generateIcons = ({ from, toDir, svgoConfig, theme, extraNodeTransformFactories, stringify, template, mapToInterpolate, filename, }) => function GenerateIcons() {
    return gulp_1.src(from)
        .pipe(__1.svgo(svgoConfig))
        .pipe(__1.svg2Definition({
        theme,
        extraNodeTransformFactories,
        stringify,
    }))
        .pipe(__1.useTemplate({ template, mapToInterpolate }))
        .pipe(gulp_rename_1.default((file) => {
        file.dirname = '';
        if (file.basename) {
            file.basename = filename({ name: file.basename });
            file.extname = '.js';
        }
    }))
        .pipe(gulp_1.dest(toDir));
};
