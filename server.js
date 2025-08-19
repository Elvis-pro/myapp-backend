require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const logvisitor = require("./Middlewears/logVisitor")
const logvisitortodb = require("./Middlewears/logvisitorTodb")
const shortlinkRoutes = require('./routers/shortLinkRoutes')
const visitorstatsroutes = require("./routers/visitorRoute")

const movieRoutes = require('./routers/movieRoutes');
const seriesRoutes = require('./routers/seriesRoutes');

const app = express();

// Middleware
app.use(logvisitor)
app.use(logvisitortodb)
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/movies', movieRoutes);
app.use('/api/series', seriesRoutes);
app.use("/api/visitors", visitorstatsroutes)
app.use('/', shortlinkRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
