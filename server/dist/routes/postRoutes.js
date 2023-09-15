"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../Middleware/auth");
const router = express_1.default.Router();
const posts_1 = require("../controller/posts");
router.post('/:userId', auth_1.verifyToken, posts_1.addPost);
router.get('/:userId', auth_1.verifyToken, posts_1.getFeedpost);
router.patch('/:postId/editpost', auth_1.verifyToken, posts_1.editPost);
router.delete('/:postId/deletePost', auth_1.verifyToken, posts_1.deletePost);
router.patch('/:postId/checked', auth_1.verifyToken, posts_1.changeStatus);
exports.default = router;
