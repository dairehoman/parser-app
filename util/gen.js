const
    token =     require('./../util/token')
    load =      require('./../util/load')
    log =       require('./../util/log')

/**
 * @author daire homan - b00029598
 * @module gen
 * @returns a valid lexicon object from the txt file
 */
gen = (  ) => {

    return token(load('././lexicon.txt'), 'file')
        .map(x => token(x))
            .map(x => ({ POS: x[0], ROOT: x[2], NUMBER: x.slice(3) }))

}
module.exports = gen