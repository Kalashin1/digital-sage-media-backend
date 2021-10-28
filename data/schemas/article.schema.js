"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var ArticleSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please the title of the articke.']
    },
    category: {
        type: String,
        required: [true, 'Please the category of the title.']
    },
    body: {
        type: String,
        required: [true, 'Please the body of the title.']
    },
    createdAt: {
        type: String,
        "default": function () { return new Date().toString(); }
    },
    updatedAt: {
        type: String,
        "default": function () { return new Date().toString(); }
    },
    tags: {
        type: [String],
        required: [true, 'Please the tags of the title.']
    },
    author: {
        type: String,
        required: [true, 'Please the author of the title.']
    },
    url: {
        type: String
    },
    dislikes: {
        type: Number,
        "default": function () { return 0; }
    },
    likes: {
        type: Number,
        "default": function () { return 0; }
    },
    views: {
        type: Number,
        "default": function () { return 0; }
    },
    thumbsUp: {
        type: Number,
        "default": function () { return 0; }
    },
    readingTime: {
        type: String
    },
    comments: {
        type: [String]
    },
    saves: {
        type: Number,
        "default": function () { return 0; }
    },
    socialImage: {
        type: String
    }
});
exports["default"] = ArticleSchema;
