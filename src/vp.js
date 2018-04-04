const
    log =       require('./../util/log')
    gen =       require('./../util/gen')
    token =     require('./../util/token')
    np =        require('./np')
    grmr_pth =  '../grammar.txt'
    lxcn_pth =  '../lexicon.txt'

vp = ( args ) =>  {
    
    const VERB_PHRASE = []
    const lxcn =        gen(lxcn_pth)
    const usrinpt =     args
    /**
     * function verb_phrase-1;
     *   begin
     *       VERB := definition frame for next word of input;
     *       if VERB.PART_OF_SPEECH = verb
     *       then
     *           begin
     *               VERB_PHRASE.VERB := VERB;
     *               VERB_PHRASE.NUMBER := VERB.NUMBER
     *           end;
     *       end.
     */
    VERB = lxcn.filter(x => x.ROOT === usrinpt[0])[0]
    if(VERB == undefined) {
        return 'error: this sequence of words violates the rewrite rules'
    }
    if(VERB.POS === 'V') {
        VERB_PHRASE['VERB'] = VERB
        VERB_PHRASE['NUMBER'] = VERB.NUMBER
        usrinpt.splice(0, 1)
    }
    else {
        return 'error: this sequence of words violates the rewrite rules'
    }
    
    /**
     * function verb_phrase-2;
     *   begin
     *       NOUN_PHRASE := structure returned by noun_phrase network;
     *       VERB.PHRASE.OBJECT := NOUN_PHRASE;
     *       return VERB_PHRASE
     *   end
     */
    NOUN_PHRASE = np(usrinpt)
    VERB_PHRASE['OBJECT'] = NOUN_PHRASE
    if(typeof(VERB_PHRASE.OBJECT) === 'string' && VERB_PHRASE.OBJECT.includes('error')) {
        return 'error: this sequence of words violates the rewrite rules'
    }
    return VERB_PHRASE
} 
module.exports = vp