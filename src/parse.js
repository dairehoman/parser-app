const
    gen =       require('./../util/gen')
    token =     require('./../util/token')
    np =        require('./np')
    vp =        require('./vp')
    err_rule =  'error: this sequence of words violates the rewrite rules'
    err_num =   'error: number agreement is incorrect'

/**
 * @author daire homan - b00029598
 * @module parse
 * @arg args - raw userinput passed from the application
 * @returns a valid SENTENCE object
 */
parse = ( args ) => {

    const usrinpt =  token(args)
    const SENTENCE = []
    const leninpt =    usrinpt.length
    lxcn =           gen()

    /**
    *   function sentence-1;
    *   begin
    *       if the user input has less than 4 words
    *           then
    *               NOUN_PHRASE := structure returned by noun_phrase network;
    * 
    *               if the noun_phrase network returns an error
    *                   then
    *                       fail
    *               else
    *                   SENTENCE.NOUN_PHRASE = NOUN_PHRASE
    *                   RETURN SENTENCE
    *   end
    */
    if(usrinpt.length < 4) {
        NOUN_PHRASE = np(usrinpt)
        if(typeof(NOUN_PHRASE) === 'string' && NOUN_PHRASE.includes('error')) {
            return err_rule
        } 
        else {
            SENTENCE['NOUN_PHRASE'] = NOUN_PHRASE
            if(usrinpt.length !== 0) return err_rule
            return ({ SENTENCE })
        }
    }
    
    /**
     *  function sentence-2;
     *      begin
     *          if the user input has more than 3 words
     *              then
     *                  NOUN_PHRASE := structure returned by noun_phrase network;
     *                  SENTENCE.NOUN_PHRASE = NOUN_PHRASE
     *                  VERB_PHRASE := structure returned by verb_phrase network;
     * 
     *                  if the verb_phrase network returns an error
     *                      then
     *                          fail
     * 
     *                  if SENTENCE.NOUN_PHRASE.NOUN.NUMBER agrees with VERB_PHRASE.VERB.NUMBER
     *                          and
     *                      SENTENCE.NOUN_PHRASE.DETERMINER.NUMBER agrees with SENTENCE.NOUN_PHRASE.NOUN.NUMBER
     *                          then
     *                              SENTENCE.VERB_PHRASE := VERB_PHRASE;
     *                              RETURN SENTENCE
     * 
     *                  else
     *                      fail
     *      end
     */
    if(usrinpt.length > 3) {
        NOUN_PHRASE = np(usrinpt)
        SENTENCE['NOUN_PHRASE'] = NOUN_PHRASE
        VERB_PHRASE = vp(usrinpt)
        if(typeof(VERB_PHRASE) === 'string' && VERB_PHRASE.includes('error')) {
            return err_rule
        }
        if(
            SENTENCE.NOUN_PHRASE.NOUN.NUMBER.toString() === VERB_PHRASE.VERB.NUMBER.toString()
                &&
            SENTENCE.NOUN_PHRASE.DETERMINER.NUMBER.toString() === SENTENCE.NOUN_PHRASE.NOUN.NUMBER.toString()
        ) {
            SENTENCE['VERB_PHRASE'] = VERB_PHRASE
            return ({ SENTENCE })
        } else {
            return err_num
        }
    }
}  
module.exports = parse