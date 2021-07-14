module.exports = ( app ) => { 
    
    app.get('/login', (req, res) => res.redirect('/').end() );
    app.get('/register', (req, res) => res.redirect('/').end());
    app.get('/home',(req, res) => res.redirect('/').end());
    //app.get('*',(req, res) => res.redirect('/').end())
    
    return { app }
}