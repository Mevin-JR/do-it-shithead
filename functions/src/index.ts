import * as admin from "firebase-admin";
import cors from "cors";
import OpenAI from "openai";
import { defineString } from "firebase-functions/params";
import { onRequest } from "firebase-functions/v2/https";

admin.initializeApp();
const corsHandler = cors({ origin: true });

// const USE_OPENAI = process.env.USE_OPENAI !== "false";
const OPENAI_KEY = defineString("OPENAI_KEY");
const OPENAI_MODEL = "gpt-4o-mini";

function normalizeMessages(raw: any[]) {
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((m) => m && typeof m.role === "string" && m.content != null)
    .map((m) => ({
      role: m.role,
      content: String(m.content),
    }));
}

export const chat = onRequest((req, res) => {
  return new Promise<void>((resolve) => {
    corsHandler(req, res, async () => {
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

        const rawMessages = req.body?.messages;
        const personality =
          typeof req.body?.personality === "string"
            ? req.body.personality
            : "You are a helpful assistant.";

        const safeMessages = normalizeMessages(rawMessages).slice(-6);

        const openai = new OpenAI({
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
      } catch (e) {
        console.error(e);
        res.status(500).send("Chat failed");
        resolve();
      }
    });
  });
});
