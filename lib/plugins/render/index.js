"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creator_1 = require("../creator");
const helpers_1 = require("../templates/helpers");
exports.useRender = ({ getIconDefinitionFromSource, renderOptions }) => creator_1.createTrasformStream((content, file) => {
    const def = getIconDefinitionFromSource(content);
    file.extname = '.svg';
    file.stem = def.name;
    file._meta = {
        theme: def.theme
    };
    return helpers_1.renderIconDefinitionToSVGElement(def, renderOptions);
});
