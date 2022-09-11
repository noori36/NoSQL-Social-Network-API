const moment = require('moment');
const { Schema, model, Types } = require('mongoose');

const ReactionsSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    reactionId: {
        type: Schema.Types.ObjectId,
        default: ()=> new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
    },

    {
    toJSON: {
        getters: true
    } 
    }
);

const ThoughtsSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    reactions: [ReactionsSchema]
    },
    
    {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

ThoughtsSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
