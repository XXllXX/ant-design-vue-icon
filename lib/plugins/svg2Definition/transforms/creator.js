"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
function assignAttrsAtTag(tag, extraPropsOrFn) {
    return options => asn => ramda_1.when(ramda_1.where({
        tag: ramda_1.equals(tag)
    }), ramda_1.evolve({
        attrs: ramda_1.pipe(ramda_1.clone, ramda_1.mergeLeft(typeof extraPropsOrFn === 'function' ? extraPropsOrFn(ramda_1.mergeRight(options, { previousAttrs: asn.attrs })) : extraPropsOrFn))
    }))(asn);
}
exports.assignAttrsAtTag = assignAttrsAtTag;
