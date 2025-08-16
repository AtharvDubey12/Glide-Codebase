import {signup,login} from '../controllers/auth.js'
import express from 'express';
const authRoutes = express.Router();
authRoutes.post('/login', login);
authRoutes.post('/signup', signup);

export default authRoutes;
