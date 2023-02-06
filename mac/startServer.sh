# ask for api-key and set it as a variable named API_KEY
read -s -p "Enter OpenAIAPIKey: " api_key

# set api_key as an environment variable
export OPENAI_API_KEY=$api_key

node ./index.js