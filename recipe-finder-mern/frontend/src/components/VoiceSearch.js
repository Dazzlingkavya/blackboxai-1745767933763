import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function VoiceSearch() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert('Your browser does not support speech recognition.');
    }
  }, [browserSupportsSpeechRecognition]);

  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Voice Search</h2>
      <div className="mb-4">
        <button
          onClick={startListening}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700 transition"
        >
          Start Listening
        </button>
        <button
          onClick={stopListening}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Stop Listening
        </button>
        <button
          onClick={resetTranscript}
          className="bg-gray-600 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700 transition"
        >
          Reset
        </button>
      </div>
      <p className="border p-2 rounded min-h-[50px]">{transcript}</p>
    </div>
  );
}

export default VoiceSearch;
