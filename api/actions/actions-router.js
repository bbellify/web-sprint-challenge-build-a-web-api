const express = require('express')
const Action = require('./actions-model')
const {
    validateId,
    validateNewAction,
    validateUpdateAction,
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

router.get('/:id', validateId, (req, res) => {
    res.json(req.act)
})

router.post('/', validateNewAction, (req, res, next) => {
    Action.insert(req.body)
        .then(action => {
            res.status(201).json(action)
        })
        .catch(next)
})

router.put('/:id', validateId, validateUpdateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(update => {
            console.log(update)
            res.status(201).json(update)
        })
        .catch(next)
})

router.delete('/:id', validateId, (req, res, next) => {
    Action.remove(req.params.id)
        .then(isDel => {
            if (!isDel) {
                next({ status: 400, message: 'error deleting'})
            } else {
                res.sendStatus(204)
            }
        })
        .catch(next)
})

router.use(errorHandling)


module.exports = router