// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const {
    validateId,
    validateNewAction,
    errorHandling,
} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
        .catch(next)
})

router.get('/:id', validateId, (req, res, next) => {
    Action.get(req.params.id)
        .then(action => {
            res.json(action)
        })
        .catch(next)
})

router.post('/', validateNewAction, (req, res, next) => {
    console.log(req.body)
    
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateId, (req, res, next) => {
    
    // Project.update(req.params.id, req.body)
    //     .then(update => {
    //         res.status(201).json(update)
    //     })
    //     .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    // Project.remove(req.params.id)
    //     .then(res => {
    //         res.status(204)
    //     })
    //     .catch(next)
})

router.get('/:id/actions', validateId, (req, res, next) => {
    // Project.getProjectActions(req.params.id)
    //     .then(list => {
    //         res.json(list)
    //     })
    //     .catch(next)
})

router.use(errorHandling)


module.exports = router