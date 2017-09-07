

var config = {
    apiKey: "AIzaSyBf277qBnCL6Kktj--bpxsnW2tUmIRUOpk",
    authDomain: "aspire-c6ce5.firebaseapp.com",
    databaseURL: "https://aspire-c6ce5.firebaseio.com",
    storageBucket: "bucket.appspot.com"
};

// Get a reference to the database service
var database = firebase.database();
var auth = firebase.auth();

//var twit_provider = auth.TwitterAuthProvider();

fb_provider.setCustomParameters({
				    'display': 'popup'
				});

var can_reg = false;
var name, email, uid, emailVerified, phoneNumber, epoch, venue, invitees, isVerified;

//auth.signOut();

function writeUserData(uid, name, email, phoneno, invitees, paymentid, isVerified, epoch, venue) {
    //database.ref("-users/-" + uid).push({ phone_number: phoneno });
    database.ref("users/" + uid).set(
	{
	    "displayName" : name,
	    "email" : email,
	    "phone_number": phoneno,
	    "invitees" : invitees,
	    "payment_id" : paymentid,
	    "isVerified" : isVerified,
	    "epoch": epoch,
	    "venue": venue
	}
    );
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
	    user.sendEmailVerification().then(
		function() {
		    // Email sent.
		    $("#span0").html("A verification link has been sent to your email address");
		}, function(error) {
		    // An error happened.
		}
	    );

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
	    var emailVerified = user.emailVerified;
	    uid = user.uid;

	    if (emailVerified == true)
	    {
		name = user.displayName;
		email = user.email;
		emailVerified = user.emailVerified;
		uid = user.uid;
		$("#_pass").val(user.password);

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
		      getFirstEpoch(uid);
		      setUserData(uid);
		      refreshUI0();
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
	    if (!(epch == null) || !(ecph.length <= 0) || epch)
	    {
		epoch = epch;
	    }
	    else
	    {
		epoch = "" + (new Date()).getTime() + "";
	    }
	},
	function(error) {
	    alert(error);
	});

    return epoch;
}

function facebook_signin() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
	function(result) {
	    var token = result.credential.accessToken;
	    var user = result.user;
	    setUserData(user.id);
	    refreshUI0();

	}, function(error) {
	    
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
	    var emailVerified = user.emailVerified;
	    uid = user.uid;

	    if (emailVerified == true)
	    {
		name = user.displayName;
		email = user.email;
		emailVerified = user.emailVerified;
		uid = user.uid;
		$("#_pass").val(user.password);

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
		      getFirstEpoch(uid);
		      setUserData(uid);
		      refreshUI0();
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
	    if (!(epch == null) || !(ecph.length <= 0) || epch)
	    {
		epoch = epch;
	    }
	    else
	    {
		epoch = "" + (new Date()).getTime() + "";
	    }
	},
	function(error) {
	    alert(error);
	});

    return epoch;
}

function facebook_signin() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(
	function(result) {
	    var token = result.credential.accessToken;
	    var user = result.user;
	    setUserData(user.id);
	    refreshUI0();

	}, function(error) {
	    
	});

}

function twitter_signin() {
    //alert("bingo");
    /*
     // Step 1.
     // User tries to sign in to Twitter.
     auth.signInWithPopup(twit_provider).then(
     function(result) {
     var token = result.credential.accessToken;
     var user = result.user;
     setUserData(user.id);
     }, 
     function(error) {
     // An error happened.
     if (error.code === 'auth/account-exists-with-different-credential')
     {
     // Step 2.
     // User's email already exists.
     // The pending Twitter credential.
     var pendingCred = error.credential;
     // The provider account's email address.
     var email = error.email;
     // Get registered providers for this email.
     auth.fetchProvidersForEmail(email).then(function(providers) {
     // Step 3.
     // If the user has several providers,
     // the first provider in the list will be the "recommended" provider to use.
     if (providers[0] === 'password')
     {
     // Asks the user his password.
     // In real scenario, you should handle this asynchronously.
     var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
     auth.signInWithEmailAndPassword(email, password).then(function(user) {
     // Step 4a.
     return user.link(pendingCred);
     }).then(function() {
     // Twitter account successfully linked to the existing Firebase user.
     goToApp();
     });
     return;
     }
     // All the other cases are external providers.
     // Construct provider object for that provider.
     // TODO: implement getProviderForProviderId.
     var provider = getProviderForProviderId(providers[0]);
     // At this point, you should let the user know that he already has an account
     // but with a different provider, and let him validate the fact he wants to
     // sign in with this provider.
     // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
     // so in real scenario you should ask the user to click on a "continue" button
     // that will trigger the signInWithPopup.
     auth.signInWithPopup(provider).then(function(result) {
     // Remember that the user may have signed in with an account that has a different email
     // address than the first one. This can happen as Firebase doesn't control the provider's
     // sign in flow and the user is free to login using whichever account he owns.
     // Step 4b.
     // Link to Twitter credential.
     // As we have access to the pending credential, we can directly call the link method.
     result.user.link(pendingCred).then(function() {
     // Twitter account successfully linked to the existing Firebase user.
     goToApp();
     });
     });
     });
     }
     });*/
}

/*
 function getUserData(uid) {
 database.ref("/users/" + uid).once('value').then(
 function(snapshot) {
 var test = (snapshot.val() && snapshot.val().epoch);
 alert(test);
 },
 function(error) {
 alert(error);
 });
 }	*/

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

	    if (snapshot.val() && snapshot.val().isVerified == true)
	    {
		$("#_prntpass").css("visibility", "shown");
	    }

	},
	function(error) {
	    if (error.message != null)
		$("#span0").html(JSON.stringify(error.message));
	}
    );
}

function refreshUI0() {
    $("#_pass").val(user.password);
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

}

function isVerified(uid) {
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    isVerified = (snapshot.val() && snapshot.val().isVerified);
	    invitees = (snapshot.val() && snapshot.val().invitees);
	    paymentid = (snapshot.val() && snapshot.val().paymentid);
	},
	function(error) {

	}
    );
    return false;
}

function paymentid(uid) {
    var paymentid = "";
    database.ref("/users/" + uid).once('value').then(
	function(snapshot) {
	    paymentid = (snapshot.val() && snapshot.val().paymentid);
	},
	function(error) {

	}
    );
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

function aspire(){
	var asp_url = window.location.host + "/aspire.html";
	window.location.assign(asp_url);
}
