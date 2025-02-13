import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { generarToken } from '../helpers/autenticacion.js';

//const blacklist = new Set(); para implementar luego

class authController{
    constructor(){
    }
    
    async register(req, res){
        try{
            const{email, username, password, first, last} = req.body;
            const userExiste = await userModel.getOne({ username });
            if(userExiste){
                return res.status(400).json({ error: 'El usuario ya existe'})
            }
            const claveEncriptada = await bcrypt.hash(password, 10);

            const data = await userModel.create({
                email,
                username, 
                password: claveEncriptada, 
                name: {
                    first, 
                    last
                }
            });
            res.status(201).json(data);
        }catch(e){
            console.log(e);
            res.status(500).send(e)
        }
    }

    async login(req,res){
        const {username, password} = req.body
        const userExiste = await userModel.getOne({ username });
        if(!userExiste){
            return res.status(400).json({ error: 'Usuario no encontrado'})
        }

        const claveValida = await bcrypt.compare(password, userExiste.password)

        if (!claveValida){
            return res.status(400).json({error: 'Clave no válida'});
        }

        const token= generarToken(username);

        return res.status(200).json({msg: 'Usuario autenticado', token });
    }

    /* async logout(req, res) {
        try {
            const token = req.header("Authorization")?.split(" ")[1];

            if (!token) {
                return res.status(400).json({ error: "No hay token en la petición" });
            }

            blacklist.add(token); // Agregar token a la lista

            return res.status(200).json({ msg: "Sesion cerrada correctamente" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error en el servidor" });
        }
    } */
}

export default new authController();