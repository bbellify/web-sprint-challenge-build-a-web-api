// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateId,
    validatePayload,
    errorHandling,
} = require('./projects-middleware')
const { projectToBody } = require('../../data/helpers/mappers')

const router = express.Router()


router.get('/', (req, res, next) => {
    Project.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res) => {
    res.json(req.body.project)

    // alternate code - before validateId middleware inserted
    // const { id } = req.params
    // Project.get(id)
    //     .then(p => {
    //         !p ? res.status(404).json({ message: 'not found'}) : res.json(p)
    //     })
    //     .catch(next)
})

router.post('/', validatePayload, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.put('/:id', validateId, validatePayload, (req, res, next) => {
    const updates = { name: req.body.name, description: req.body.description }
    Project.update(req.params.id, updates)
        .then(update => {
            res.status(201).json(update)
        })
        .catch(err => {
            console.log('here')
            next(err)
        })
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