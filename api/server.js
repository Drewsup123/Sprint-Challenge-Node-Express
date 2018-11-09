const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

const projectDb = require('../data/helpers/projectModel');
const actionDb = require('../data/helpers/actionModel');

server.use(express.json());
server.use(helmet()); 
server.use(morgan('dev'));

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running' });
});

//   Projects Code
server.get('/api/projects',(req,res)=>{
    projectDb.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json("can not find the projects ",error)
        })
});

//   Actions Code










module.exports=server;