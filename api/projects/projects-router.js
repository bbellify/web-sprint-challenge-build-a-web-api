// Write your "projects" router here!
const express = require('express')
const Project = require('./projects-model')
const {
    validateNewProject,
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

router.get('/:id', (req, res, next) => {
    const { id } = req.params
    Project.get(id)
        .then(p => {
            !p ? res.status(404).json({ message: 'not found'}) : res.json(p)
        })
        .catch(next)
})

router.post('/', validateNewProject, (req, res, next) => {
    Project.insert(req.body)
        .then(project => {
            res.json(project)
        })
        .catch(next)
})

router.use(errorHandling)

module.exports = router