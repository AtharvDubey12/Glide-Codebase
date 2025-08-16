import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Folder from '../models/folderModel.js';

export const signup = async (req,res) => {
    const {username, email, password} = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({message: "User already exists, try logging in."});

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });

        const rootFolder = await Folder.create({
            name: 'root',
            owner: newUser._id,
            parent: null
        });

        newUser.rootDir = rootFolder._id;
        await newUser.save();
        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT, {expiresIn: "7d"});
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
    });
        res.status(201).json({
            message: "Signup Successful",
            user: {
                id: newUser._id, username: newUser.username, email: newUser.email, rootDir: newUser.rootDir
            },
            token: token
        });
    } catch(error) {
        res.status(500).json({message: "Signup Failed", error: error.message});
        console.log(error);
    }
}


export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user)
      return res.status(400).json({ message: 'User not found, please sign up.' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    });

    res.status(200).json({
      message: 'Login Successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        rootDir: user.rootDir
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Login Failed', error: error.message });
  }
};