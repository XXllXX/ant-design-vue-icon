"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const creator_1 = require("../creator");
const ramda_1 = require("ramda");
const parse_xml_1 = __importDefault(require("@rgrove/parse-xml"));
exports.svg2Definition = ({ theme, extraNodeTransformFactories, stringify, }) => creator_1.createTrasformStream((SVGString, { stem: name }) => ramda_1.applyTo(SVGString)(ramda_1.pipe(parse_xml_1.default, ramda_1.pipe(ramda_1.path(['children', 0]), ramda_1.defaultTo({})), element2AbstractNode({
    name,
    theme,
    extraNodeTransformFactories,
}), ramda_1.pipe(ramda_1.assoc('name', name), ramda_1.assoc('theme', theme), ramda_1.objOf('icon')), ramda_1.defaultTo(JSON.stringify)(stringify))));
function element2AbstractNode({ name, theme, extraNodeTransformFactories, }) {
    return ({ name: tag, attributes, children }) => ramda_1.applyTo(extraNodeTransformFactories)(ramda_1.pipe(ramda_1.map((factory) => factory({ name, theme })), ramda_1.reduce((transformedNode, extraTransformFn) => extraTransformFn(transformedNode), ramda_1.applyTo({
        tag,
        attrs: ramda_1.clone(attributes),
        children: ramda_1.applyTo(children)(ramda_1.pipe(ramda_1.filter(ramda_1.where({ type: ramda_1.equals('element') })), ramda_1.map(element2AbstractNode({
            name,
            theme,
            extraNodeTransformFactories,
        })))),
    })(ramda_1.unless(ramda_1.where({
        children: ramda_1.both(Array.isArray, ramda_1.pipe(ramda_1.length, ramda_1.gt(ramda_1.__, 0))),
    }), ramda_1.dissoc('children'))))));
}
