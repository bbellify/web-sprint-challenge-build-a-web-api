// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateId,
    validatePayload,
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
    Project.update(req.params.id, req.body)
        .then(update => {
            res.status(201).json(update)
        })
        .catch(next)
})

router.use(errorHandling)

module.exports = router