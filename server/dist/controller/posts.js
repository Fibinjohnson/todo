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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeStatus = exports.getFeedpost = exports.editPost = exports.deletePost = exports.addPost = void 0;
const connection_1 = require("../connection/connection");
const mongodb_1 = require("mongodb");
const addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, completed } = req.body;
        const { userId } = req.params;
        const database = yield (0, connection_1.connectToDb)();
        if (!database) {
            console.log('error occured');
        }
        else {
            const addedPost = yield database.collection('posts').insertOne({
                title,
                content,
                user: new mongodb_1.ObjectId(userId),
                completed
            });
            res.status(200).json(addedPost);
        }
    }
    catch (error) {
        console.error('Error occured on adding:', error);
        res.status(500).json({ message: 'Error occured on adding' });
    }
});
exports.addPost = addPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connection_1.connectToDb)();
        const { postId } = req.params;
        const { userId } = req.body;
        if (!db) {
            console.log('posts error');
        }
        else {
            yield db.collection('posts').deleteOne({ _id: new mongodb_1.ObjectId(postId) });
            const newPosts = yield db.collection('posts').find({ user: new mongodb_1.ObjectId(userId) }).toArray();
            res.status(200).json(newPosts);
        }
    }
    catch (error) {
        console.error('Error occured on deleting:', error);
        res.status(500).json({ message: 'Error occured on deleting' });
    }
});
exports.deletePost = deletePost;
const editPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield (0, connection_1.connectToDb)();
        const { postId } = req.params;
        const { title, content, completed } = req.body;
        if (db) {
            yield db.collection('posts').updateOne({ _id: new mongodb_1.ObjectId(postId) }, {
                $set: {
                    title: title,
                    content: content,
                    completed: completed
                }
            });
            const editedPost = yield db.collection('posts').findOne({ _id: new mongodb_1.ObjectId(postId) });
            res.status(200).json(editedPost);
        }
    }
    catch (error) {
        console.error('Error occured on editing:', error);
        res.status(500).json({ message: 'Error occured on editing' });
    }
});
exports.editPost = editPost;
const getFeedpost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const db = yield (0, connection_1.connectToDb)();
        const feedPosts = yield (db === null || db === void 0 ? void 0 : db.collection('posts').find({ user: new mongodb_1.ObjectId(userId) }).toArray());
        res.status(200).json(feedPosts);
    }
    catch (error) {
        console.error('Error fetching feed posts:', error);
        res.status(500).json({ message: 'An error occurred while fetching feed posts.' });
    }
});
exports.getFeedpost = getFeedpost;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const db = yield (0, connection_1.connectToDb)();
        const post = yield (db === null || db === void 0 ? void 0 : db.collection('posts').findOne({ _id: new mongodb_1.ObjectId(postId) }));
        if (post) {
            const updatedValue = !post.completed;
            yield (db === null || db === void 0 ? void 0 : db.collection('posts').updateOne({ _id: new mongodb_1.ObjectId(postId) }, { $set: { completed: updatedValue } }));
            const updatedPost = yield (db === null || db === void 0 ? void 0 : db.collection('posts').findOne({ _id: new mongodb_1.ObjectId(postId) }));
            res.status(200).json(updatedPost);
        }
    }
    catch (err) {
        console.error('Error status feed posts:', err);
        res.status(500).json({ message: 'an error occured in status change.' });
    }
});
exports.changeStatus = changeStatus;
