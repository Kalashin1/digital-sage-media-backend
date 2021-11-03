"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var mongoose = require("mongoose");
require('dotenv').config();
var user_controller_1 = require("./controllers/user/user.controller");
var article_controller_1 = require("./controllers/article/article.controller");
var article_model_1 = require("./data/models/article.model");
var article_controller_2 = require("./controllers/article/article.controller");
var comment_controller_1 = require("./controllers/comment/comment.controller");
var user_model_1 = require("./data/models/user.model");
var notification_controller_1 = require("./controllers/notification/notification.controller");
var notification_1 = require("./data/models/notification");
var url = 'mongodb://localhost:27017/disme';
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    name: String!\n    _id: ID!\n    email: String!\n    emailVerified: String!\n    phoneNumber: String!\n    displayImage: String!\n    gender: String!\n    dob: String!\n    token: String!\n    createdAt: String!\n    socialMediaInfo: _SocialMediaInfo\n    savedArticles: [Article]\n    articles: [Article]\n    followers: [User]!\n    notifications: [Notification!]!\n    following: [User]!\n  }\n\n  type Article {\n    _id: ID\n    title: String!\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    socialImage: String!\n    url: String!\n    tags: [String!]!\n    category: String!\n    views: Int!\n    readingTime: String!\n    likes: Int!\n    dislikes: Int!\n    saves: Int!\n    thumbsUp: Int!\n    author: String!\n    comments: [Comment!]!\n  }\n\n  type Comment {\n    _id: ID\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    userId: String!\n    parentCommentId: String\n    articleId: String!\n    likes: Int!\n    comments: [Comment]!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  type _SocialMediaInfo {\n    facebook: String!\n    twitter: String!\n    instagram: String!\n  }\n\n  type Query {\n    users: [User!]!\n    user(id: String): User!\n    articles: [Article!]!\n    article(id: String): Article!\n    comments(articleId: String): [Comment!]!\n    comment(id: String): Comment!\n    notifications: [Notification!]!\n    notification(id: String): Notification!\n    usersNotifications(userId: String): [Notification!]!\n    usersUnReadNotifications(userId: String): [Notification!]\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    gender: String\n    password: String\n  }\n\n  input LoginInfo{\n    email: String\n    password: String\n  }\n\n  input SocialMediaInfo {\n    facebook: String\n    twitter: String\n    instagram: String\n  }\n\n  input CreateArticleInput {\n    title: String!\n    body: String!\n    tags: [String!]!\n    category: String!\n    author: String!\n    socialImage: String\n    _id: String\n  }\n\n  input CreateComment {\n    _id: ID\n    userId: String!\n    articleId: String!\n    body: String!\n    parentCommentId: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updateDOB(id: String, dob: String): User!\n    updateDisplayImage(id: String, imageUrl: String): User!\n    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): User!\n    updateGender(id: String, gender: String): User!\n    deleteAccount(id: String): User!\n    followUser(userId: String, followerId: String): User!\n    unFollowUser(userId: String, followerId: String): User!\n    createArticle(article: CreateArticleInput): Article\n    updateArticle(article: CreateArticleInput): Article\n    deleteArticle(article: CreateArticleInput): Article\n    toggleLikes(articleId: String, userId: String, optn: String): Article\n    toggleSaves(articleId: String, userId: String, optn: String): Article\n    toggleViews(articleId: String, userId: String, optn: String): Article\n    createComment(comment: CreateComment): Comment\n    editComment(comment: CreateComment): Comment\n    deleteComment(comment: CreateComment): Comment\n    createChildComment(comment: CreateComment): Comment \n    likeComment(userId: String, optn: String, commentId: String): Comment\n    markNotificationAsRead(id: String): Notification\n    markMultipleNotificationsAsRead(ids: [String!]!): String\n  }\n"], ["\n  type User {\n    name: String!\n    _id: ID!\n    email: String!\n    emailVerified: String!\n    phoneNumber: String!\n    displayImage: String!\n    gender: String!\n    dob: String!\n    token: String!\n    createdAt: String!\n    socialMediaInfo: _SocialMediaInfo\n    savedArticles: [Article]\n    articles: [Article]\n    followers: [User]!\n    notifications: [Notification!]!\n    following: [User]!\n  }\n\n  type Article {\n    _id: ID\n    title: String!\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    socialImage: String!\n    url: String!\n    tags: [String!]!\n    category: String!\n    views: Int!\n    readingTime: String!\n    likes: Int!\n    dislikes: Int!\n    saves: Int!\n    thumbsUp: Int!\n    author: String!\n    comments: [Comment!]!\n  }\n\n  type Comment {\n    _id: ID\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    userId: String!\n    parentCommentId: String\n    articleId: String!\n    likes: Int!\n    comments: [Comment]!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  type _SocialMediaInfo {\n    facebook: String!\n    twitter: String!\n    instagram: String!\n  }\n\n  type Query {\n    users: [User!]!\n    user(id: String): User!\n    articles: [Article!]!\n    article(id: String): Article!\n    comments(articleId: String): [Comment!]!\n    comment(id: String): Comment!\n    notifications: [Notification!]!\n    notification(id: String): Notification!\n    usersNotifications(userId: String): [Notification!]!\n    usersUnReadNotifications(userId: String): [Notification!]\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    gender: String\n    password: String\n  }\n\n  input LoginInfo{\n    email: String\n    password: String\n  }\n\n  input SocialMediaInfo {\n    facebook: String\n    twitter: String\n    instagram: String\n  }\n\n  input CreateArticleInput {\n    title: String!\n    body: String!\n    tags: [String!]!\n    category: String!\n    author: String!\n    socialImage: String\n    _id: String\n  }\n\n  input CreateComment {\n    _id: ID\n    userId: String!\n    articleId: String!\n    body: String!\n    parentCommentId: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updateDOB(id: String, dob: String): User!\n    updateDisplayImage(id: String, imageUrl: String): User!\n    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): User!\n    updateGender(id: String, gender: String): User!\n    deleteAccount(id: String): User!\n    followUser(userId: String, followerId: String): User!\n    unFollowUser(userId: String, followerId: String): User!\n    createArticle(article: CreateArticleInput): Article\n    updateArticle(article: CreateArticleInput): Article\n    deleteArticle(article: CreateArticleInput): Article\n    toggleLikes(articleId: String, userId: String, optn: String): Article\n    toggleSaves(articleId: String, userId: String, optn: String): Article\n    toggleViews(articleId: String, userId: String, optn: String): Article\n    createComment(comment: CreateComment): Comment\n    editComment(comment: CreateComment): Comment\n    deleteComment(comment: CreateComment): Comment\n    createChildComment(comment: CreateComment): Comment \n    likeComment(userId: String, optn: String, commentId: String): Comment\n    markNotificationAsRead(id: String): Notification\n    markMultipleNotificationsAsRead(ids: [String!]!): String\n  }\n"])));
var resolvers = {
    User: {
        articles: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, article_model_1["default"].getUserArticles(parent._id)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        },
        savedArticles: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                var articles;
                var _this = this;
                return __generator(this, function (_a) {
                    articles = parent.savedArticles.map(function (article) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, article_model_1["default"].findById(article)];
                        });
                    }); });
                    return [2 /*return*/, articles];
                });
            });
        },
        followers: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, parent.followers.map(function (f) { return user_model_1["default"].findById(f); })];
                });
            });
        },
        following: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, parent.following.map(function (f) { return user_model_1["default"].findById(f); })];
                });
            });
        },
        notifications: function (parent) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, notification_1["default"].findUserNotifications(parent._id)];
                });
            });
        }
    },
    Article: article_controller_2.Article,
    Comment: comment_controller_1.Comment,
    Notification: notification_controller_1.Notification,
    Query: __assign(__assign(__assign({ users: function (_, args, context) {
            // console.log(context.req.headers.usertoken);
            return (0, user_controller_1.getUsers)();
        }, user: function (_, _a, context) {
            var id = _a.id;
            return (0, user_controller_1.getUser)(id);
        } }, article_controller_2.ArticleQueries), notification_controller_1.NotificationQueries), comment_controller_1.CommentQueries),
    Mutation: __assign(__assign(__assign({ createAccount: function (_, _a, context) {
            var profile = _a.profile;
            return __awaiter(this, void 0, void 0, function () {
                var _b, User, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.createAccount)(profile)];
                        case 1:
                            _b = _c.sent(), User = _b[0], token = _b[1];
                            User.token = token;
                            return [2 /*return*/, User];
                    }
                });
            });
        }, login: function (_, _a, context) {
            var loginInfo = _a.loginInfo;
            return __awaiter(this, void 0, void 0, function () {
                var _b, user, token;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.login)(loginInfo)];
                        case 1:
                            _b = _c.sent(), user = _b[0], token = _b[1];
                            user.token = token;
                            return [2 /*return*/, user];
                    }
                });
            });
        }, updatePhoneNumber: function (_, _a, context) {
            var phoneNumber = _a.phoneNumber, id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.updatePhoneNumber)(id, phoneNumber)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }, updateDOB: function (_, _a, context) {
            var dob = _a.dob, id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.updateDOB)(id, dob)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }, updateDisplayImage: function (_, _a, context) {
            var imageUrl = _a.imageUrl, id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.updateDisplayImage)(id, imageUrl)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }, updateGender: function (_, _a, context) {
            var gender = _a.gender, id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.updateGender)(id, gender)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }, updateSocialMediaInfo: function (_, _a, context) {
            var socialMediaInfo = _a.socialMediaInfo, id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, (0, user_controller_1.updateSocialMediaInfo)(id, socialMediaInfo)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        }, deleteAccount: function (_, _a, context) {
            var id = _a.id;
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            user = (0, user_controller_1.getUser)(id);
                            if (!user) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, user_controller_1.deleteUser)(id)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/, user];
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }, followUser: function (_, _a) {
            var userId = _a.userId, followerId = _a.followerId;
            return __awaiter(this, void 0, void 0, function () {
                var user;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, user_model_1["default"].followUser(userId, followerId)];
                        case 1:
                            user = _b.sent();
                            console.log(user);
                            return [2 /*return*/, user];
                    }
                });
            });
        }, unFollowUser: function (_, _a) {
            var userId = _a.userId, followerId = _a.followerId;
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, user_model_1["default"].unFollowUser(userId, followerId)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        } }, article_controller_1["default"]), comment_controller_1.CommentMutations), notification_controller_1.NotificationMutations)
};
var server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: function (_a) {
        var req = _a.req, res = _a.res;
        return ({ req: req, res: res });
    }
});
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(function (_result) { return server.listen().then(function (_a) {
    var url = _a.url;
    console.log(url);
}); })["catch"](function (err) { return console.log(err); });
var templateObject_1;
