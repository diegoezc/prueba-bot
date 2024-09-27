const messageSchema = require("../controller/assistent.js")

async function getSubscriptionActive(from, body) {
  let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let year = new Date().getFullYear();
  let date = month + "/" + year;

  const thisUser = await messageSchema.find({ user: from });
  const ctxWithDate = {
    user: from,
    message: body,
    response: "Waiting response...",
    date: new Date(),
    dateFormat: new Date().toLocaleDateString("en-GB"),
  };
}

module.exports =  getSubscriptionActive ;