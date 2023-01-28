const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
// add body parser cors to express
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = new Configuration({
  organization: "org-BoqpqXXbMfa3FW97EToE2H0z",
  // TODO: Set up environment variables for the API key
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post("/", async (req, res) => {
  const { message, currentModel } = req.body;
  console.log(message, "message");
  console.log(currentModel, "currentModel");
  const response = await openai.createCompletion({
    model: `${currentModel}`, //"text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get("/models", async (req, res) => {
  const response = await openai.listEngines();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
