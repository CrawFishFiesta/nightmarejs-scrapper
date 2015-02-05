'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please enter an agency name',
        trim: true
    },

    about: String,


    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    players: { type: [Schema.ObjectId], ref: 'Player' },
    league: { type: Schema.ObjectId, ref: 'League' }

});


module.exports = mongoose.model('Team', TeamSchema);