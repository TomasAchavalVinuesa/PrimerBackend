import 'dotenv/config';
import jsonwebtoken from 'jsonwebtoken';

export function generarToken(username){
    return jsonwebtoken.sign({username}, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h'});
}

export function verificarToken(req, res, next){
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if(!token){
        return res.status(401).json({error: 'Token requerido'});
    }

    try{
        const dataToken = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET);
        req.usernameConectado = dataToken.username;
        next();
    }catch (e){
        return res.status(401).json({error: 'Token no válido'});
    }
}