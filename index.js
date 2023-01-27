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
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 100,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
