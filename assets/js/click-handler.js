'use strict'

$(document).ready(function(e) {
    $('#app-page').hide();
    $('#hide-login-form').hide();
    // $('#show-activity-list').hide();


    /////////// Global Variable/////////////////
    var data = {};
    var PasswordApp = PasswordApp || {};
    var credentailTemplate = Handlebars.compile($("#credential-handlebars").html());


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
        $('#register-button').on('click', function(e) {
            $('#hide-login-form').show();
            $('#login-register-form').show();
            $('#landing-page').fadeOut();
            $('#register-form').show();
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
            console.log(err, data);
            $('#login-register-form').hide();
            $('#app-page').fadeIn();
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
            $('#app-page').fadeIn();
        });

    });


    ////////Log out


    $('#navbar').on('click', function(e) {
        e.preventDefault();
        var credentials = wrap('credentials', form2object(e.target));
        whatsMyPassword.logout(PasswordApp.user_id, PasswordApp.token, function(err, data) {
            console.log(err, data);
            $('#app-page').hide();
            $('#landing-page').fadeIn();
        });
    });

    // Create
    $('#create-credential').on('submit', function(e) {
        var credentials = wrap('credential', form2object(this));
        console.log(form2object(this));
        var token = PasswordApp.token;
        e.preventDefault();
        whatsMyPassword.createPasswords(token, credentials, callback);
    });



    // read

    $('#show-activity-list').on('click', function(e) {
        $('#table-logs').html('');
        e.preventDefault();
        var token = PasswordApp.token;

        whatsMyPassword.showPasswords(token, function(error, data) {
            var display = function() {
                var newHTML = credentailTemplate(data);
                $("#table-logs").html(newHTML);
            };
            display();
        });
    });

    // delete

    $("#table-logs").on("click", "button[data-type=delete]", function(e) {
        var elementID = $(event.target).data("id");
        var token = PasswordApp.token;
        whatsMyPassword.deletePasswords(token, elementID, function(error, data) {
        $(e.target).parent().parent().children('span, button, tr, td').remove();
        });

    });

    // Update

    $("#table-logs").on("click", "button[data-type=submit]", function(e) {
        var id = $(event.target).data("id");
        var token = PasswordApp.token;
        var updateCred = {
            credential: {
                website: $('[name=website][class=editInput' + id + ']').val(),
                user_name: $('[name=user_name][class=editInput' + id + ']').val(),
                password: $('[name=password][class=editInput' + id + ']').val()
            }
        };
        console.log(updateCred);
        whatsMyPassword.updatePasswords(token, id, updateCred, callback);

    });


        // reset the table
    $("#table-logs").on("click", "button[data-type=reset]", function(e) { // <----
        $(e.target).parent().parent().children().children('span, button').show();
        $('.editInput' + $(e.target).data('id')).hide();

    });
    //shows a new table to edit
    $("#table-logs").on("click", "button[data-type=edit]", function(e) {
        $(e.target).parent().parent().children().children('span, button').hide();
        $('.editInput' + $(e.target).data('id')).show();
    });
});
