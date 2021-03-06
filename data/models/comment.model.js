"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var comments_schema_1 = require("../schemas/comments.schema");
var notification_1 = require("./notification");
var article_model_1 = require("./article.model");
var user_model_1 = require("./user.model");
comments_schema_1["default"].statics.createComment = function (comment) {
    return __awaiter(this, void 0, void 0, function () {
        var article, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, article_model_1["default"].findById(comment.articleId)];
                case 1:
                    article = _a.sent();
                    if (!article) return [3 /*break*/, 5];
                    return [4 /*yield*/, user_model_1["default"].findById(comment.userId)];
                case 2:
                    user = _a.sent();
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: article.author,
                            body: user.name + " commented on your article.",
                            type: "Article commented on."
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, this.create(comment)];
                case 4: return [2 /*return*/, _a.sent()];
                case 5: throw Error('No article exists with that id');
            }
        });
    });
};
comments_schema_1["default"].statics.editComment = function (comment) {
    return __awaiter(this, void 0, void 0, function () {
        var Comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findById(comment._id)];
                case 1:
                    Comment = _a.sent();
                    if (!Comment) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.updateOne({ _id: comment._id }, comment)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Comment];
                case 3: throw Error('No Comment exists with that id');
            }
        });
    });
};
comments_schema_1["default"].statics.deleteComment = function (comment) {
    return __awaiter(this, void 0, void 0, function () {
        var Comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findById(comment._id)];
                case 1:
                    Comment = _a.sent();
                    if (!Comment) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.deleteOne({ _id: comment._id })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Comment];
                case 3: throw Error('No Comment exists with that id');
            }
        });
    });
};
comments_schema_1["default"].methods.likeComment = function (userId, optn) {
    return __awaiter(this, void 0, void 0, function () {
        var user, article, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(userId)];
                case 1:
                    user = _b.sent();
                    return [4 /*yield*/, article_model_1["default"].findById(this.articleId)];
                case 2:
                    article = _b.sent();
                    if (!user) return [3 /*break*/, 8];
                    if (!(optn === 'add')) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.updateOne({ likes: this.likes + 1 })];
                case 3:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, this.updateOne({ likes: this.likes - 1 })];
                case 5:
                    _a = _b.sent();
                    _b.label = 6;
                case 6:
                    _a;
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: article.author,
                            body: user.name + " likes your comment.",
                            type: "Comment liked."
                        })];
                case 7:
                    _b.sent();
                    return [2 /*return*/, this];
                case 8: throw Error('No user exists with that id');
            }
        });
    });
};
comments_schema_1["default"].methods.comment = function (comment) {
    return __awaiter(this, void 0, void 0, function () {
        var article, commentor, Comment;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    comment.parentCommentId = this._id.toString();
                    return [4 /*yield*/, article_model_1["default"].findById(comment.articleId)];
                case 1:
                    article = _a.sent();
                    return [4 /*yield*/, user_model_1["default"].findById(comment.userId)];
                case 2:
                    commentor = _a.sent();
                    return [4 /*yield*/, (0, mongoose_1.model)('comment').create(comment)];
                case 3:
                    Comment = _a.sent();
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: article.author,
                            body: commentor.name + " replied to your comment.",
                            type: "Comment replied."
                        })];
                case 4:
                    _a.sent();
                    return [2 /*return*/, Comment];
            }
        });
    });
};
var Comments = (0, mongoose_1.model)('comment', comments_schema_1["default"]);
exports["default"] = Comments;
