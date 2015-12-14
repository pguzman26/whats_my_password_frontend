'use strict'

$(document).ready(function(e) {
    $('.grocery').hide();
    $('#reg-popup').hide();

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

});

/////////////////////////Register Form ////////////////////////////

 $('#register-form').on('submit', function(e) {
        e.preventDefault();

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
        var credentials = wrap('credentials', form2object(e.target));
        whatsMyPassword.register(credentials, function(err, data) {
            //     if (err) { console.error(err); });
            $('#register-form').hide();
        });

    });
