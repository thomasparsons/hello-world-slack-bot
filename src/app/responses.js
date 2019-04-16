const cats = require("./cats")

const service = {}

const rand = (a) => [Math.floor(Math.random() * a.length)]
const toL = (item) => item.toLowerCase()

service.get = (slackReqObj) => {
  const catValue = slackReqObj.actions[0].selected_options[0].value

  const foundCat = toL(catValue) === "random" ? cats[rand(cats)] :
    cats.find((c) => toL(c.name) === toL(catValue))

  const slackErrorResponse = {
    channel: slackReqObj.channel_id,
    response_type: "ephemeral",
    text: `there is no cat called ${catValue}`
  }

  if (!foundCat) {
    return Promise.resolve(slackErrorResponse)
  }

  const {images, name} = foundCat

  const slackResponse = {
    attachments: [{
      image_url: images[rand(images)],
      text: `hello from ${name}`
    }],
    channel: slackReqObj.channel_id,
    response_type: "in_channel"
  }

  return Promise.resolve(slackResponse)
}

service.getCats = (slackReqObj) => {
  const options = [{text: "random", value: "random"}]
  cats.map((c) => options.push({text: c.name, value: c.name}))

  const slackResponse = {
    attachments: [{
      fallback: "If you could read this message, you'd be choosing something a cat right now.",
      attachment_type: "default",
      callback_id: "cat_selection",
      actions: [
        {
          name: "cats_list",
          text: "Pick a cat...",
          type: "select",
          options
        }
      ]
    }],
    channel: slackReqObj.channel_id,
    response_type: "in_channel"
  }

  return Promise.resolve(slackResponse)
}

module.exports = service
