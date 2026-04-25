const { Router } = require("express");
const router = Router();
const mysql = require("mysql"); 

const db = mysql.createConnection({
  host: "localhost", 
  user: "root",      
  password: "",      
  database: "timerightbdd" 
});

// Conectamos a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error conectando a MySQL:", err);
    return;
  }
  console.log("¡Conectado exitosamente a la base de datos MySQL!");
});


// RUTA GET: Consultar todos los usuarios
router.get("/usuarios", (req, res) => {
  const query = "SELECT * FROM usuarios"; 
  
  db.query(query, (err, resultados) => {
    if (err) {
      console.log("Error en la consulta:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    // Devolvemos los datos sacados de MySQL
    res.json(resultados); 
  });
});

// RUTA POST: Añadir un nuevo usuario a la BBDD
router.post("/registro", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, mensaje: "Faltan datos." });
  }

  // Usamos ? para evitar inyecciones SQL
  const query = "INSERT INTO usuarios (username, password) VALUES (?, ?)";
  
  db.query(query, [username, password], (err, resultado) => {
    if (err) {
      console.log("Error al insertar:", err);
      return res.status(500).json({ success: false, mensaje: "Error al guardar en la BD" });
    }
    
    res.json({ 
      success: true, 
      mensaje: "Usuario guardado en MySQL con éxito.",
      nuevoId: resultado.insertId 
    });
  });
});

// RUTA POST: Inicio de sesión consultando la base de datos real
router.post("/loginReal", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM usuarios WHERE username = ? AND password = ?";
  
  db.query(query, [username, password], (err, resultados) => {
    if (err) {
      return res.status(500).json({ success: false, mensaje: "Error en el servidor" });
    }

    if (resultados.length > 0) {
      // Si encontró al menos un usuario con ese nombre y clave
      res.json({ 
        success: true, 
        mensaje: "Acceso concedido. ¡Bienvenido desde MySQL!" 
      });
    } else {
      // Si no encontró coincidencias
      res.status(401).json({ 
        success: false, 
        mensaje: "Usuario o contraseña incorrectos en la base de datos." 
      });
    }
  });
});

module.exports = router;