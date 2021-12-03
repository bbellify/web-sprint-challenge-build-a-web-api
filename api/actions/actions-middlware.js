// add middlewares here related to actions
const Action = require('./actions-model')

async function validateId(req, res, next) {
    Action.get(req.params.id)
        .then(p => {
            if (!p) {
                res.status(404).json({ message: 'nothing found'})
            } else {
                next()
            }
        })
        .catch(next)
}

function validateNewAction(req, res, next) {
    const { notes, description, project_id } = req.body
    
    if (!project_id) {
        res.status(400).json({ message: 'please include a project id'})
    } else {
        Action.get(project_id)
        .then( proj => { //eslint-disable-line no-unused-vars
             if (!description 
                // || description.length() > 128 
                ) {
                res.status(400).json({ message: 'description field required, must be 128 chars or less' })
            } else if (!notes) {
                res.status(400).json({ message: 'notes field required'})
            } else {
                next()
            }
        })
        .catch(err => {
            res.status(404).json({ message: err.message })
        })    
    }
}

// eslint-disable-next-line no-unused-vars
function errorHandling(err, req, res, next) { 
    res.status(err.status || 500).json({
        message: `${err.message}`,
        stack: err.stack
    })
}

module.exports = {
    validateId,
    validateNewAction,
    errorHandling,
}
