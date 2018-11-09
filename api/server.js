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

server.get("/api/projects/:id",(req,res)=>{
    const { id } = req.params;

    projectDb.get(id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(error => {
            res.status(500).json("Unable to get the projects ", error)
        })
});

server.post('/api/projects', async (req, res) => {
    console.log('body : ', req.body);
    try {
        const projectData = req.body;
        const projectId = await projectDb.insert(projectData);
        const project = await projectDb.get(projectId.id);
        res.status(201).json(project);
    } catch (error) {
        let message = 'error creating the project';

        if (error.errno === 19) {
            message = 'please provide the name of the project';
        }

        res.status(500).json({ error: "There was an error while saving the project to the database" });
    }
});

server.delete('/api/projects/:id', (req,res) => {
    const { id } = req.params;

    projectDb.remove(id)
        .then(count => {
            res.status(201).json({message : `${count} project(s) were deleted`, id : `${id}`})
        })
        .catch(error => {
            res.status(500).json({error : `there was an error deleting the project : ${error}`})
        })
})

//   Actions Code










module.exports=server;