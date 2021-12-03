// add middlewares here related to actions
const Action = require('./actions-model')

async function validateId(req, res, next) {
    Action.get(req.params.id)
        .then(a => {
            if (!a) {
                res.status(404).json({ message: 'action not found'})
            } else {
                req.act = a
                next()
            }
        })
        .catch(next)
}

function validateNewAction(req, res, next) {
    const { notes, description, project_id } = req.body
    
    if (!project_id) {
        next({ status: 400, message: 'please include project id' }) 
    } else {
        Action.get(project_id)
        .then( proj => { //eslint-disable-line no-unused-vars
             if (!description || description.length > 128 ) {
                next({ status: 400, message: 'description field required, must be 128 chars or less' })
            } else if (!notes) {
                next({ status: 400, message: 'notes field required' })
            } else {
                next()
            }
        })
        .catch(err => {
            next({ status: 404, message: err.message })
        })    
    }
}

function validateUpdateAction(req, res, next) {
    const { notes, description, project_id, completed } = req.body
    if ( !notes || !description || !project_id || typeof completed !== 'boolean' ) {
        next({ status: 400, message: 'required fields missing' })
    } else {
        next()
    }
}

// eslint-disable-next-line no-unused-vars
function errorHandling(err, req, res, next) { 
    res.status(err.status || 400).json({
        message: `${err.message}`,
        stack: err.stack
    })
}

module.exports = {
    validateId,
    validateNewAction,
    validateUpdateAction,
    errorHandling,
}
