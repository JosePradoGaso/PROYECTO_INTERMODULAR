const { Router } = require("express");
const router = Router();

/*Aquí tenemos las rutas get, que cuando el usuario llega a ellas, le devuelven información, cuando escribimos
http://127.0.0.1:8080/"nombre de la ruta" en el navegador llegamos a ellas.*/

/*Este archivo "index.js" se crea en una carpeta “routes” con otro archivo index.js 
donde escribir todas las rutas independientes del archivo de inicio del programa, para tenerlo todo más compacto y ordenado*/

router.get("/home", (req, res) => {
  console.log("Alguien accedió al servidor");
  res.send("Bienvenido a TimeRight");
});

router.get("/horarios", (req, res) => {
  console.log("Alguien entro a ver sus horarios");
  res.send("Sus horarios son los siguientes");
});

router.get("/calcularHoras", (req, res) => {
  console.log("Alguien entro a calcular sus horas");
  res.send("Calculo de horas realizado");
});

router.get("/nominas", (req, res) => {
  console.log("Alguien entro a ver sus nóminas");
  res.send("Aquí están sus nóminas");
});

router.get("/ajustes", (req, res) => {
  console.log("Alguien entro a ajustes");
  res.send("Aquí puede ajustar sus preferencias");
});

module.exports = router;

