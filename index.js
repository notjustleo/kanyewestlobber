const { twitterClient, twitterBearer } = require("./client.js")

async function s() {
    let tweets = await twitterBearer.v2.getStream("tweets/sample/stream")

    const rules = await twitterClient.v2.streamRules()
    console.log(rules)
}

s()