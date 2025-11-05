import { useEffect, useCallback, useState, useRef } from "react";
import { message } from "antd";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import {parseClauseForExpense, splitClauses} from "../helpers/parser";
import { useLanguage } from "../context/LanguageContext";

/**
 * Hook: useVoiceRecognitionLive
 * Handles voice recognition, parsing expenses, and live transcript display
 * Uses t() for localization
 */
export function useVoiceRecognitionLive(onExpensesDetected) {
    const { language, t } = useLanguage();
    const [messageApi, contextHolder] = message.useMessage();
    const [liveTranscript, setLiveTranscript] = useState("");
    const prevLanguageRef = useRef(language);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
    } = useSpeechRecognition();

    const handleTranscript = useCallback(
        (text) => {
            const cleaned = text.replace(/\s+/g, " ").trim();

            const clauses = splitClauses(cleaned, language);
            const newItems = clauses
                .map(clause => parseClauseForExpense(clause, language))
                .filter(Boolean);

            if (!newItems.length) {
                messageApi.info(t("noExpensesDetected"));
                return;
            }

            onExpensesDetected(newItems);
            messageApi.success(t("itemsAdded").replace("{count}", newItems.length));
            resetTranscript();
        },
        [language, onExpensesDetected, messageApi, resetTranscript, t]
    );

    useEffect(() => setLiveTranscript(transcript), [transcript]);

    useEffect(() => {
        if (!listening && transcript.trim()) {
            handleTranscript(transcript);
        }
    }, [listening, transcript, handleTranscript]);

    const clearLiveTranscript = () => {
        setLiveTranscript("");
        resetTranscript();
        messageApi.info(t("LiveTranscriptCleared"));
    };

    const startListening = () => {
        if (!browserSupportsSpeechRecognition) {
            messageApi.warning(t("browserNotSupported"));
            return;
        }

        try {
            SpeechRecognition.startListening({
                language: language === "ar" ? "ar-EG" : "en-US",
                continuous: true,
            });
            messageApi.success(t("listeningStarted"));
        } catch (err) {
            messageApi.error(t("failedStartListening"));
        }
    };

    const stopListening = () => {
        SpeechRecognition.stopListening();
        messageApi.info(t("listeningStopped"));
    };

    useEffect(() => {
        if (listening && prevLanguageRef.current !== language) {
            SpeechRecognition.stopListening();
            SpeechRecognition.startListening({
                language: language === "ar" ? "ar-EG" : "en-US",
                continuous: true,
            });
            prevLanguageRef.current = language;
        }
    }, [language, listening]);

    return {
        listening,
        liveTranscript,
        startListening,
        stopListening,
        clearLiveTranscript,
        contextHolder,
    };
}

