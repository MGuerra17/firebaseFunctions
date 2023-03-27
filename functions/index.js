const functions = require("firebase-functions");
const { SpeechClient } = require("@google-cloud/speech");

const client = new SpeechClient({
  keyFilename: "./nth-segment-381123-0b34ca0332de.json",
});

const getText = async (audioData) => {
  const audio = {
    content: audioData,
  };
  const config = {
    encoding: "AMR_WB",
    sampleRateHertz: 16000,
    languageCode: "es-CO",
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  console.log(response);
  return response;
};

exports.getTextFromAudio = functions.https.onRequest((request, response) => {
  if (request.body.secret !== "docapp") return response.send("Unauthorized");

  getText(request.body.data).then((transcriptions) => {
    return response.send(transcriptions);
  });
});
