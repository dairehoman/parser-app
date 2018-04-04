const
    express =   require('express')
    exphbs  =   require('express-handlebars');
    app =       express()
    bdyprsr =   require('body-parser')
    log =       require('./util/log')
    parse =     require('./src/parse')
    port =      3000

app.use(bdyprsr.urlencoded({ extended: true }))
app.use(bdyprsr.json())
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/', (req, res) => res.render('index'))
app.post('/parse/:input', (req, res) => {

    let results = parse(req.body.input.toLowerCase().replace('.',''))
    let original = req.body.input

    if(typeof(results) === 'string' && results.includes('error')) {
        res.render('error', {
            original: original,
            error:results
        })
    }

    else {
        let np = results.SENTENCE.NOUN_PHRASE
        let np_dt = np.DETERMINER
        let np_jj = np.ADJECTIVE
        let np_n = np.NOUN
        let vp = results.SENTENCE.VERB_PHRASE
        if(vp !== undefined) {
            let vp_v = vp.VERB
            let vp_np = vp.OBJECT
            let vp_np_dt = vp_np.DETERMINER
            let vp_np_jj = vp_np.ADJECTIVE
            let vp_np_n = vp_np.NOUN
            res.render('results', {
                original:original,
                np: np,
                np_dt: np_dt,
                np_jj:np_jj,
                np_n: np_n,
                vp:vp,
                vp_v:vp_v,
                vp_np:vp_np,
                vp_np_dt:vp_np_dt,
                vp_np_jj:vp_np_jj,
                vp_np_n:vp_np_n
            })
        } else {
            res.render('results', {
                original:original,
                np: np,
                np_dt: np_dt,
                np_jj:np_jj,
                np_n: np_n,
            
            }) 
        }
    }
})
app.listen(port, () => log('app listening on port 3000'))