async function getSubscriptionActive(from, body) {
  let month = ("0" + (new Date().getMonth() + 1)).slice(-2);
  let year = new Date().getFullYear();
  let date = month + "/" + year;

  const thisUser = await subscription.find({ user: from });
  const ctxWithDate = {
    user: from,
    message: body,
    response: "Waiting response...",
    date: new Date(),
    dateFormat: new Date().toLocaleDateString("en-GB"),
  };
  //console.log("ctxWithDate: ", ctxWithDate);
  try {
    //console.log("thisUSER: ", thisUser);
    if (typeof thisUser[0] != "undefined" && typeof thisUser[0] != "") {
      const newRegistro = new histories(ctxWithDate);
      await newRegistro.save();
    } else {
      //console.log("creando hilo");
      const hilo = await createhilo();
      //console.log("hilo del usuario: ", hilo);
      const hiloSave = new subscription({ user: from, hilo: hilo });
      await hiloSave.save();

      const newRegistro = new histories(ctxWithDate);
      await newRegistro.save();
    }
    return true;
  } catch (error) {
    console.log("Error al guardar pregunta en BD", error);
    return false;
  }
}

module.exports =  sendMessage ;