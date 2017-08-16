
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
  var name, email, photoUrl, uid, emailVerified;
  
  function writeUserData(userId, name, email, imageUrl) {
  	database.ref('users/' + userId).set({
    	username: name,
    	email: email,
    	profile_picture : imageUrl
  	});
  }
  
  function register() {
	  email = $("#email").val();
	  var password = $("#password").val();
	  var confirmpass = $("#confirm-password").val();
	  
	  if(confirmpass.localeCompare(password) != 0 || confirmpass.length <= 0 || password.length <= 0){
		  can_reg = false;
		  $("#password").addClass("input_error");
		  $("#confirm-password").addClass("input_error");
	  }else{
		  can_reg = true;
		  $("#password").removeClass("input_error");
		  $("#confirm-password").removeClass("input_error");
	  }
	  
	  if(
	  	email.split("@").length - 1 != 1 || 
		email.split(".").length - 1 != 1 ||
		email.split(".")[email.split(".").length-1].length <= 0
	  ){
		  can_reg = false;
		  $("#email").addClass("input_error");
		  
	  }else{
		  can_reg = true;
		  $("#email").removeClass("input_error");
	  }
	  
	  if(can_reg == true){
		  $("#span0").html("");
		 
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
				if(error.message != null)
					$("#span0").html(JSON.stringify(error.message)); 
			});
		
	  }else{
		  $("#span0").html("Incorrect email or password");
	  }
	  
  }
  
  auth.onAuthStateChanged(
  	function(user) { 
		if (user) { 
			var user = auth.currentUser;
			
			name = user.displayName;
  			email = user.email;
  			photoUrl = user.photoURL;
  			emailVerified = user.emailVerified;
  			uid = user.uid;
			
			if(emailVerified === true){
				name = user.displayName;
  				email = user.email;
  				photoUrl = user.photoURL;
  				emailVerified = user.emailVerified;
  				uid = user.uid;
				//$("#_profile").css("visibility", "shown");
			}else{
				$("#span0").html("Verify your email address");
				$("#span1").html("Verify your email address");
			}
		} 
	});
	
	function signin(){
		
		$("#span1").html("");
		email = $("#email0").val();
	  var password = $("#password0").val();
	  if(!(auth.currentUser === null)){
		  auth.signOut();
		  _signin(email, password);
	  }else{
		  _signin(email, password);
	  }
	  
	}
	
	function _signin(email, password){
		firebase.auth().signInWithEmailAndPassword(email, password)
   			.then(function(user) {
       			// Success 
				
				if(user.emailVerified == true){
					$("#_profile").css("display", 'table-cell');
					$("#right").hide();
					
					$("#_eml").val(email);
					$("#_pass").val(password);
					$("#_name").val(name);
					
					$( "input" ).addClass("removeborders");
					$("#_prfbutton").removeClass("removeborders");
					$("#_signout").removeClass("removeborders");
					$("#_prfbutton").val("Edit Form");
					$( "select" ).addClass("removeborders");
					$( "input[disabled=true]" ).attr("disabled", 'true');
					$( "#_venue" ).prop("disabled", true);
					
				}else{
					$("#_profile").css("display", 'none');
				}
				
   			}, function(error) {
       			// Error Handling
				var errorCode = error.code;
  				var errorMessage = error.message;
				
  				if (errorCode === 'auth/wrong-password') {
    				//alert('Wrong password.');
					$("#span1").html("Wrong password");
 		 		} else {
    				$("#span1").html(errorMessage);
  				}
  			});
	}
	
	function edit_signout(){
		var val0 = $("#_prfbutton").val();
		//$("#_profile").css("visibility", 'hidden');
		switch(val0) {
			case "Edit Form":
				$( "input" ).removeClass("removeborders");
				$( "select" ).removeClass("removeborders");
				$( "input[disabled=true]" ).removeAttr("disabled");
				$( "#_venue" ).prop("disabled", false);
				$("#_eml").prop("disabled", true);
				$("#_prfbutton").val("Update Form");
		 		break;
			case "Update Form":
				$( "input" ).addClass("removeborders");
				$("#_prfbutton").removeClass("removeborders");
				$("#_signout").removeClass("removeborders");
				$("#_prfbutton").val("Edit Form");
				$( "select" ).addClass("removeborders");
				$( "input[disabled=true]" ).attr("disabled", 'true');
				$( "#_venue" ).prop("disabled", true);
				break;
			default:
				//text = "I have never heard of that fruit...";
		}
		
	}
	
	function signout(){
		$( "input" ).removeClass("removeborders");
		$("#_profile").css("display", 'none');
		$("#right").show();
		
		auth.signOut();
		
	}
  
