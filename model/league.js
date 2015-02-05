'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * League Schema
 */
var LeagueSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please enter a league name',
        trim: true
    },

    about: String,

    location: {type: String, default: ''},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    teams: { type: [Schema.ObjectId], ref: 'Team' }


});


module.exports = mongoose.model('League', LeagueSchema);