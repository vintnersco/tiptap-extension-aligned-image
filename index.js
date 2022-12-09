"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlignedImage = exports.getAlignmentClass = exports.setAlignmentClassMapper = exports.getDefaultAlignmentClass = void 0;
const extension_image_1 = __importDefault(require("@tiptap/extension-image"));
function getDefaultAlignmentClass(align) {
    if (!align)
        return null;
    switch (align) {
        case 'left': return 'is-align-left';
        case 'right': return 'is-align-right';
        case 'center': return 'is-align-center';
        default: return null;
    }
}
exports.getDefaultAlignmentClass = getDefaultAlignmentClass;
let mapperFn = getDefaultAlignmentClass;
function setAlignmentClassMapper(mapper) {
    mapperFn = mapper;
}
exports.setAlignmentClassMapper = setAlignmentClassMapper;
function getAlignmentClass(align) {
    return mapperFn(align);
}
exports.getAlignmentClass = getAlignmentClass;
const AlignedImage = extension_image_1.default.extend({
    name: 'alignedImage',
    addOptions() {
        var _a;
        return Object.assign(Object.assign({}, (_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this)), { align: ['center', 'left', 'right', 'none'] });
    },
    addAttributes() {
        var _a;
        return Object.assign(Object.assign({}, (_a = extension_image_1.default.config.addAttributes) === null || _a === void 0 ? void 0 : _a.call(this)), { class: {
                default: null,
                rendered: true
            } });
    },
    addCommands() {
        return {
            setAlignedImage: options => ({ commands }) => {
                const { align } = options, attrs = __rest(options, ["align"]);
                return commands.insertContent({
                    type: this.name,
                    attrs: Object.assign({ class: getAlignmentClass(align) }, options)
                });
            },
        };
    }
});
exports.AlignedImage = AlignedImage;
