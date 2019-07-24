'use strict';
const {Docker} = require('node-docker-api');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const fileUpload = require('express-fileupload');
const express = require('express')
const path = require('path');
const app = express()
const port = 3000

app.use(fileUpload());

app.get('/certs', (req,res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.post('/restart', (req, res) => {
    res.send('Hello World!')
    docker.container.list()
    .then(containers => containers.map(container => container.data.Names[0] === "/proxio_dockerListener_1" ? container.restart() : console.log("No Such container found")))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))