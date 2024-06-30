const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes'); 
const itemRoutes = require('./routes/itemRoutes'); 
const path = require('path'); // Add this line to require the path module
const app = express();
var cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', userRoutes); // Ensure userRoutes is properly imported
app.use('/item', itemRoutes); // Ensure itemRoutes is properly imported

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build'))); // Update the path accordingly

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html')); // Update the path accordingly
});

app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));