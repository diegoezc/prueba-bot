
const request = require("request"),
  express = require("express"),
  body_parser = require("body-parser"),
  dotenv = require("dotenv"),
  axios = require("axios");


const app = express();
app.use(express.json());

let phone_number_id = process.env.PHONE_NUMBER_ID;

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

const mongoose = require("mongoose");

//Conexión a MongoDB
mongoose
  .connect(`mongodb+srv://anmdev32:lCbyb4Uv6br7fFJp@andidev.z14hafq.mongodb.net/bot-videos-whatsapp?retryWrites=true&w=majority`)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar con MongoDB", err));


const getSubscriptionActive = require('./controller/messageSchema.js');

app.post("/webhook", async (req, res) => {

  
  // log incoming messages
  console.log("Incoming webhook message:", JSON.stringify(req.body, null, 2));
  // Obtener cuerpo del Webhook
  let body = req.body;
  // Verificar que entre sólo el webhook del número que se está usando
  if (body.entry[0].id === process.env.WA_BUSINESS_ID) {
  // check if the webhook request contains a message
  // details on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  const message = req.body.entry[0].changes[0].value.messages[0]

  // check if the incoming message contains text
  if (message.type === "text") {
    // extract the business number to send the reply from it
const business_phone_number_id =
  req.body && req.body.entry && req.body.entry[0] &&
  req.body.entry[0].changes && req.body.entry[0].changes[0] &&
  req.body.entry[0].changes[0].value && req.body.entry[0].changes[0].value.metadata &&
  req.body.entry[0].changes[0].value.metadata.phone_number_id;
    console.log('kakakakakaka');


    // send a reply message as per the docs here https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v19.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        to: message.from,
        text: { body: "Echo: " + message.text.body },
        context: {
          message_id: message.id, // shows the message as a reply to the original user message
        },
      },
    });

    // mark incoming message as read
    await axios({
      method: "POST",
      url: `https://graph.facebook.com/v19.0/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${GRAPH_API_TOKEN}`,
      },
      data: {
        messaging_product: "whatsapp",
        status: "read",
        message_id: message.id,
      },
    });
  }
}

  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});

