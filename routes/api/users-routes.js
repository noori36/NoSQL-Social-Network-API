const router = require('express').Router();

const {
    createUsers,
    updateUsers,
    deleteUsers,
    getAllUsers,
    getUsersById,
    addFriend,
    deleteFriend
  } = require('../../controllers/users-controller');

router.route('/').get(getAllUsers).post(createUsers);

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)


module.exports = router;