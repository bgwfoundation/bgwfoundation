
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
  
  function writeUserData(userId, name, email, imageUrl) {
  	database.ref('users/' + userId).set({
    	username: name,
    	email: email,
    	profile_picture : imageUrl
  	});
  }
  
  function register() {
	  var email = $("#email").val();
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
				$("#span0").html(JSON.stringify(value));
			}).catch(
			function(error) { 
				if(error.message != null)
					$("#span0").html(JSON.stringify(error.message)); 
			});
		
	  }else{
		  $("#span0").html("Incorrect email or password");
	  }
	  
  }
  
