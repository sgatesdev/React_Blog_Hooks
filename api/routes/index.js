const router = require('express').Router();
const postRoutes = require('./postRoutes');

// define posts route, leave room for other routes in future (auth, comments, etc. )
router.use('/post', postRoutes);

// export router 
module.exports = router;