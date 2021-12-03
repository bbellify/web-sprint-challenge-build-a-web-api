// add middlewares here related to projects
const Project = require('./projects-model')

async function validateId(req, res, next) {
    Project.get(req.params.id)
        .then(p => {
            if (!p) {
                next({ status: 404, message: 'nothing found' })
            } else {
                next()
            }
        })
        .catch(next)
}

function validateNewPost(req, res, next) {
    const { name, description } = req.body
    if (!name || !description ) {
        next({ status: 400, message: 'name and description are required' })
    } else {
        next()
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
    validateNewPost,
    errorHandling,
}