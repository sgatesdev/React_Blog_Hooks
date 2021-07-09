const router = require('express').Router();
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// define posts route, leave room for other routes in future (auth, comments, etc. )
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// export router 
module.exports = router;