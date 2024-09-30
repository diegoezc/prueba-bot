const schema = require("../schema/messageSchema.js")
const dotenv = require("dotenv")
dotenv.config()
const {WHATSAPP_WEBHOOK,GRAPH_API_TOKEN}= process.env

const axios = require("axios");
// Función para guardar el mensaje
const saveMessage = async (content,payload) => {
  try {
    // Crear un nuevo mensaje basado en el esquema de Mongoose
    const message = new schema.model({ content: content });

    // Guardar el mensaje en la base de datos
    await message.save();
      console.log("el contenido es: ", content)
    await whatsappSendMessage(payload)
    // Retornar un objeto indicando éxito
    return { success: true, message: 'hola si se guardo' };
  } catch (error) {
    // Si hay un error, lo capturamos y devolvemos un objeto con error
    console.error('Error al guardar el mensaje:', error);
    return { success: false, error: 'Error al guardar el mensaje' };
  }
  

};


const whatsappSendMessage= async (payload)=>{
  await axios({
    method: "POST",
    url: `${WHATSAPP_WEBHOOK}/v19.0/110704455444239/messages`,
    headers: {
      Authorization: `Bearer ${GRAPH_API_TOKEN}`,
    },
    data: payload,
  });
}

const processData = async (webhookData) => {
  try {
    // Extraer los datos del mensaje desde el objeto de datos recibido
    const messageContent = webhookData.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.text?.body;
    const senderId = webhookData.entry?.[0]?.changes?.[0]?.value?.messages?.[0]?.from;

    // Validar que ambos campos existan
    if (!messageContent || !senderId) {
      return { status: 400, json: { error: 'Faltan datos del mensaje (contenido o remitente)' } };
    }

    // Preparar los datos del mensaje para enviarlos a la base de datos
    const messageData = {
      content: messageContent,
      senderId: senderId
    };

    // Llamar a la función para guardar el mensaje en la base de datos
    const result = await saveMessage(messageData);

    // Responder en función del resultado
    if (result.success) {
      return { status: 201, json: { message: result.message } };
    } else {
      return { status: 500, json: { error: result.error } };
    }
  } catch (error) {
    // Manejo de errores inesperados
    console.error('Error procesando los datos del webhook:', error);
    return { status: 500, json: { error: 'Error interno del servidor' } };
  }
};


module.exports = { saveMessage, processData };