require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = process.env.PORT || 3080;

app.use(json());
app.use(cors());

app.post("/", handleChatRequest);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

async function handleChatRequest(req, res) {
  const { conversation, apiKey } = req.body;

  const openaiConfig = new Configuration({
    organization: process.env.OPENAI_ORGANIZATION,
    apiKey: apiKey || process.env.OPENAI_API_KEY,
  });

  const openaiInstance = new OpenAIApi(openaiConfig);
  const response = await openaiInstance.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversation,
    temperature: 0.6,
  });

  res.send({
    message: response.data.choices[0].message.content,
    usage: response.data.usage,
  });
}
