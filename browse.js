
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
		$("#signOutBtn").click(function(event){
			event.preventDefault();
			signOut();
		});
    	
    	downloadImg(storage, '');
		
	});
	

	function signOut(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  window.location.href = "signin.html";
		}, function(error) {
		  // An error happened.
		});
	}
	
	function downloadImg(storage, filename) {
		
		var storageRef = storage.ref();
		
		// Create a reference to the file we want to download
		var starsRef = storageRef.child('images/hey.jpg');

		// Get the download URL
		starsRef.getDownloadURL().then(function(url) {
		  $('#img-0').attr('src', url);
		  
		}).catch(function(error) {
		  switch (error.code) {
			case 'storage/object_not_found':
			  // File doesn't exist
			  console.log('File doesn\'t exist');
			  break;

			case 'storage/unauthorized':
			  // User doesn't have permission to access the object
			  console.log('User doesn\'t have permission to access the object');
			  break;

			case 'storage/canceled':
			  // User canceled the upload
			  console.log('User canceled the upload');
			  break;

			case 'storage/unknown':
			  // Unknown error occurred, inspect the server response
			  console.log('Unknown error occurred, inspect the server response');
			  break;
		  }
		});
	}

})();
