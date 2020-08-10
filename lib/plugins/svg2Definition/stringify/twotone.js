"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const __PLACEHOLDER__ = 'TWOTONE_ICON_FUNCTION_HOLDER';
const __PRIMARY_COLOR__ = 'primaryColor';
const __SECONDARY_COLOR__ = 'secondaryColor';
const getRegExpFromColors = ramda_1.pipe(ramda_1.ap([ramda_1.toUpper, ramda_1.toLower]), ramda_1.map((color) => `("${color}")`), ramda_1.join('|'), (content) => new RegExp(content, 'g'));
const colorsReplacer = ramda_1.applyTo({
    [__PRIMARY_COLOR__]: ['#333', '#333333'],
    [__SECONDARY_COLOR__]: ['#E6E6E6', '#D9D9D9', '#D8D8D8']
})(ramda_1.pipe(ramda_1.evolve({
    [__PRIMARY_COLOR__]: getRegExpFromColors,
    [__SECONDARY_COLOR__]: getRegExpFromColors
}), ramda_1.toPairs, ramda_1.map(ramda_1.compose(ramda_1.apply, ramda_1.flip)(ramda_1.replace)), ramda_1.apply(ramda_1.pipe)));
const duplicate = (n) => [ramda_1.clone(n), ramda_1.clone(n)];
exports.twotoneStringify = ramda_1.pipe(duplicate, ramda_1.zipWith(ramda_1.call, [
    ramda_1.pipe(ramda_1.assoc('icon', __PLACEHOLDER__), JSON.stringify),
    ramda_1.pipe(ramda_1.prop('icon'), JSON.stringify, colorsReplacer, (content) => `function render(${__PRIMARY_COLOR__}, ${__SECONDARY_COLOR__}) { return ${content}; }`)
]), ([hasPlaceholderContent, iconFunctionContent]) => ramda_1.replace(`"${__PLACEHOLDER__}"`, iconFunctionContent, hasPlaceholderContent));
