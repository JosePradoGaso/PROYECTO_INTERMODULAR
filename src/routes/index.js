const { Router } = require("express");
const router = Router();

/*Aquí tenemos las rutas get, que cuando el usuario llega a ellas, le devuelven información, cuando escribimos
http://127.0.0.1:8080/"nombre de la ruta" en el navegador llegamos a ellas.*/

/*Este archivo "index.js" se crea en una carpeta “routes” con otro archivo index.js 
donde escribir todas las rutas independientes del archivo de inicio del programa, para tenerlo todo más compacto y ordenado*/

const usuariosDB = [
  { username: "admin", password: "123" },
  { username: "jugador1", password: "password456" },
  { username: "jugador2", password: "password789" },
  { username: "jugador3", password: "password012" },
  { username: "jugador4", password: "password345" },
];
//RUTAS GET
router.get("/home", (req, res) => {
  console.log("Alguien accedió al servidor");
  res.json({ mensaje: "Bienvenido a TimeRight" });
});

router.get("/horarios", (req, res) => {
  console.log("Alguien entro a ver sus horarios");
  res.json({ mensaje: "Sus horarios son los siguientes" });
});

router.get("/calcularHoras", (req, res) => {
  console.log("Alguien entro a calcular sus horas");
  res.json({ mensaje: "Calculo de horas realizado" });
});

router.get("/nominas", (req, res) => {
  console.log("Alguien entro a ver sus nóminas");
  res.json({ mensaje: "Aquí están sus nóminas" });
});

router.get("/ajustes", (req, res) => {
  console.log("Alguien entro a ajustes");
  res.json({ mensaje: "Aquí puede ajustar sus preferencias" });
});

// 1. SISTEMA DE LOGIN (POST)
router.post("/inicioSesion", (req, res) => {
  console.log("Petición de Login recibida");
  const { username, password } = req.body; // Leemos los datos que envía Unity

  const usuarioEncontrado = usuariosDB.find((u) => u.username === username);

  if (!usuarioEncontrado) {
    return res
      .status(401)
      .json({
        success: false,
        mensaje: "El nombre de usuario no es correcto.",
      });
  }

  if (usuarioEncontrado.password !== password) {
    return res
      .status(401)
      .json({ success: false, mensaje: "La contraseña no es correcta." });
  }

  return res.json({ success: true, mensaje: "Acceso concedido. ¡Bienvenido!" });
});

//SISTEMA DE REGISTRO (POST)
router.post("/registro", (req, res) => {
  console.log("Petición de Registro recibida");
  const { username, password } = req.body;

  // Comprobamos si el usuario ya existe en nuestra base de datos simulada
  const existeUsuario = usuariosDB.find((u) => u.username === username);

  if (existeUsuario) {
    return res
      .status(400)
      .json({
        success: false,
        mensaje: "Ese nombre de usuario ya está en uso.",
      });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ success: false, mensaje: "Debes rellenar todos los campos." });
  }

  // Si no existe, lo añadimos a la lista
  usuariosDB.push({ username: username, password: password });

  console.log("Nuevo usuario registrado:", username);
  return res.json({
    success: true,
    mensaje: "Usuario registrado con éxito. Ya puedes iniciar sesión.",
  });
});

// 2. DATOS NÓMINA (POST)
router.post("/datosNomina", (req, res) => {
  console.log("Enviada una peticion POST a /datosNomina");
  console.log("Datos recibidos desde Unity:", req.body); // Mostramos lo que envía Unity, sin sobreescribirlo
  res.json({
    Title: "Datos de Nómina",
  });
});

// 3. DATOS HORARIOS (POST)
router.post("/datosHorarios", (req, res) => {
  console.log("Enviada una peticion POST a /datosHorarios");
  console.log("Datos recibidos desde Unity:", req.body);
  res.json({
    Title: "Datos de Horarios",
  });
});

// 4. DATOS SALARIO (POST)
router.post("/datosSalario", (req, res) => {
  console.log("Enviada una peticion POST a /datosSalario");
  console.log("Datos recibidos desde Unity:", req.body);
  res.json({
    Title: "Datos de Salario",
  });
});

// 5. DATOS PREFERENCIAS (POST)
router.post("/datosPreferencias", (req, res) => {
  console.log("Enviada una peticion POST a /datosPreferencias");
  console.log("Datos recibidos desde Unity:", req.body);
  res.json({
    Title: "Preferencias",
  });
});

// 6. RECUPERACIÓN / EDICIÓN DE CONTRASEÑA (POST)
router.post("/editarPassword", (req, res) => {
  console.log("Petición para editar contraseña");
  const { username, oldPassword, newPassword } = req.body;
  const usuarioEncontrado = usuariosDB.find((u) => u.username === username);

  if (usuarioEncontrado && usuarioEncontrado.password === oldPassword) {
    usuarioEncontrado.password = newPassword;
    return res.json({
      success: true,
      mensaje: "Contraseña actualizada correctamente.",
    });
  }

  return res
    .status(401)
    .json({ success: false, mensaje: "Credenciales incorrectas." });
});

module.exports = router;
