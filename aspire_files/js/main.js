
// Set the configuration for your app
// TODO: Replace with your project's config object
var config = {
    apiKey: "AIzaSyBf277qBnCL6Kktj--bpxsnW2tUmIRUOpk",
    authDomain: "aspire-c6ce5.firebaseapp.com",
    databaseURL: "https://aspire-c6ce5.firebaseio.com",
    storageBucket: "bucket.appspot.com"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var auth = firebase.auth();
var can_reg = false;
var name, email, uid, emailVerified, phoneNumber, epoch, venue, invitees, isVerified;

function writeUserData(userId, name, email, phoneno, invitees, paymentid, isVerified, epoch, venue) {
    //database.ref("-users/-" + userId).push({ phone_number: phoneno });
    database.ref("users/" + userId).set({
					    "displayName" : name,
					    "email" : email,
					    "phone_number": phoneno,
					    "invitees" : invitees,
					    "payment_id" : paymentid,
					    "isVerified" : isVerified,
					    "epoch": epoch,
					    "venue": venue
					});
}

/*
 function writeNewPost(uid, username, picture, title, body) {
 // A post entry.
 var postData = {
 author: username,
 uid: uid,
 body: body,
 title: title,
 starCount: 0,
 authorPic: picture
 };

 // Get a key for a new Post.
 var newPostKey = firebase.database().ref().child('posts').push().key;

 // Write the new post's data simultaneously in the posts list and the user's post list.
 var updates = {};
 updates['/posts/' + newPostKey] = postData;
 updates['/user-posts/' + uid + '/' + newPostKey] = postData;

 return firebase.database().ref().update(updates);
 }*/

function register() {
    email = $("#email").val();
    var password = $("#password").val();
    var confirmpass = $("#confirm-password").val();

    auth.createUserWithEmailAndPassword(email, password).then(
	function(value) { 
	    var user = auth.currentUser;
	    user.sendEmailVerification().then(function() {
						  // Email sent.
						  $("#span0").html("A verification link has been sent to your email address");
					      }, function(error) {
						  // An error happened.
					      });

	}, 
	function(error) { 
	    if (error.message != null)
		$("#span0").html(JSON.stringify(error.message)); 
	});

}

auth.onAuthStateChanged(
    function(user) { 
	if (user)
	{ 
	    var user = auth.currentUser;

	    name = user.displayName;
	    if (name == null || name == "")
		name = "FULLNAME";
	    email = user.email;
	    emailVerified = user.emailVerified;
	    uid = user.uid;

	    if (emailVerified == true)
	    {
		name = user.displayName;
		email = user.email;
		emailVerified = user.emailVerified;
		uid = user.uid;
		//$("#_profile").css("visibility", "shown");
	    }
	    else
	    {
		$("#span0").html("Verify your email address");
		$("#span1").html("Verify your email address");
	    }
	} 
    });

function signin() {

    $("#span1").html("");
    email = $("#email0").val();
    var password = $("#password0").val();
    if (!(auth.currentUser == null))
    {
	auth.signOut();
	_signin(email, password);
    }
    else
    {
	_signin(email, password);
    }

}

function _signin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
	.then(function(user) {
		  // Success 

		  if (user.emailVerified == true)
		  {
		      var eph = getFirstEpoch(uid);
		      if (!(eph == null) || !(eph.length <= 0) || eph)
		      {
			  epoch = eph;
		      }
		      else
		      {
			  epoch = "" + (new Date()).getTime() + "";
		      }
		      
		      $("#_profile").css("display", 'table-cell');
		      $("#right").hide();

		      $("input").addClass("removeborders");
		      $("#_prfbutton").removeClass("removeborders");
		      $("#_signout").removeClass("removeborders");
		      $("#_prfbutton").val("Edit Form");
		      $("select").addClass("removeborders");
		      $("input").prop("disabled", true);
		      $("#_venue").prop("disabled", true);
		      $("#_prfbutton").prop("disabled", false);
		      $("#_signout").prop("disabled", false);
		      
		      setUserData(uid);
		  }
		  else
		  {
		      $("#_profile").css("display", 'none');
		  }

	      }, function(error) {
		  // Error Handling
		  var errorCode = error.code;
		  var errorMessage = error.message;

		  if (errorCode == 'auth/wrong-password')
		  {
		      //alert('Wrong password.');
		      $("#span1").html("Wrong password");
		  }
		  else
		  {
		      $("#span1").html(errorMessage);
		  }
	      });
}

function _editnupdate() {
    var val0 = $("#_prfbutton").val();
    //$("#_profile").css("visibility", 'hidden');
    switch (val0)
    {
	case "Edit Form":
	    $("input").removeClass("removeborders");
	    $("select").removeClass("removeborders");
	    $("input").prop("disabled", false);

	    $("#_venue").prop("disabled", false);
	    $("#_eml").prop("disabled", true);
	    $("#_prfbutton").val("Update Form");

	    break;
	case "Update Form":
	    var can_update = true;
	    var _err = [];

	    var data = {name: $("#_name").val(), password: $("#_pass").val()};

	    var constraints = {
		name: {
		    presence: true,
		    exclusion: {
			within: ["null", "name"],
			message: "'%{value}' is not allowed"
		    },
		    format: {
			pattern: "[a-z]+",
			flags: "i",
			message: "can only contain a-z"
		    }
		},

		password: {
		    presence: true,
		    length: {
			minimum: 6,
			message: "must be at least 6 characters"
		    }
		}
	    };

	    var result = validate(data, constraints, {format: "flat"});

	    if (validate.isDefined(result) == true)
	    {
		can_update = false;
		_err.push(result.toString());
	    }  

	    if ($("#_phoneno").val() == "")
	    {
		can_update = false;
	    }
	    else
	    {
		phoneNumber = $("#_phoneno").val();
	    }

	    var nvts = [];
	    for (var i = 0; i < 3; i++)
	    {
		if ($("#_inv" + i).val() == "")
		{
		    can_update = false;
		}
		else
		{
		    nvts.push($("#_inv" + i).val());
		}
	    }

	    var user_options = document.getElementById("_venue");
	    venue = user_options.options[user_options.selectedIndex].text;

	    if (can_update == true)
	    {
		$("#span2").html("");

		$("input").addClass("removeborders");
		$("input").prop("disabled", true);
		$("select").addClass("removeborders");
		$("#_venue").prop("disabled", true);

		$("#_prfbutton").removeClass("removeborders");
		$("#_signout").removeClass("removeborders");
		$("#_prfbutton").val("Edit Form");
		$("#_prfbutton").prop("disabled", false);
		$("#_signout").prop("disabled", false);

		name = $("#_name").val();
		email = $("#_eml").val();
		phoneNumber = $("#_pass").val();
		invitees = nvts;
		
		writeUserData(uid, name, email, phonenNumber, invitees, paymentid(uid), isVerified(uid), epoch, venue);

	    }
	    else
	    {
		$("#span2").html("Something is wrong with your profile: " + 
				 _err.toString().replace("{", "").replace("}", " ").replace("[", "").replace("]", " ").replace("{", "").replace(",", ", "));
	    }

	    break;
	default:
	    //text = "I have never heard of that fruit...";
    }

}

function signout() {
    $("input").removeClass("removeborders");
    $("input").prop("disabled", false);
    $("#_profile").css("display", 'none');
    $("#right").show();

    auth.signOut();

}

function getFirstEpoch(uid) {
    var epch = "";
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    epch = (snapshot.val() && snapshot.val().epoch);
	},
	function(error) {
	    alert(error);
	});

    return epoch;
}

function getUserData(uid) {
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    var test = (snapshot.val() && snapshot.val().epoch);
	    alert(test);
	},
	function(error) {
	    alert(error);
	});
}	

function setUserData(uid) {
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    name = (snapshot.val() && snapshot.val().displayName);
	    email = (snapshot.val() && snapshot.val().email);
	    phoneNumber = (snapshot.val() && snapshot.val().phone_number);
	    invitees = (snapshot.val() && snapshot.val().invitees);
	    venue = (snapshot.val() && snapshot.val().venue);
	    
	    $("#_eml").val(email);
	    $("#_name").val(name);
	    $("#_phoneno").val(phoneNumber);
	    
	    for (var i = 0; i < 3; i++)
	    {
		$("#_inv" + i).val(invitees[i]);
	    }
	    
	    $("#_venue").val(venue);
	    
	    if(snapshot.val() && snapshot.val().isVerified == true){
		$("#_prntpass").css("visibility", "shown");
	    }
	    
	},
	function(error) {

	});
}

function isVerified(uid) {
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    isVerified = (snapshot.val() && snapshot.val().isVerified);
	    invitees = (snapshot.val() && snapshot.val().invitees);
	    paymentid = (snapshot.val() && snapshot.val().paymentid);
	},
	function(error) {

	});
    return false;
}

function paymentid(uid) {
    var paymentid = "";
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    paymentid = (snapshot.val() && snapshot.val().paymentid);
	},
	function(error) {

	});
    return paymentid;
}

function _print() {
    var val0 = $("#_prntpass").val();
    //$("#_profile").css("visibility", 'hidden');
    switch (val0)
    {
	case "Print Ticket":
	    
	    break;
	case "Print":
	    
	    break;
	default:
	    //text = "I have never heard of that fruit...";
    }

}
