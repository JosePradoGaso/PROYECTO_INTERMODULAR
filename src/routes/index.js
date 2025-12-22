const { Router } = require("express");
const router = Router();

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
