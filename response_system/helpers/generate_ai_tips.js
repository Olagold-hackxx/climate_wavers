const postService = require("../services/post.service")
const aiService = require("../services/ai.service")
const aiConfig = require("../config/ai.config")


module.exports = async function () {
    const body = await aiService.generateEducativeQuote()
    const post = await postService.createTip({userId: aiConfig.id, username: aiConfig.username, body})
}
