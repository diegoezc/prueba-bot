async function mensajeBD (from , body){
  try {
    const { content } = req.body;

    // Crear un nuevo mensaje basado en el modelo de Mongoose
    const message = new Message({ content });

    // Guardar el mensaje en la base de datos
    await message.save();

    res.status(201).json({ message: 'Mensaje guardado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el mensaje' });
  }
}