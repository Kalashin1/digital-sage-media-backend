"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var article_schema_1 = require("../schemas/article.schema");
var notification_1 = require("./notification");
var user_model_1 = require("./user.model");
article_schema_1["default"].statics.createArticle = function (article) {
    return __awaiter(this, void 0, void 0, function () {
        var author, Article;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(article.author)];
                case 1:
                    author = _a.sent();
                    if (!author) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.create(__assign({}, article))];
                case 2:
                    Article = _a.sent();
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: Article.author,
                            body: "A new Article with title " + Article.title + " has been created by " + author.name,
                            type: "Article created."
                        })];
                case 3:
                    _a.sent();
                    return [2 /*return*/, Article];
                case 4: throw Error('No user with Id!');
            }
        });
    });
};
article_schema_1["default"].statics.updateArticle = function (article) {
    return __awaiter(this, void 0, void 0, function () {
        var Article, time;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findById(article._id)];
                case 1:
                    Article = _a.sent();
                    if (!Article) return [3 /*break*/, 3];
                    time = new Date().toString();
                    return [4 /*yield*/, Article.updateOne(__assign(__assign({}, article), { updatedAt: time }))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Article];
                case 3: throw Error('That article does not exist');
            }
        });
    });
};
article_schema_1["default"].statics.getUserArticles = function (author) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, this.find({ author: author })];
        });
    });
};
article_schema_1["default"].statics.deleteArticle = function (article) {
    return __awaiter(this, void 0, void 0, function () {
        var Article;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findById(article._id)];
                case 1:
                    Article = _a.sent();
                    if (!Article) return [3 /*break*/, 3];
                    return [4 /*yield*/, Article.deleteOne({ _id: article._id })];
                case 2:
                    _a.sent();
                    return [2 /*return*/, Article];
                case 3: throw Error('That article does not exist');
            }
        });
    });
};
article_schema_1["default"].methods.likeArticle = function (userId, optn) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(userId)];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 7];
                    if (!(optn === 'add')) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.updateOne({ likes: this.likes + 1 })];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, this.updateOne({ likes: this.likes - 1 })];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    _a;
                    return [4 /*yield*/, notification_1["default"].create({
                            userId: user._id,
                            body: "You have a new like on your article, total likes, " + this.likes,
                            type: "New Like on article."
                        })];
                case 6:
                    _b.sent();
                    return [2 /*return*/, this];
                case 7: throw Error('No user exists with that id');
            }
        });
    });
};
article_schema_1["default"].methods.saveArticle = function (userId, optn) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(userId)];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 8];
                    if (!(optn === 'add')) return [3 /*break*/, 4];
                    return [4 /*yield*/, this.updateOne({ saves: this.saves + 1 })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user.updateOne({ savedArticles: __spreadArray(__spreadArray([], user.savedArticles, true), [this._id.toString()], false) })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4: return [4 /*yield*/, this.updateOne({ saves: this.saves - 1 })];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, user.updateOne({ savedArticles: user.savedArticles.filter(function (a) { return a !== _this._id.toString(); }) })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [2 /*return*/, this];
                case 8: throw Error('No user exists with that id');
            }
        });
    });
};
article_schema_1["default"].methods.readArticle = function (userId, optn) {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(userId)];
                case 1:
                    user = _b.sent();
                    if (!user) return [3 /*break*/, 6];
                    if (!(optn === 'add')) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.updateOne({ views: this.views + 1 })];
                case 2:
                    _a = _b.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, this.updateOne({ views: this.views - 1 })];
                case 4:
                    _a = _b.sent();
                    _b.label = 5;
                case 5:
                    _a;
                    return [2 /*return*/, this];
                case 6: throw Error('No user exists with that id');
            }
        });
    });
};
article_schema_1["default"].pre('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        var words, readingTimeInSeconds, readingTimeInMins;
        return __generator(this, function (_a) {
            words = this.body.split(' ');
            readingTimeInSeconds = (words.length / 200) * .60;
            readingTimeInMins = Math.floor(readingTimeInSeconds * 60);
            this.readingTime = readingTimeInMins + " mins";
            return [2 /*return*/];
        });
    });
});
article_schema_1["default"].post('save', function () {
    return __awaiter(this, void 0, void 0, function () {
        var user, articles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, user_model_1["default"].findById(this.author)];
                case 1:
                    user = _a.sent();
                    articles = __spreadArray(__spreadArray([], user.articles, true), [this._id], false);
                    //@ts-ignore
                    return [4 /*yield*/, user.updateOne({ articles: articles })];
                case 2:
                    //@ts-ignore
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
});
article_schema_1["default"].pre('updateOne', function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            this.updatedAt = new Date().toString();
            return [2 /*return*/];
        });
    });
});
var Articles = (0, mongoose_1.model)('article', article_schema_1["default"]);
exports["default"] = Articles;
