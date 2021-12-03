// add middlewares here related to projects


function validateNewProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description ) {
        res.status(400).json({ message: 'name and description are required'})
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
    validateNewProject,
    errorHandling,
    
}