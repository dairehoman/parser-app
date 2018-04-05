const
    log =          require('./../util/log')
    gen =          require('./../util/gen')
    token =        require('./../util/token')
    lxcn_pth =     './../lexicon.txt'
    err_rule =     'error: this sequence of words violates the rewrite rules'

/**
 * @module np
 * @arg args - userinput passed from the parser
 * @returns a valid NOUN_PHRASE object
 */
np = ( args ) =>  {
    
    /**
     * init constants
     */
    const NOUN_PHRASE = []
    const lxcn =        gen(lxcn_pth)
    const usrinpt =     args

    /**
     * function noun_phrase-1;
     *   begin
     *       ARTICLE := definition frame for next word of input;
     * 
     *       if ARTICLE doesn't exist in the alphabet
     *          then fail
     * 
     *       if ARTICLE.PART_OF_SPEECH = article
     *           then
     *               NOUN_PHRASE.DETERMINER := ARTICLE
     *               REMOVE the value we just processed
     *       else 
     *           fail
     *   end.
     */
    ARTICLE = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(ARTICLE == undefined) {
        return err_rule
    }
    if(ARTICLE.POS === 'DT') {
        NOUN_PHRASE['DETERMINER'] = ARTICLE
        usrinpt.splice(0, 1)
    } 
    else {
        return err_rule
    }
        
    /**
     * function noun_phrase-2;
     *   begin
     *       WORD := definition frame for next word of input;
     * 
     *       if WORD doesn't exist in the alphabet
     *          then
     *              fail
     * 
     *       if WORD.PART_OF_SPEECH = adjective
     *          then
     *              NOUN_PHRASE.ADJECTIVE := WORD
     *              NOUN_PHRASE.NUMBER := WORD.NUMBER
     *              REMOVE the value we just processed
     * 
     *       WORD := definition frame for next word of input;
     * 
     *       if WORD doesn't exist in the alphabet
     *          then
     *              fail
     * 
     *       if WORD.PART_OF_SPEECH = noun
     *          then
     *              NOUN_PHRASE.NOUN := WORD
     *              NOUN_PHRASE.NUMBER := WORD.NUMBER
     * 
     *              if NOUN_PHRASE.DETERMINER.ROOT == 'the'
     *                  then
     *                     NOUN_PHRASE.DETERMINER.NUMBER = NOUN_PHRASE.NUMBER 
     * 
     *              REMOVE the value we just processed
     *              RETURN NOUN_PHRASE
     *      else
     *          fail    
     *   end.	
     */
    WORD = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(WORD == undefined) {
        return err_rule
    }
    if(WORD.POS === 'JJ') {
        NOUN_PHRASE['ADJECTIVE'] = WORD
        NOUN_PHRASE['NUMBER'] = WORD.NUMBER
        usrinpt.splice(0, 1)
    }
    WORD = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(WORD == undefined) {
        return err_rule
    }
    if(WORD.POS === 'N') {
        NOUN_PHRASE['NOUN'] = WORD
        NOUN_PHRASE['NUMBER'] = WORD.NUMBER
        if(NOUN_PHRASE.DETERMINER.ROOT === 'the') {
            NOUN_PHRASE.DETERMINER.NUMBER = NOUN_PHRASE.NUMBER
        }
        usrinpt.splice(0, 1)
        return NOUN_PHRASE
    } 
    else {
        return err_rule
    }
} 
module.exports = np