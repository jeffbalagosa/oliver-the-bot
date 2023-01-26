const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const configuration = new Configuration({
  organization: "org-BoqpqXXbMfa3FW97EToE2H0z",
  // TODO: Set up environment variables for the API key
  // apiKey: process.env.OPENAI_API_KEY,
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

// create a simple express api that calls the function above
const app = express();
const port = 3000;

app.post("/", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Say this is a test",
    max_tokens: 7,
    temperature: 0,
  });
  console.log(response.data.choices[0].text);
  res.json({ data: response.data });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
