import React from "react";
import { Card, Typography } from "antd";
import { useVoiceRecognitionLive } from "../../hooks/useVoiceRecognitionLive";

const { Paragraph } = Typography;

export default function VoiceInputDisplay({ addItems }) {
    const { listening, liveTranscript, startListening, stopListening, contextHolder } =
        useVoiceRecognitionLive(addItems);

    return (
        <div>
            {contextHolder}

            <Card title="Voice Input">
                <Paragraph>
                    <strong>Live Transcript:</strong>
                </Paragraph>
                <Paragraph
                    style={{
                        minHeight: 50,
                        padding: 10,
                        backgroundColor: "#f5f5f5",
                        borderRadius: 5,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {liveTranscript || (listening ? "Listening..." : "Press start...")}
                </Paragraph>

                <button onClick={listening ? stopListening : startListening}>
                    {listening ? "Stop" : "Start"}
                </button>
            </Card>
        </div>
    );
}
