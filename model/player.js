'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Player Schema
 */
var PlayerSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please enter an agency name',
        trim: true
    },

    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }

});


module.exports = mongoose.model('Player', PlayerSchema);