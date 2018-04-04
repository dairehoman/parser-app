const 
    fs = require('fs')
    log = require('./log')

let load = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    }
    catch(err) {
        log('Error loading: '+path, err.stack)
    }
}
module.exports = load