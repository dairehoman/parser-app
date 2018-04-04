const
    log =       require('./../util/log')
    gen =       require('./../util/gen')
    token =     require('./../util/token')
    np =        require('./np')
    vp =        require('./vp')
    path =      require('path')

parse = ( args ) => {

    const usrinpt =  token(args)
    const SENTENCE = []
    lxcn =           gen()
    /**
    *   function sentence-1;
    *       begin
    *           NOUN_PHRASE := structure returned by noun_phrase network;
    *           SENTENCE.NOUN_PHRASE := NOUN_PHRASE;  
    *       end.
    */
    if(usrinpt.length < 4) {
        NOUN_PHRASE = np(usrinpt)
        if(typeof(NOUN_PHRASE) === 'string' && NOUN_PHRASE.includes('error')) {
            return 'error: this sequence of words violates the rewrite rules'
        } 
        else {
            SENTENCE['NOUN_PHRASE'] = NOUN_PHRASE
            return ({ SENTENCE })
        }
    }
    
    /**
     *  function sentence-2;
     *      begin
     *          VERB_PHRASE := structure returned by verb_phrase network;    
     *          if SENTENCE.NOUN_PHRASE.NOUN.NUMBER agrees with VERB_PHRASE.VERB.NUMBER     
     *              then 
     *                  begin
     *                      SENTENCE.VERB_PHRASE := VERB_PHRASE;
     *                      return SENTENCE
     *                  end
     *          else 
     *              fail
     *      end.
     */
    else {
        NOUN_PHRASE = np(usrinpt)
        SENTENCE['NOUN_PHRASE'] = NOUN_PHRASE
        VERB_PHRASE = vp(usrinpt)
        if(typeof(VERB_PHRASE) === 'string' && VERB_PHRASE.includes('error')) {
            return 'error: this sequence of words violates the rewrite rules'
        }
        if(
            SENTENCE.NOUN_PHRASE.NOUN.NUMBER.toString() === VERB_PHRASE.VERB.NUMBER.toString()
                &&
            SENTENCE.NOUN_PHRASE.DETERMINER.NUMBER.toString() === SENTENCE.NOUN_PHRASE.NOUN.NUMBER.toString()
        ) {
            SENTENCE['VERB_PHRASE'] = VERB_PHRASE
            return ({ SENTENCE })
        } else {
            return 'error: number agreement is incorrect'
        }
    }
}  
module.exports = parse