const express = require("express"); //express: será el encargado de configurar las funcionalidades básicas del servidor
const app = express();
const morgan = require("morgan");
const cors = require("cors");

//Escribiendo en consola npm run dev activaremos al módulo.

//Settings
app.set("port", process.env.PORT || 8080); //El puerto 8080 lo fijamos como puerto de inicio, nos servirá para hacer las pruebas
app.set("json spaces", 2);

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); //Para poder leer los json que vengan desde Unity
app.use(cors());

//Rutas
app.use(require("./routes/index")); //llamada del módulo recién creado en el archivo inicial, para que funcione la ruta del otro archivo
app.use("/api/MySQL", require("./routes/MySQL"))
// Iniciando el servidor
app.listen(app.get("port"), () => {
  console.log("hola desde el puerto:" + app.get("port")); //Esto hace una peticion get al puerto que hemos marcado con ese mensaje
});
