require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const configuration = new Configuration({
  organization: "org-BoqpqXXbMfa3FW97EToE2H0z",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

// send conversation to bot
app.post("/", async (req, res) => {
  const { conversation } = req.body;
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: conversation,
    temperature: 0.6,
  });
  res.send({
    message: response.data.choices[0].message.content,
    usage: response.data.usage,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
