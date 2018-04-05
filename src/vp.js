const
    gen =       require('./../util/gen')
    np =        require('./np')
    err_rule =     'error: this sequence of words violates the rewrite rules'
    lxcn_pth =  '../lexicon.txt'

/**
 * @module vp
 * @arg args - userinput passed from the parser
 * @returns a valid VERB_PHRASE object
 */
vp = ( args ) =>  {
    
    const VERB_PHRASE = []
    const lxcn =        gen(lxcn_pth)
    const usrinpt =     args

    /**
     *  function verb_phrase-1;
     *  begin
     *      VERB := definition frame for next word of input;
     * 
     *      if VERB doesn't exist in the alphabet
     *          then
     *              fail
     *   
     *       if VERB.PART_OF_SPEECH = verb
     *          then
     *              VERB_PHRASE.VERB := VERB
     *              VERB_PHRASE.NUMBER := VERB.NUMBER
     *              REMOVE the value we just processed
     *       else
     *          fail
     *   end.
     */
    VERB = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(VERB == undefined) {
        return err_rule
    }
    if(VERB.POS === 'V') {
        VERB_PHRASE['VERB'] = VERB
        VERB_PHRASE['NUMBER'] = VERB.NUMBER
        usrinpt.splice(0, 1)
    }
    else {
        return err_rule
    }
    
    /**
     * function verb_phrase-2;
     *   begin
     *       NOUN_PHRASE := structure returned by noun_phrase network;
     *       VERB.PHRASE.OBJECT := NOUN_PHRASE;
     *       if the noun_phrase network returns an error
     *          then
     *              fail
     *       else 
     *          RETURN VERB_PHRASE
     *   end
     */
    NOUN_PHRASE = np(usrinpt)
    VERB_PHRASE['OBJECT'] = NOUN_PHRASE
    if(typeof(VERB_PHRASE.OBJECT) === 'string' && VERB_PHRASE.OBJECT.includes('error')) {
        return err_rule
    }
    else {
        return VERB_PHRASE
    }
} 
module.exports = vp