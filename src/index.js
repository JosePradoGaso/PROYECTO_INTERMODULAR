const express = require ("express");
const app = express();

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
    console.log("hola desde el puerto:" + app.get("port"));
});

app.get("/rutaGet", (req, res) => {
    console.log ("Hola desde la ruta get")
})