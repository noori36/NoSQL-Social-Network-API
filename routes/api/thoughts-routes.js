const router = require('express').Router();

const { 
    
    createThoughts, 
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction,
    getAllThoughts, 
    getThoughtsById 

} = require('../../controllers/thoughts-controller');


router.route('/').get(getAllThoughts);

router.route('/:id').get(getThoughtsById).put(updateThoughts).delete(deleteThoughts); 

router.route('/:userId').post(createThoughts);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);


module.exports = router;