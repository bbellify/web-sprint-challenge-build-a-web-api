// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateId,
    validateNewPost,
    validateUpdateProject,
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
    res.json(req.proj)
})

router.post('/', validateNewPost, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.put('/:id', validateId, validateUpdateProject, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(update => {
            res.status(201).json(update)
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Project.remove(req.params.id)
        .then(isDel => { //eslint-disable-line
            if (!isDel) {
                next({ error: 400, message: 'error deleting'})
            } else {
                res.sendStatus(204)
            }
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