const postService = require("../services/post.service")
const aiService = require("../services/ai.service")
const aiConfig = require("../config/ai.config")
const { sendToQueue } = require("../lib/amqp")
const queues = require("../constants/queues")


module.exports = async function () {
    const body = await aiService.generateEducativeQuote()
    const post = await postService.createTip({userId: aiConfig.id, username: aiConfig.username, body})
    const target = await postService.getById(post.id)
    sendToQueue(queues.backend_post, {...target, waver_id: target.userId, content: target.body,})
}
