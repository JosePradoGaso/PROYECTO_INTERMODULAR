const express = require ("express");
const app = express();

app.set("port", process.env.PORT || 8080);

app.listen(app.get("port"), () => {
    console.log("hola desde el puerto:" + app.get("port"));
});

app.get("/", (req, res) => {
    console.log ("Alguien accedió al servidor");
    res.send ("Bienvenido al servidor");
});

app.get("/rutaGet", (req, res) => {
    console.log ("Alguien hizo un get");
    res.send ("Hola desde la ruta get");
});


app.get("/carrito", (req, res) => {
    console.log ("Alguien hizo un get");
    res.send ("Este es tu carrito de compras");
});