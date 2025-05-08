import userModel from '../models/user.js';
import bcrypt from 'bcrypt';
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
            return res.status(400).json({ error: 'Usuario o Clave no válida'})
        }

        const claveValida = await bcrypt.compare(password, userExiste.password)

        if (!claveValida){
            return res.status(400).json({error: 'Usuario o Clave no válida'});
        }

        const token= generarToken(username);

        return res.status(200).json({msg: 'Usuario autenticado', token });
    }

    async verificarEmail(req, res) {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Email requerido" });
        }
        const emailExiste = await userModel.getOne({ email });
        res.status(200).json({ exists: !!emailExiste });
    }
    
    async verificarUsername(req, res) {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ error: "Username requerido" });
        }
        const userExiste = await userModel.getOne({ username });
        res.status(200).json({ exists: !!userExiste });
    }
}

export default new authController();