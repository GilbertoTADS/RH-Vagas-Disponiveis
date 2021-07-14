module.exports = ( app ) => {
    const port = 3003;
    app.listen(port);

    return { app }
}