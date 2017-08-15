
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
					$("#right").hide();
					$("#_profile").css("display", "table-cell");
				}else{
					$("#_profile").css("display", "none");
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
  
