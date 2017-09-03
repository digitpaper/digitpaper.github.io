
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
		
		$("#uploadBtn").click(function(){
			//var userId = user.userId;
			console.log(defaultApp);
			//writeUserData(userId, imageId) 
		});
		
		$('#imgToUpload').change(function(){
    		var file = this.files[0];
    		uploadImage(storage, file);
    	});
		
	});
	

	function signOut(){
		firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  window.location.href = "signin.html";
		}, function(error) {
		  // An error happened.
		});
	}
	
	function uploadImage(storage, file) {
		
		var storageRef = storage.ref();
		
		// File or Blob named mountains.jpg
		var file = file;
		var name = file.name;
		var size = file.size;
		var type = file.type;

		// Create the file metadata
		var metadata = {
		  contentType: type
		};

		// Upload file and metadata to the object 'images/mountains.jpg'
		var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
		  function(snapshot) {
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
			  case firebase.storage.TaskState.PAUSED: // or 'paused'
				console.log('Upload is paused');
				break;
			  case firebase.storage.TaskState.RUNNING: // or 'running'
				console.log('Upload is running');
				break;
			}
		  }, function(error) {
		  switch (error.code) {
			case 'storage/unauthorized':
			  // User doesn't have permission to access the object
			  console.log('User doesn\'t have permission to access the object');
			  break;

			case 'storage/canceled':
			  // User canceled the upload
			  console.log(' User canceled the upload');
			  break;

			case 'storage/unknown':
			  // Unknown error occurred, inspect error.serverResponse
			  console.log('Unknown error occurred, inspect error.serverResponse');
			  break;
		  }
		}, function() {
		  // Upload completed successfully, now we can get the download URL
		  var downloadURL = uploadTask.snapshot.downloadURL;
		  console.log('Upload completed successfully [' + downloadURL + ']');
		  $("#uploadedImg").attr('src', downloadURL);
		});
	}

})();
