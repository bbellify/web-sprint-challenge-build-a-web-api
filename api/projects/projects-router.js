// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateId,
    validateNewPost,
    errorHandling,
} = require('./projects-middleware')

const router = express.Router()


router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    Project.get(req.params.id)
        .then(proj => {
            res.json(proj)
        })
        .catch(next)
})

router.post('/', validateNewPost, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.put('/:id', validateId, (req, res, next) => {
    
    Project.update(req.params.id, req.body)
        .then(update => {
            res.status(201).json(update)
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(res => {
            res.status(204)
        })
        .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(list => {
            res.json(list)
        })
        .catch(next)
})

router.use(errorHandling)

module.exports = router