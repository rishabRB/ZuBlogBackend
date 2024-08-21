const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user')
require('dotenv').config();



const app = express();

app.use(cors());
app.use(express.json());
app.use('/', postRoutes);
app.use('/user', userRoutes)


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));