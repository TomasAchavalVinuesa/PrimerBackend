import userModel from '../models/user.js';
import bcrypt from 'bcrypt';

class userController{
    constructor(){
    }

    async profile(req, res){
        try{
            if (!req.usernameConectado) {
                return res.status(400).json({ error: 'No se encontró el usuario en la solicitud' });
            }
            
            const data = await userModel.getOne({ username: req.usernameConectado });
            const { _id, email, username, name: { first, last } } = data;
            res.status(200).json({ _id, email, username, name: { first, last } });
        }catch (e){
            res.status(500).send(e);
        }
    }

    async update(req, res) {
        try {
            const { email, username, password, first, last } = req.body;
            const usernameConectado = req.usernameConectado;
    
            const user = await userModel.getOne({ username: usernameConectado });
    
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
    
            const updatedFields = {
                email,
                username,
                name: {
                    first,
                    last
                }
            };
    
            if (password) {
                const claveEncriptada = await bcrypt.hash(password, 10);
                updatedFields.password = claveEncriptada;
            }
    
            const data = await userModel.update(user.id, updatedFields);
    
            res.status(200).json(data);
        } catch (e) {
            console.error(e);
            res.status(500).send(e);
        }
    }

    async getAll(req, res) {
        try {
            const users = await userModel.getAll();
    
            const usersSanitized = users.map(({_id, email, username, name: { first, last } }) => ({
                _id,
                email,
                username,
                name: {
                    first,
                    last
                }
            }));
    
            res.status(200).json(usersSanitized);
        } catch (e) {
            res.status(500).send(e);
        }
    }

    async getOneById(req, res){
        try{
            const {id} = req.params;
            const data = await userModel.getOneById(id);
            const { _id, email, username, name: { first, last } } = data;
            res.status(201).json({ _id, email, username, name: { first, last } });
        }catch (e){
            res.status(500).send(e);
        }
    }

}

export default new userController();