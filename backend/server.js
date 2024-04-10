const express = require('express');
const app = express();
app.use(express.json()); 
require('dotenv').config();
const connectDatabase = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userDataRoutes = require('./routes/userdataRoutes');
const sendCrypto = require('./controllers/faucet/sendCryptoFunction');
const userRoutes = require('./routes/userRoutes');
const userInfoRoutes = require('./routes/userInfoRoutes');
const qrCodeRoutes = require('./routes/qrCodeRoutes');
const cors = require('cors');

app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

connectDatabase()
app.use('/api/auth', authRoutes);
app.use('/api/user', userDataRoutes);
// app.post('/api/sendCBC', sendCrypto);
app.use('/api', userRoutes);
app.use('/api/info', userInfoRoutes);
app.use('/api/qrcode', qrCodeRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});