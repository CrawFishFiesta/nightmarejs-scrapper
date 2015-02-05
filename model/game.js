'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
    homeTeam: {
        name: { type: Schema.ObjectId, ref: 'Team' },
        score: String
    },
    awayTeam: {
        name: { type: Schema.ObjectId, ref: 'Team' },
        score: String
    },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});


module.exports = mongoose.model('Player', PlayerSchema);