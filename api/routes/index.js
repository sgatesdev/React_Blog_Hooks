const router = require('express').Router();
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

// define routes (future anticipated routes: like, user)
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

// export router 
module.exports = router;