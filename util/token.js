let token = (arg, type) => {
    switch(type) {
        case 'file':
            return arg.split('\n')
                break    
        default: return arg.split(' ')
    }
}
module.exports = token