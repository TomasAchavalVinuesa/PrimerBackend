import 'dotenv/config';
import express from 'express';
import routesProject from './routes/project.js';
import routesEpic from './routes/epic.js';
import routesStory from './routes/story.js';
import routesTask from './routes/task.js';
import routesUser from './routes/user.js';
import bodyParser from 'body-parser';
import dbClient from './config/dbClient.js';
import routesAuth from './routes/auth.js';
import cors from 'cors';
const app = express();

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"], 
    allowedHeaders: ["*"], 
    credentials: true 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/project', routesProject);
app.use('/epic', routesEpic);
app.use('/story', routesStory);
app.use('/task', routesTask);
app.use('/user', routesUser);
app.use('/auth', routesAuth);

try{
    const PORT = process.env.PORT || 4000;
    app.listen(PORT,()=> console.log('servidor activo en puerto ' + PORT));
}catch(e){
    console.log(e);
}

process.on('SIGINT', async ()=>{
    dbClient.cerrarConexion();
    process.exit(0);
})