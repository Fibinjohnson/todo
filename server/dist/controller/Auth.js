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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const connection_1 = require("../connection/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, 'req body');
        const { name, email, password } = req.body;
        const saltRounds = 10;
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const database = yield (0, connection_1.connectToDb)();
        const addNewUser = yield (database === null || database === void 0 ? void 0 : database.collection('users').insertOne({
            name,
            email,
            password: passwordHash
        }));
        res.status(200).json({ addNewUser });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const database = yield (0, connection_1.connectToDb)();
        const user = yield (database === null || database === void 0 ? void 0 : database.collection("users").findOne({ email: email }));
        if (!user) {
            return res.status(400).json({ msg: "Email not found" });
        }
        ;
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        console.log(isMatch, "password match");
        if (!isMatch) {
            return res.status(200).json({ msg: "invalid Password" });
        }
        else {
            const secretKey = process.env.SECRETCODEJWT;
            if (!secretKey) {
                console.error('JWT secret key is not defined.');
                process.exit(1);
            }
            const token = (0, jsonwebtoken_1.sign)({ id: user._id }, secretKey);
            const userWithoutPassword = Object.assign(Object.assign({}, user), { password: undefined });
            res.status(200).json({ token, user: userWithoutPassword });
        }
    }
    catch (err) {
        res.status(500).json({ error: err });
        console.log("error of this code is:", err);
    }
});
exports.login = login;
