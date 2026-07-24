import os

import requests
from flask import Flask, jsonify, request


app = Flask(__name__)

SUPABASE_URL = os.getenv("SUPABASE_URL") or os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_ANON_KEY") or os.getenv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")


def missing_supabase_response():
    return jsonify({
        "error": (
            "Supabase client is not configured. Set SUPABASE_URL / "
            "NEXT_PUBLIC_SUPABASE_URL and SUPABASE_ANON_KEY / "
            "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local."
        )
    }), 500


def supabase_request(method, path, **kwargs):
    headers = kwargs.pop("headers", {})
    headers.update({
        "apikey": SUPABASE_KEY,
        "Authorization": f"Bearer {SUPABASE_KEY}",
        "Content-Type": "application/json",
    })
    return requests.request(
        method,
        f"{SUPABASE_URL}/rest/v1/{path}",
        headers=headers,
        timeout=20,
        **kwargs,
    )


@app.get("/api/posts")
def get_posts():
    if not SUPABASE_URL or not SUPABASE_KEY:
        return missing_supabase_response()

    response = supabase_request(
        "GET",
        "posts",
        params={"select": "*", "order": "created_at.desc", "limit": 20},
    )
    if not response.ok:
        return jsonify({"error": response.text}), 500
    return jsonify(response.json())


@app.post("/api/posts")
def create_post():
    if not SUPABASE_URL or not SUPABASE_KEY:
        return missing_supabase_response()

    payload = request.get_json(silent=True) or {}
    author = payload.get("author")
    role = payload.get("role")
    title = payload.get("title")
    text = payload.get("body")
    stats = payload.get("stats")
    if not all((author, role, title, text, stats)):
        return jsonify({"error": "Missing required fields"}), 400

    response = supabase_request(
        "POST",
        "posts",
        headers={"Prefer": "return=representation"},
        json=[{"author": author, "role": role, "title": title, "body": text, "stats": stats}],
    )
    if not response.ok:
        return jsonify({"error": response.text}), 500
    return jsonify(response.json()), 201


@app.post("/api/ai-assistant")
def ask_ai():
    if not GEMINI_API_KEY:
        return jsonify({"error": "Gemini API key is not configured."}), 500

    payload = request.get_json(silent=True) or {}
    message = payload.get("message")
    history = payload.get("history", [])
    context = payload.get("context")
    if not message:
        return jsonify({"error": "Message is required."}), 400

    system_prompt = " ".join([
        "You are Researchora AI, a research assistant specialized in helping users understand scientific papers.",
        "Explain research papers, methodology, figures, tables, equations, and technical terminology clearly.",
        "Summarize sections, compare papers, recommend relevant literature, and help interpret statistical analyses.",
        "If a user asks an unrelated question, politely redirect them back to research topics.",
        "Do not fabricate citations, papers, authors, journals, or findings.",
        "When context is available, incorporate the paper title, authors, abstract, and user highlights or notes into the answer.",
    ])
    contents = [{
        "role": "user",
        "parts": [{"text": f"{system_prompt}\n\nContext:\n{context or 'No specific paper context provided.'}"}],
    }]
    contents.extend({
        "role": "model" if item.get("role") == "assistant" else "user",
        "parts": [{"text": item.get("content", "")}],
    } for item in history)
    contents.append({"role": "user", "parts": [{"text": message}]})

    response = requests.post(
        f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent",
        params={"key": GEMINI_API_KEY},
        json={
            "contents": contents,
            "generationConfig": {"temperature": 0.4, "topP": 0.9, "maxOutputTokens": 700},
        },
        timeout=60,
    )
    if not response.ok:
        return jsonify({"error": response.text}), response.status_code

    data = response.json()
    reply = (
        data.get("candidates", [{}])[0]
        .get("content", {})
        .get("parts", [{}])[0]
        .get("text")
        or "I can help with that. Please ask about a paper or a research topic."
    )
    return jsonify({"reply": reply})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "5000")), debug=True)