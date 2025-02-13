import mongoose from 'mongoose';

class dbClient{
    constructor(){
        this.conectarBaseDeDatos();
    }

    async conectarBaseDeDatos(){
        if (!process.env.USER_DB || !process.env.PASS_DB || !process.env.SERVER_DB) {
            throw new Error("Variables de entorno para la base de datos no definidas.");
        }
        const queryString = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/WebFinal?retryWrites=true&w=majority`;
        try {
            await mongoose.connect(queryString);
            console.log("Conexión a la base de datos exitosa");
        } catch (error) {
            console.error("Error al conectar la base de datos:", error);
        }
    }

    async cerrarConexion(){
        try{
            await mongoose.disconnect();
            console.log("Conexion a base de datos cerrada");
        }catch (e){
            console.error("Error al cerrar la conexión: ", e);
        }
    }
    
}

export default new dbClient();