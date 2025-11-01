import { useCallback, useEffect, useRef, useState } from "react";
import { message } from "antd";
import { splitArabicClauses, parseClauseForExpense } from "../helpers/parser";
import { useLanguage } from "../context/LanguageContext";

export function useVoiceRecognition(onExpensesDetected) {
    const { language } = useLanguage();
    const [listening, setListening] = useState(false);
    const recognitionRef = useRef(null);

    // 1️⃣ Define handleTranscript first
    const handleTranscript = useCallback(
        (transcript) => {
            const cleaned = transcript.replace(/\s+/g, " ").trim();
            const clauses =
                language === "ar"
                    ? splitArabicClauses(cleaned)
                    : cleaned.split(/[.,;]+/);
            const newItems = clauses.map(parseClauseForExpense).filter(Boolean);

            if (newItems.length === 0) {
                void message.info(
                    language === "ar"
                        ? "لم يتم فهم نفقات من الكلام. قل مثلاً: قهوة بـ20"
                        : "No expenses detected. Try saying something like: coffee for 20"
                );
                return;
            }

            onExpensesDetected(newItems);
        },
        [language, onExpensesDetected]
    );

    // 2️⃣ Then use it in useEffect
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) return;

        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.lang = language === "ar" ? "ar-EG" : "en-US";
        rec.interimResults = false;

        rec.onresult = (e) => {
            let text = "";
            for (let i = e.resultIndex; i < e.results.length; ++i)
                text += e.results[i][0].transcript;
            if (text.trim()) handleTranscript(text);
        };

        rec.onerror = () => {
            void message.error(
                language === "ar"
                    ? "تعذر التعرف على الصوت. تأكد من صلاحيات الميكروفون."
                    : "Voice recognition failed. Check microphone permissions."
            );
            setListening(false);
        };

        rec.onend = () => setListening(false);
        recognitionRef.current = rec;
    }, [language, handleTranscript]); // ✅ Include handleTranscript here

    const startListening = () => {
        if (!recognitionRef.current) {
            void message.warn(
                language === "ar"
                    ? "المتصفح لا يدعم التعرف على الكلام."
                    : "Browser does not support speech recognition."
            );
            return;
        }
        try {
            recognitionRef.current.start();
            setListening(true);
            void message.success(
                language === "ar"
                    ? "بدأ الاستماع — احكي جملك بالعربية، مثلاً: قهوة بـ20..."
                    : "Listening started — say something like: coffee for 20..."
            );
        } catch {
            void message.error(
                language === "ar" ? "فشل بدء الاستماع" : "Failed to start listening"
            );
        }
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    return { listening, startListening, stopListening };
}
