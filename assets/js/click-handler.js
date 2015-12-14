'use strict'

$(document).ready(function(e) {
    $('').hide();
    $('#reg-popup').hide();

/////////// Global Variable/////////////////
var data = {};
var PasswordApp = PasswordApp || {};


    ////////////////Login/Register Helper


    var form2object = function(form) {
        var data = {};
        $(form).find('input').each(function(index, element) {
            var type = $(this).attr('type');
            if ($(this).attr('name') && type !== 'submit' && type !== 'hidden') {
                data[$(this).attr('name')] = $(this).val();
            }
        });
        return data;
    };

    var wrap = function wrap(root, formData) {
        var wrapper = {};
        wrapper[root] = formData;
        return wrapper;
    };

    var callback = function callback(error, data) {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
    };















    //////////////////// Login/Register Form Actions ///////////////////
    $(function() {

        $('#login-form-link').click(function(e) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });
        $('#register-button').click(function(e) {
            $('#landing-page').fadeOut();
            $('#reg-popup').show();
            $("#register-form").delay(100).fadeIn(100);
            $("#login-form").fadeOut(100);
            $('#login-form-link').removeClass('active');
            $(this).addClass('active');
            e.preventDefault();
        });

    });



    /////////////////////////Register Form ////////////////////////////

    $('#register-form').on('submit', function(e) {
        e.preventDefault();
        var credentials = wrap('credentials', form2object(e.target));
        whatsMyPassword.register(credentials, function(err, data) {
          console.log(err,data);
            $('#login-register-form').hide();
            // $('#reg-popup').hide();
            // $('#landing-page').detach();
            // $('#register-button').hide();
        });

    });

    ////////////////////////////Login Form///////////////////////////



    $('#login-form').on('submit', function(e) {
        e.preventDefault();
        var credentials = wrap('credentials', form2object(e.target));
        whatsMyPassword.login(credentials, function(err, data) {
            console.log(err, data);
            PasswordApp.token = data.user.token;
            PasswordApp.user_id = data.user.id;
            console.log(data);
            $('#login-register-form').hide();
            // $('#login-register-form').hide();
            // // $('#logout-button').show();
            // $('#landing-page').hide();
            // $('#register-button').hide();
        });

    });

});
