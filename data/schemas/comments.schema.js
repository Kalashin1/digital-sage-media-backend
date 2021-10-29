"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CommentSchema = new mongoose_1.Schema({
    articleId: {
        type: String,
        required: [true, 'Please the article the comments belong to.']
    },
    createdAt: {
        type: String,
        "default": function () { return new Date().toString(); }
    },
    updatedAt: {
        type: String,
        "default": function () { return new Date().toString(); }
    },
    body: {
        type: String,
        required: [true, 'Please the body of the comment.']
    },
    userId: {
        type: String,
        required: [true, 'Please the author of the title.']
    },
    parentCommentId: {
        type: String
    },
    likes: {
        type: Number,
        "default": function () { return 0; }
    }
});
exports["default"] = CommentSchema;
