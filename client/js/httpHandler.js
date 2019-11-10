(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //build get ajax
  setInterval(() => {
    $.ajax({
      type: 'GET',
      url: serverUrl,
      data: {},
      // cache: false,
      contentType: false,
      // processData: false,
      success: (data) => {
        // get some information from server
        //console.log('GET success.');
        // console.log(data);
        SwimTeam.move(data);
        // reload the page
        //window.location = window.location.href;
      },
      error: () => {
        console.error = ('Could not finish GET for swim command.');
      }
    });
  }, 200);

  //HAVE another GET request onLoad that will get the current image stored on server
  // and load it to the background

  setInterval(() => {
    $.ajax({
      type: 'GET',
      // url: serverUrl,
      url: 'http://127.0.0.1:3000/background.jpg',
      data: {},
      // cache: false,
      contentType: 'image',
      // processData: false,
      success: (data) => {
        // get some information from server
        console.log(data);
        // reload the page
        window.location = window.location.href;
      },
      error: () => {
        console.error = ('Could not finish GET for image.');
      }
    });
  }, 5000);

  // callback function: a GET request that requests images

  // on page load: call callback function for GET image



  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl,
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // reload the page
        //after Posting, we need to GET the newly posted img to the background so
        //run the GEt request for img callback
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });


})();
