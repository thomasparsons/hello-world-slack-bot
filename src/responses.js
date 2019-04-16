const service = {}

service.genericResponse = (slackReqObj) => {
  const slackResponse = {
    attachments: [{
      color: "#000000",
      text: "hello world!"
    }],
    channel: slackReqObj.channel_id,
    response_type: "in_channel"
  }

  return Promise.resolve(slackResponse)
}

module.exports = service
