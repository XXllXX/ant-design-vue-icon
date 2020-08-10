"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creators_1 = require("./plugins/tasks/creators");
const presets_1 = require("./plugins/svgo/presets");
const transforms_1 = require("./plugins/svg2Definition/transforms");
const path_1 = require("path");
const utils_1 = require("./plugins/utils");
const gulp_1 = require("gulp");
const yargs_1 = __importDefault(require("yargs"));
const jsIconTemplate = 'export const  <%= identifier %> = <%= content %>';
const generat = function (formPath, toPath) {
    gulp_1.series(creators_1.clean([toPath]), gulp_1.parallel(creators_1.generateIcons({
        theme: 'outline',
        from: [path_1.join(formPath, '/**/*.svg')],
        toDir: toPath,
        svgoConfig: presets_1.generalConfig,
        extraNodeTransformFactories: [
            transforms_1.assignAttrsAtTag('svg', { focusable: 'false' }),
            transforms_1.adjustViewBox,
        ],
        stringify: JSON.stringify,
        template: jsIconTemplate,
        mapToInterpolate: ({ name, content }) => ({
            identifier: utils_1.getIdentifier({ name }),
            content: utils_1.getContent(content),
        }),
        filename: ({ name }) => utils_1.getIdentifier({ name }),
    })), gulp_1.parallel(creators_1.generateEntry({
        entryName: 'index.js',
        from: [path_1.join(toPath, '*.js')],
        toDir: toPath,
        banner: '//  icons \n',
        template: `//  <%= identifier %>   \nexport * from '<%= path %>';`,
        mapToInterpolate: ({ name: identifier }) => ({
            identifier,
            path: `./${identifier}`,
        }),
    })))();
};
const run = function () {
    let argv = yargs_1.default
        .option('s', {
        alias: 'src',
        demandOption: false,
        default: 'svg',
        describe: 'svg图标源文件地址',
        type: 'string',
    })
        .option('o', {
        alias: 'out',
        demandOption: false,
        default: 'src/svg',
        describe: 'svg图标转换结果输出地址',
        type: 'string',
    }).argv;
    generat(argv.src, argv.out);
};
exports.default = run();
