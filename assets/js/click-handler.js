'use strict'

$(document).ready(function(e) {
    $('#app-page').hide();
    $('#hide-login-form').hide();


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
            // $('#login-register-form').hide();
            // // $('#logout-button').show();
            // $('#landing-page').hide();
            // $('#register-button').hide();
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

         whatsMyPassword.showPasswords(token, function(error, data){
            var display = function(){
          var newHTML = credentailTemplate(data);
          $("#table-logs").html(newHTML);
        };
      display();
  });



            // var credentials = data.credentials;
            // var listHTML = "";


    });


  //   $("#show-bench").on("submit", function(e) {
  //   //var id = $(".id").val();
  //     var token = $(".token").val();
  //     e.preventDefault();

  //     benchController.showLogs(token, function(error, data) {
  //       // if (error) {
  //       //   console.error(error);
  //       // $('#result').val('status: ' + error.status + ', error: ' +error.error);
  //       //   return;
  //       // }
  //       $('#result').val(JSON.stringify(data, null, 4));
  //       data.benches = data.benches;
  //       var display = function(){
  //         var newHTML = benchTableTemplate({benches: data.benches});
  //         $("#bench-log-body").html(newHTML);
  //       };
  //     display();
  //   }); //end of anon callback fnc
  // });

// $('#show-activity-list').on('click', function(e) {
//         $('#activity-table').html('');
//         e.preventDefault();
//         var item = {
//             name: "name"
//         };
//         smart_grocery.showGroceries(groceryApp.token, function(err, data) {
//             console.log('data is' + data);
//             var groceries = data.groceries;
//             var listHTML = "";
//             groceries.forEach(function(grocery) {
//                 listHTML += "<tr data-id=\"" + grocery.id + "\"><td>" + grocery.name + "</td>" +
//                     "<td><button class='edit' >Edit</button><button class='delete'>Delete</button></td></tr>";

//             });
//             $('#activity-table').append(listHTML);
//         });


//     }); // end Show grocery Item

});
