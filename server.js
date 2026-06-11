const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const { addActivity, loadActivity, deleteActivity, updateActivity } = require('./utils/activity');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/server', (req, res) => {
    addActivity(req.body);
    res.redirect('/');
});

app.delete('/api/activities/:activity', (req, res) => {
    const activity = req.params.activity;
    deleteActivity(activity);
    res.status(200).json({ message: 'Aktivitas berhasil dihapus' });
});

app.put('/api/activities/:activity', (req, res) => {
    const activity = req.params.activity;
    updateActivity(activity);
    res.status(200).json({ message: 'Aktivitas berhasil diperbarui' });
});

app.get('/api/activities', (req, res) => {
    const activities = loadActivity();
    res.json(activities);
});

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
