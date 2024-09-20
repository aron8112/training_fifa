const multer = require('multer');
const path = require('path');

// Configuración de Multer para cargar archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Mantener el nombre original del archivo
  },
});

const fileFilter = (req, file, cb) => {
  // Verificar si la extensión es CSV
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname === '.csv') {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new error('Tipo de archivo no soportado. Solo se permiten archivos CSV.'), false); // Rechazar el archivo
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // Limite de 100 MB
  fileFilter: fileFilter, // Filtrar solo archivos CSV
});
// }).any();

const uploadFile = (req, res, next) => {
  console.log('req.file:', file);
  if (!file) {
    return res.status(400).json({ message: 'Por favor sube un archivo.' });
  } else {
    let checkFile;
    try {
      checkFile = upload.single('csvFile');
      if (upload) {
        return next();
      }
    } catch (error) {
      if (error instanceof multer.MulterError) {
        // errores específicos de Multer (p. ej., límite de tamaño excedido)
        if (error.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ message: 'El archivo es demasiado grande. El límite es 100 MB.' });
          return;
        }
        res.status(400).json({ message: `error de subida: ${error.message}` });
        return;
      } else if (error) {
        // Otros errores (como archivo de tipo incorrecto)
        res.status(400).json({ message: `error: ${error.message}` });
        return;
      }
    }
  }
};

module.exports = upload;
