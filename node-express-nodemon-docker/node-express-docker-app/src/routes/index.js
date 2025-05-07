const setRoutes = (app) => {
    // Define your routes here
    app.get('/', (req, res) => {
        res.send('Welcome to the Node.js Express Docker App blalba adsf!');
    });

    app.get('/api', (req, res) => {
        res.json({ message: 'This is the API endpoint.' });
    });

    // Add more routes as needed
};

module.exports = { setRoutes };