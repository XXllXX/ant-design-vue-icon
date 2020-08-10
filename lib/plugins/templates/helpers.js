"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultColors = {
    primaryColor: '#333',
    secondaryColor: '#E6E6E6'
};
function renderIconDefinitionToSVGElement(icond, options = {}) {
    if (typeof icond.icon === 'function') {
        const placeholders = options.placeholders || defaultColors;
        return renderAbstractNodeToSVGElement(icond.icon(placeholders.primaryColor, placeholders.secondaryColor), options);
    }
    return renderAbstractNodeToSVGElement(icond.icon, options);
}
exports.renderIconDefinitionToSVGElement = renderIconDefinitionToSVGElement;
function renderAbstractNodeToSVGElement(node, options) {
    const targetAttrs = node.tag === 'svg'
        ? Object.assign(Object.assign({}, node.attrs), (options.extraSVGAttrs || {})) : node.attrs;
    const attrs = Object.keys(targetAttrs).reduce((acc, nextKey) => {
        const key = nextKey;
        const value = targetAttrs[key];
        const token = `${key}="${value}"`;
        acc.push(token);
        return acc;
    }, []);
    const attrsToken = attrs.length ? ' ' + attrs.join(' ') : '';
    const children = (node.children || [])
        .map((child) => renderAbstractNodeToSVGElement(child, options))
        .join('');
    if (children && children.length) {
        return `<${node.tag}${attrsToken}>${children}</${node.tag}>`;
    }
    return `<${node.tag}${attrsToken} />`;
}
