const messageSchema = require("./schema/messageSchema.js")

// Función para guardar el mensaje
const saveMessage = async (content) => {
  try {
    // Crear un nuevo mensaje basado en el esquema de Mongoose
    const message = new messageSchema({ content });

    // Guardar el mensaje en la base de datos
    await message.save();

    // Retornar un objeto indicando éxito
    return { success: true, message: 'Mensaje guardado exitosamente' };
  } catch (error) {
    // Si hay un error, lo capturamos y devolvemos un objeto con error
    console.error('Error al guardar el mensaje:', error);
    return { success: false, error: 'Error al guardar el mensaje' };
  }
};

module.exports = { saveMessage };