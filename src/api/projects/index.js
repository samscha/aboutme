const router = require('express').Router();

/**
 * /api/projects
 *
 * routes for projects endpoint
 *
 */
router.use(`/all`, require('./routes/all'));
router.use(`/`, require('./routes/root'));

module.exports = router;
