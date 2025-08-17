import express from 'express';
const route = express.Router();

route.get('/api/health', (req, res) => {
    return res.status(200).send('OK');
})

export default route;