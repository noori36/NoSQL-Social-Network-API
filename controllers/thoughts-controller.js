const {Thoughts, Users} = require('../models');


const thoughtsController = {

    createThoughts({params, body}, res) {
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate(
                { _id: params.userId}, 
                {$push: {thoughts: _id}}, 
                {new: true}
            );
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'No thoughts with this id!'});
                return;
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err)); 
    },


    updateThoughts({params, body}, res) {
        Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .populate({path: 'reactions', select: '-__v'})
        .select('-___v')
        .then(updateThoughtsData => {
            if (!updateThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
                res.json(updateThoughtsData);
        })
        .catch(err => res.json(err));
    },


    deleteThoughts({params}, res) {
        Thoughts.findOneAndDelete({_id: params.id})
        .then(deleteThoughtsData => {
            if (!deleteThoughtsData) {
                res.status(404).json({message: 'No thoughts found with this id!'});
                return;
            }
            res.json(deleteThoughtsData);
            })
            .catch(err => res.status(400).json(err));
    }, 

    
    addReaction({params, body}, res) {
        Thoughts.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$push: {reactions: body}}, 
            {new: true, runValidators: true}
        )
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(reactionThoughtsData => {
        if (!reactionThoughtsData) {
            res.status(404).json({message: 'No thoughts found with this id!'});
            return;
        }
        res.json(reactionThoughtsData);
        })
        .catch(err => res.status(400).json(err))

    },

    deleteReaction({params}, res) {
        Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
        .then(reactionThoughtsData => {
            if (!reactionThoughtsData) {
                res.status(404).json({message: 'No thoughts with this id!'});
                return;
            }
            res.json(reactionThoughtsData);
        })
        .catch(err => res.status(400).json(err));
    },    
    

    getAllThoughts(req,res) {
        Thoughts.find({})
        .populate({path: 'reactions', select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },


    getThoughtsById({params}, res) {
        Thoughts.findOne({ _id: params.id })
        .populate({path: 'reactions',select: '-__v'})
        .select('-__v')
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
            res.status(404).json({message: 'No thoughts found with this id!'});
            return;
        }
        res.json(dbThoughtsData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

}

module.exports = thoughtsController;