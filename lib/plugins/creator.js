"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const through2_1 = __importDefault(require("through2"));
exports.createTrasformStream = (fn) => through2_1.default.obj((file, encoding, done) => {
    if (file.isBuffer()) {
        const before = file.contents.toString(encoding);
        try {
            const after = fn(before, file);
            file.contents = Buffer.from(after);
            done(null, file);
        }
        catch (err) {
            done(err, null);
        }
    }
    else {
        done(null, file);
    }
});
exports.createTrasformStreamAsync = (fn) => through2_1.default.obj((file, encoding, done) => {
    if (file.isBuffer()) {
        const before = file.contents.toString(encoding);
        fn(before, file)
            .then((after) => {
            file.contents = Buffer.from(after);
            done(null, file);
        })
            .catch((err) => {
            done(err, null);
        });
    }
    else {
        done(null, file);
    }
});
