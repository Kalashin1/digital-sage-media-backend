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
exports.__esModule = true;
var apollo_server_1 = require("apollo-server");
var mongoose = require("mongoose");
require('dotenv').config();
var article_controller_1 = require("./controllers/article/article.controller");
var article_controller_2 = require("./controllers/article/article.controller");
var comment_controller_1 = require("./controllers/comment/comment.controller");
var notification_controller_1 = require("./controllers/notification/notification.controller");
var user_1 = require("./controllers/user/user");
var url = 'mongodb://localhost:27017/disme';
var typeDefs = (0, apollo_server_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Edge {\n    cursor: String\n    node: Node\n  }\n\n  type PageInfo {\n    endCursor: String\n    hasNextPage: Boolean\n  }\n\n  type Response {\n    edges: [Edge]\n    count: Int!\n    pageInfo: PageInfo \n  }\n\n  type Node {\n    User: User\n    Article: Article\n  }\n\n  type User {\n    name: String!\n    _id: ID!\n    email: String!\n    emailVerified: String!\n    phoneNumber: String!\n    displayImage: String!\n    gender: String!\n    dob: String!\n    token: String!\n    createdAt: String!\n    socialMediaInfo: _SocialMediaInfo\n    savedArticles: [Article]\n    articles: [Article]\n    followers: [User]!\n    notifications: [Notification!]!\n    following: [User]!\n  }\n  \n\n  type Article {\n    _id: ID\n    title: String!\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    socialImage: String!\n    url: String!\n    tags: [String!]!\n    category: String!\n    views: Int!\n    readingTime: String!\n    likes: Int!\n    dislikes: Int!\n    saves: Int!\n    thumbsUp: Int!\n    author: String!\n    comments: [Comment!]!\n  }\n\n  type Comment {\n    _id: ID\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    userId: String!\n    user: User!\n    parentCommentId: String\n    articleId: String!\n    likes: Int!\n    comments: [Comment]!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  type _SocialMediaInfo {\n    facebook: String!\n    twitter: String!\n    instagram: String!\n  }\n\n  type Query {\n    users(after: String, limit: Int!): Response!\n    user(id: String): User!\n    articles(after: String, limit: Int!, before: String): Response!\n    article(id: String): Article!\n    comments(articleId: String): [Comment!]!\n    comment(id: String): Comment!\n    notifications: [Notification!]!\n    notification(id: String): Notification!\n    usersNotifications(userId: String): [Notification!]!\n    usersUnReadNotifications(userId: String): [Notification!]\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    gender: String\n    password: String\n  }\n\n  input LoginInfo{\n    email: String\n    password: String\n  }\n\n  input SocialMediaInfo {\n    facebook: String\n    twitter: String\n    instagram: String\n  }\n\n  input CreateArticleInput {\n    title: String!\n    body: String!\n    tags: [String!]!\n    category: String!\n    author: String!\n    socialImage: String\n    _id: String\n  }\n\n  input CreateComment {\n    _id: ID\n    userId: String!\n    articleId: String!\n    body: String!\n    parentCommentId: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updateDOB(id: String, dob: String): User!\n    updateDisplayImage(id: String, imageUrl: String): User!\n    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): User!\n    updateGender(id: String, gender: String): User!\n    deleteAccount(id: String): User!\n    followUser(userId: String, followerId: String): User!\n    unFollowUser(userId: String, followerId: String): User!\n    createArticle(article: CreateArticleInput): Article\n    updateArticle(article: CreateArticleInput): Article\n    deleteArticle(article: CreateArticleInput): Article\n    toggleLikes(articleId: String, userId: String, optn: String): Article\n    toggleSaves(articleId: String, userId: String, optn: String): Article\n    toggleViews(articleId: String, userId: String, optn: String): Article\n    createComment(comment: CreateComment): Comment\n    editComment(comment: CreateComment): Comment\n    deleteComment(comment: CreateComment): Comment\n    createChildComment(comment: CreateComment): Comment \n    likeComment(userId: String, optn: String, commentId: String): Comment\n    markNotificationAsRead(id: String): Notification\n    markMultipleNotificationsAsRead(ids: [String!]!): String\n  }\n"], ["\n  type Edge {\n    cursor: String\n    node: Node\n  }\n\n  type PageInfo {\n    endCursor: String\n    hasNextPage: Boolean\n  }\n\n  type Response {\n    edges: [Edge]\n    count: Int!\n    pageInfo: PageInfo \n  }\n\n  type Node {\n    User: User\n    Article: Article\n  }\n\n  type User {\n    name: String!\n    _id: ID!\n    email: String!\n    emailVerified: String!\n    phoneNumber: String!\n    displayImage: String!\n    gender: String!\n    dob: String!\n    token: String!\n    createdAt: String!\n    socialMediaInfo: _SocialMediaInfo\n    savedArticles: [Article]\n    articles: [Article]\n    followers: [User]!\n    notifications: [Notification!]!\n    following: [User]!\n  }\n  \n\n  type Article {\n    _id: ID\n    title: String!\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    socialImage: String!\n    url: String!\n    tags: [String!]!\n    category: String!\n    views: Int!\n    readingTime: String!\n    likes: Int!\n    dislikes: Int!\n    saves: Int!\n    thumbsUp: Int!\n    author: String!\n    comments: [Comment!]!\n  }\n\n  type Comment {\n    _id: ID\n    createdAt: String!\n    updatedAt: String!\n    body: String!\n    userId: String!\n    user: User!\n    parentCommentId: String\n    articleId: String!\n    likes: Int!\n    comments: [Comment]!\n  }\n\n  type Notification {\n    _id: ID!\n    user: User!\n    body: String!\n    isRead: Boolean!\n    type: String!\n    date: String!\n  }\n\n  type _SocialMediaInfo {\n    facebook: String!\n    twitter: String!\n    instagram: String!\n  }\n\n  type Query {\n    users(after: String, limit: Int!): Response!\n    user(id: String): User!\n    articles(after: String, limit: Int!, before: String): Response!\n    article(id: String): Article!\n    comments(articleId: String): [Comment!]!\n    comment(id: String): Comment!\n    notifications: [Notification!]!\n    notification(id: String): Notification!\n    usersNotifications(userId: String): [Notification!]!\n    usersUnReadNotifications(userId: String): [Notification!]\n  }\n\n  input CreateAccount {\n    name: String\n    email: String\n    phoneNumber: String\n    gender: String\n    password: String\n  }\n\n  input LoginInfo{\n    email: String\n    password: String\n  }\n\n  input SocialMediaInfo {\n    facebook: String\n    twitter: String\n    instagram: String\n  }\n\n  input CreateArticleInput {\n    title: String!\n    body: String!\n    tags: [String!]!\n    category: String!\n    author: String!\n    socialImage: String\n    _id: String\n  }\n\n  input CreateComment {\n    _id: ID\n    userId: String!\n    articleId: String!\n    body: String!\n    parentCommentId: String\n  }\n\n  type Mutation{\n    createAccount(profile: CreateAccount): User!\n    login(loginInfo: LoginInfo): User!\n    updateDOB(id: String, dob: String): User!\n    updateDisplayImage(id: String, imageUrl: String): User!\n    updateSocialMediaInfo(id: String, socialMediaInfo: SocialMediaInfo): User!\n    updatePhoneNumber(id: String, phoneNumber: String): User!\n    updateGender(id: String, gender: String): User!\n    deleteAccount(id: String): User!\n    followUser(userId: String, followerId: String): User!\n    unFollowUser(userId: String, followerId: String): User!\n    createArticle(article: CreateArticleInput): Article\n    updateArticle(article: CreateArticleInput): Article\n    deleteArticle(article: CreateArticleInput): Article\n    toggleLikes(articleId: String, userId: String, optn: String): Article\n    toggleSaves(articleId: String, userId: String, optn: String): Article\n    toggleViews(articleId: String, userId: String, optn: String): Article\n    createComment(comment: CreateComment): Comment\n    editComment(comment: CreateComment): Comment\n    deleteComment(comment: CreateComment): Comment\n    createChildComment(comment: CreateComment): Comment \n    likeComment(userId: String, optn: String, commentId: String): Comment\n    markNotificationAsRead(id: String): Notification\n    markMultipleNotificationsAsRead(ids: [String!]!): String\n  }\n"])));
var resolvers = {
    User: user_1.User,
    Article: article_controller_2.Article,
    Comment: comment_controller_1.Comment,
    Notification: notification_controller_1.Notification,
    Query: __assign(__assign(__assign(__assign({}, user_1.UserQueries), article_controller_2.ArticleQueries), notification_controller_1.NotificationQueries), comment_controller_1.CommentQueries),
    Mutation: __assign(__assign(__assign(__assign({}, user_1.UserMutations), article_controller_1["default"]), comment_controller_1.CommentMutations), notification_controller_1.NotificationMutations)
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
