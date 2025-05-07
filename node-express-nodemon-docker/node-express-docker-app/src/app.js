const express = require('express');
const { setRoutes } = require('./routes/index');

const app = express();

// Set up routes
setRoutes(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});