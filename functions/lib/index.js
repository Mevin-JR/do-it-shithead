"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
const admin = __importStar(require("firebase-admin"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = __importDefault(require("openai"));
const params_1 = require("firebase-functions/params");
const https_1 = require("firebase-functions/v2/https");
admin.initializeApp();
const corsHandler = (0, cors_1.default)({ origin: true });
// const USE_OPENAI = process.env.USE_OPENAI !== "false";
const OPENAI_KEY = (0, params_1.defineString)("OPENAI_KEY");
const OPENAI_MODEL = "gpt-4o-mini";
function normalizeMessages(raw) {
    if (!Array.isArray(raw))
        return [];
    return raw
        .filter((m) => m && typeof m.role === "string" && m.content != null)
        .map((m) => ({
        role: m.role,
        content: String(m.content),
    }));
}
exports.chat = (0, https_1.onRequest)((req, res) => {
    return new Promise((resolve) => {
        corsHandler(req, res, async () => {
            var _a, _b;
            if (req.method === "OPTIONS") {
                res.status(204).send("");
                return resolve();
            }
            try {
                const auth = req.headers.authorization;
                if (!auth) {
                    res.status(401).send("No token");
                    return resolve();
                }
                const token = auth.split("Bearer ")[1];
                await admin.auth().verifyIdToken(token);
                const rawMessages = (_a = req.body) === null || _a === void 0 ? void 0 : _a.messages;
                const personality = typeof ((_b = req.body) === null || _b === void 0 ? void 0 : _b.personality) === "string"
                    ? req.body.personality
                    : "You are a helpful assistant.";
                const safeMessages = normalizeMessages(rawMessages).slice(-6);
                const openai = new openai_1.default({
                    apiKey: OPENAI_KEY.value(),
                });
                const completion = await openai.chat.completions.create({
                    model: OPENAI_MODEL,
                    messages: [{ role: "system", content: personality }, ...safeMessages],
                    max_tokens: 400, // ✅ COST CONTROL
                    temperature: 0.5, // ✅ stable + cheaper
                });
                res.json({ reply: completion.choices[0].message.content });
                resolve();
            }
            catch (e) {
                console.error(e);
                res.status(500).send("Chat failed");
                resolve();
            }
        });
    });
});
//# sourceMappingURL=index.js.map