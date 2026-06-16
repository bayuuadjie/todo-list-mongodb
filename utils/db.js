const mongoose = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.uri)
    .then(() => console.log('Berhasil terhubung ke mongodb'))
    .catch((error) => console.error('Gagal terhubung ke mongodb' + error));

