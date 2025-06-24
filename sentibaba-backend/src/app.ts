import express from 'express';
import dotenv from 'dotenv';
import sessionRoutes from './routes/session.routes';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/session', sessionRoutes);

app.listen(port,()=>{
    console.log(`Server running on port ${PORT}`);
})