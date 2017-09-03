(function(){

// Initialize Firebase
var config = {
	apiKey: "AIzaSyB-MfCXb9eCReVmyZ7DnKEG-jZxA5TUczQ",
	authDomain: "github-page-7206c.firebaseapp.com",
	databaseURL: "https://github-page-7206c.firebaseio.com",
	storageBucket: "github-page-7206c.appspot.com",
	messagingSenderId: "209264035558"
};
var defaultApp = firebase.initializeApp(config);
var defaultDatabase = defaultApp.database();
var storage = firebase.storage();



$(window).ready(function(){
	$("#signInBtn").click(function(){
		var email = $("#email").val();
		var password = $("#password").val();//'engineer1379';
		$("#errorMessage").hide();
		signIn(email, password);
	});
});

function signIn(email, password){
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  console.log(errorMessage);
	  $("#errorMessage").show();
	  $("#errorMessage").html(errorMessage);
	});
	
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		// User is signed in.
		var isAnonymous = user.isAnonymous;
		var uid = user.uid;		
		console.log('[Signed In]');
		window.location.href = "index.html";
	  } else {
		// User is signed out.
		console.log('User is signed out.');
		$("#errorMessage").show();
		$("#errorMessage").html("Incorrect credentials.");
	  }
	});
}
function signOut(){
	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}, function(error) {
	  // An error happened.
	});
}

})();