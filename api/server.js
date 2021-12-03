const express = require('express');
const server = express();
const actionsRouter = require('./actions/actions-router')
const projectsRouter =  require('./projects/projects-router')

server.use(express.json())

server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

server.get('/', (req, res)=> {
    res.send(`
    <h3>Actions and Projects API<h3>
    `)
})

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})


module.exports = server;
