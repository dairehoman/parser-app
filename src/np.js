const
    log =       require('./../util/log')
    gen =       require('./../util/gen')
    token =     require('./../util/token')
    lxcn_pth =  './../lexicon.txt'

np = ( args ) =>  {
    
    const NOUN_PHRASE = []
    const lxcn =        gen(lxcn_pth)
    const usrinpt =     args
    /**
     * function noun_phrase-1;
     *   begin
     *       ARTICLE := definition frame for next word of input;
     *       if ARTICLE.PART_OF_SPEECH = article
     *           then
     *               NOUN_PHRASE.DETERMINER := ARTICLE
     *       else 
     *           fail
     *   end.
     */
    ARTICLE = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(ARTICLE == undefined) {
        return 'error: this sequence of words violates the rewrite rules'
    }
    if(ARTICLE.POS === 'DT') {
        NOUN_PHRASE['DETERMINER'] = ARTICLE
        usrinpt.splice(0, 1)
    } 
    else {
        return 'error: this sequence of words violates the rewrite rules'
    }
        
    /**
     * function noun_phrase-2;
     *   begin
     *       WORD := definition frame for next word of input;
     * 
     *       if WORD.PART_OF_SPEECH = noun 
     *              and 
     *          WORD.NUMBER agrees with NOUN_PHRASE.DETERMINER.NUMBER
     *       then
     *           begin
     *               NOUN_PHRASE.NOUN := WORD
     *               NOUN_PHRASE.NUMBER := WORD.NUMBER
     *               return NOUN_PHRASE
     *           end
     * 
     *       else if WORD.PART_OF_SPEECH = adjective
     *              and
     *          WORD.NUMBER agrees with NOUN_PHRASE.DETERMINER.NUMBER 
     *       then
     *          begin
     *              NOUN_PHRASE.ADJECTIVE := WORD
     *              NOUN_PHRASE.NUMBER := WORD.NUMBER
     *              return NOUN_PHRASE
     *          end
     *      else
     *          fail    
     *   end.	
     */
    WORD = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(WORD == undefined) {
        return 'error: this sequence of words violates the rewrite rules'
    }
    if(WORD.POS === 'JJ') {
        NOUN_PHRASE['ADJECTIVE'] = WORD
        NOUN_PHRASE['NUMBER'] = WORD.NUMBER
        usrinpt.splice(0, 1)
    }
    WORD = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
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
        return 'error: this sequence of words violates the rewrite rules'
    }
} 
module.exports = np