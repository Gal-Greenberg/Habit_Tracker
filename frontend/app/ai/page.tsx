"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAiInsights } from "../services/ai";

type Message = {
    role: "user" | "ai";
    text: string;
};

const ACTION_LABELS: Record<string, string> = {
    review_habits: "סקור את ההרגלים שלי",
    suggest_new: "הצע הרגלים חדשים",
};

export default function AiPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [freeText, setFreeText] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUserName = sessionStorage.getItem("userName");
        if (!storedUserName) {
            router.push("/");
        }
    }, []);

    const sendAction = async (action: string) => {
        const label = ACTION_LABELS[action];
        setMessages((prev) => [...prev, { role: "user", text: label }]);
        setLoading(true);
        try {
            const insights = await getAiInsights(action);
            setMessages((prev) => [...prev, { role: "ai", text: insights }]);
        } catch {
            setMessages((prev) => [...prev, { role: "ai", text: "משהו השתבש, נסי שוב." }]);
        } finally {
            setLoading(false);
        }
    };

    const sendFreeText = async () => {
        if (!freeText.trim()) 
            return;
        
        const text = freeText.trim();
        setFreeText("");
        setMessages((prev) => [...prev, { role: "user", text }]);
        setLoading(true);
        try {
            const insights = await getAiInsights("free_text", text);
            setMessages((prev) => [...prev, { role: "ai", text: insights }]);
        } catch {
            setMessages((prev) => [...prev, { role: "ai", text: "משהו השתבש, נסי שוב." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full h-full flex flex-col" dir="rtl">

            {/* Preset buttons */}
            <div className="flex gap-3 mb-6 flex-wrap">
                {Object.entries(ACTION_LABELS).map(([action, label]) => (
                    <button
                        key={action}
                        onClick={() => sendAction(action)}
                        disabled={loading}
                        className="bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark"
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Chat window */}
            <div className="flex-1 border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4 overflow-y-auto flex flex-col gap-3 min-h-72 max-h-[480px]">
                {messages.length === 0 && (
                    <p className="text-gray-400 text-center mt-20 text-sm">
                        עדיין אין הודעות. לחצי על כפתור או כתבי שאלה.
                    </p>
                )}
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`max-w-[80%] px-4 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap
                            ${msg.role === "user"
                                ? "self-end bg-bgButton text-white"
                                : "self-start bg-white text-gray-800 border border-gray-200"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && (
                    <p className="self-start text-gray-400 text-xs">מחשב...</p>
                )}
            </div>

            {/* Free text input */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={freeText}
                    onChange={(e) => setFreeText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendFreeText()}
                    placeholder="כתבי שאלה חופשית..."
                    disabled={loading}
                    className="flex-1 px-4 py-2 rounded border border-gray-300 text-sm text-textMain outline-none focus:border-bgButton disabled:opacity-50"
                />
                <button
                    onClick={sendFreeText}
                    disabled={loading || !freeText.trim()}
                    className="bg-bgButton text-white px-4 py-2 rounded hover:bg-bgButtonDark disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                >
                    שלחי
                </button>
            </div>
        </div>
    );
}