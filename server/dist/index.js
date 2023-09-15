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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./connection/connection");
const app = (0, express_1.default)();
const http_1 = __importDefault(require("http"));
const server = http_1.default.createServer(app);
const Auth_1 = require("./controller/Auth");
const auth_1 = __importDefault(require("./routes/auth"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
app.use((0, cors_1.default)({ origin: "http://localhost:3000",
    credentials: true }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use((0, morgan_1.default)("common"));
app.use(helmet_1.default.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.post('/api/auth/register', Auth_1.register);
app.use('/api/auth', auth_1.default);
app.use('/api/post', postRoutes_1.default);
(0, connection_1.connectToDb)().then(() => {
    console.log("connection successfull");
    server.listen(3001 || process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("app is listening at port 3001");
    }));
}).catch((error) => {
    console.log('connection ERROR', error);
});
module.exports = app;
