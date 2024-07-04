require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
const productRoutes = require('./routes/productRoutes')
const subproductRoutes = require('./routes/SubProductRoute')
const eachproductRoutes = require('./routes/EachProductRoutes')
const addCart = require('./routes/AddCartRoutes')
const watchlist = require('./routes/WatchListRouter')


const cors = require('cors'); // Import CORS middleware
const app = express();
app.use(express.static('uploads'))

const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use(cors());
app.use(userRoutes);
app.use(productRoutes);
app.use(subproductRoutes)
app.use(eachproductRoutes)
app.use(addCart)
app.use(errorHandler);
app.use(watchlist)




app.use(bodyParser.json());
// Error Handling Middleware
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

