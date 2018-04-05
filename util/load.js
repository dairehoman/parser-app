const 
    fs = require('fs')
    log = require('./log')

/**
 * @author daire homan - b00029598
 * @module load
 * @arg path - path of the file to read from the file system
 * @returns raw data from whatever file is loaded
 */
let load = (path) => {
    try {
        return fs.readFileSync(path, 'utf8')
    }
    catch(err) {
        log('Error loading: '+path, err.stack)
    }
}
module.exports = load