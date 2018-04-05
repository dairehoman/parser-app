/**
 * @author daire homan - b00029598
 * @module token
 * @arg arg - data to be tokenised
 * @arg type - if its raw data from a file that needs
 *  to be tokenised differently, otherwise
 *  default to normal tokenisation.
 * @returns tokenised data ready for iteration
 */

let token = (arg, type) => {
    switch(type) {
        case 'file':
            return arg.split('\n')
                break    
        default: return arg.split(' ')
    }
}
module.exports = token