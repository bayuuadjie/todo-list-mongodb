const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
require('dotenv').config();
require('./utils/db');
const Activity = require('./model/activity')

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/activities', async (req, res) => {
    try{
        await Activity.insertOne(req.body);
        res.status(200).json({message: 'Aktivitas berhasil ditambahkan'});
    } catch (error) {
        console.error('Gagal memperbarui aktivitas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

app.delete('/api/activities/:id', async (req, res) => {
    try {
        const activityId = req.params.id;
        await Activity.deleteOne({_id: activityId});
        res.status(200).json({ message: 'Aktivitas berhasil dihapus' });
    } catch (error) {
        console.error('Gagal memperbarui aktivitas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

app.put('/api/activities/:id', async (req, res) => {
    try{
        const activity = await Activity.findById(req.params.id);

        if (activity.status == true){
            activity.status = false;
        }else {
            activity.status = true;
        }

        await activity.save();

        res.status(200).json({ message: 'Aktivitas berhasil diperbarui' });
    } catch (error) {
        console.error('Gagal memperbarui aktivitas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

app.get('/api/activities', async (req, res) => {
    try {
        const activities = await Activity.find()
        res.json(activities);
    } catch (error) {
        console.error('Gagal memperbarui aktivitas:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
