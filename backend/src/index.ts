import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import todosRoutes from './routes/todosRoutes';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuración de variables de entorno
dotenv.config();

// Conexión a la base de datos
connectDB();

const app = express();

// Definir __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar documentación Swagger
const swaggerDocument = yaml.load(path.join(__dirname, '../swagger.yml'));

// Configuración de CORS
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/todos', todosRoutes);

// Documentación de la API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Manejo de errores global
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
