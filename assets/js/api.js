'use strict';

var token = null;

var $;

var console;

var handleError = function handleError(error, data, optional_alert) {
        if (error) {
            console.error(error);
            if (optional_alert) {
                optional_alert();
            }
            throw error;
        } else {
            console.log(data);
        }
    };

var cb = function(err, data){
            handleError(err, data);
};

var whatsMyPassword = {
    url: 'http://localhost:3000',
    // url: 'https://nameless-tundra-6319.herokuapp.com/',

    ajax: function(config, cb) {
        $.ajax(config).done(function(data, textStatus, jqxhr) {
            cb(null, data);
        }).fail(function(jqxhr, status, error) {
            cb({
                jqxher: jqxhr,
                status: status,
                error: error
            });
        });
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    register: function register(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/register',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            dataType: 'json'
        }, callback);
    },

    login: function login(credentials, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/login',
            contentType: 'application/json',
            data: JSON.stringify(credentials),
            dataType: 'json'
        }, callback);
    },

    logout: function logout(user_id, token, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/logout/' + user_id,
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            dataType: 'json'
        }, callback);
    },

    //////////////////////////////////////////////////////////////////////////////////////////

    createProfile: function createProfile(profile, user_id, token, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(profile),
            dataType: 'json'
        }, callback);
    },

    updateProfile: function updateProfile(profile, user_id, token, callback) {
        this.ajax({
            method: 'PATCH',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(profile),
            dataType: 'json'
        }, callback);
    },

    readProfile: function readProfile(user_id, token, callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'

        }, callback);
    },

    destroyProfile: function destroyProfile(user_id, token, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/users/' + user_id + '/profile',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'

        }, callback);

    },






    //////////////////////////////////////////////////////////////////////////////////////////


    //Authenticated api actions
    listPasswords: function(token, callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/credentials/',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'
        }, callback);
    },

    updatePasswords: function(token, id, updateCred, callback) {
        this.ajax({
            method: 'PATCH',
            url: this.url + '/credentials/' + id,
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json',
            data: JSON.stringify(updateCred),
            dataType: 'json'
        }, callback);
    },

    createPasswords: function(token, credential, callback) {
        this.ajax({
            method: 'POST',
            url: this.url + '/credentials/',
            headers: {
                Authorization: 'Token token=' + token
            },
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(credential),
            dataType: 'json',
        }, callback);
    },

    showPasswords: function(token, callback) {
        this.ajax({
            method: 'GET',
            url: this.url + '/credentials',
            headers: {
                Authorization: 'Token token=' + token
            },
            dataType: 'json'
        }, callback);
    },

    deletePasswords: function(token, id, callback) {
        this.ajax({
            method: 'DELETE',
            url: this.url + '/credentials/' + id,
            headers: {
                Authorization: 'Token token=' + token
            }
        }, callback);
    }
};
