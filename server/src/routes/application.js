const router = require('express').Router();
const appCtrl = require('../controllers/applicationController');
const auth = require('../middlewares/auth');

router.post('/', appCtrl.createApplication); // applicant posts
router.get('/my', auth, appCtrl.getMyApplications);
router.get('/all', auth, appCtrl.getAll);
router.put('/:id/status', auth, appCtrl.updateStatus);
router.post('/botmimic/progress', auth, appCtrl.progressTech);

module.exports = router;
