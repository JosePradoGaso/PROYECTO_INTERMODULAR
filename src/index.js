const express = require("express"); //express: será el encargado de configurar las funcionalidades básicas del servidor
const app = express();
const morgan = require("morgan");

//Escribiendo en consola npm run dev activaremos al módulo.

//Settings
app.set("port", process.env.PORT || 8080); //El puerto 8080 lo fijamos como puerto de inicio, nos servirá para hacer las pruebas

//Middleware
app.use(morgan("dev"));

app.use(express.json()); //Para poder leer los json que vengan desde Unity

//Rutas
app.use(require("./routes/index")); //llamada del módulo recién creado en el archivo inicial, para que funcione la ruta del otro archivo

// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log("hola desde el puerto:" + app.get("port")); //Esto hace una peticion get al puerto que hemos marcado con ese mensaje
});
