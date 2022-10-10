function test_print(){

  console.log(“test code”)

}

$(function() {
   //Get 
   $('#get-button').on('click', function() {
      //TODO: get all users' IDs & display it
      $.ajax({
        method: 'GET',
        url: '/tweets',
        contentType: 'application/json',
        success: function(response) {
          
          var tbodyEl = $('#namebody');
          tbodyEl.html('');

          response.tweetinfo.forEach(function(tweet) {
            tbodyEl.append('\
              <tr>\
                <td class="id">' + tweet.user.id + '</td>\
                <td class="screen_name">' + tweet.user.screen_name + '</td>\
                <td class="name">' + tweet.user.name + '</td>\
              </tr>\
        ');
      });
    }
  });
});
    

    //Get tweets
    $('#get-tweets-button').on('click', function(){
        //TODO: get tweet info and display it
        $.ajax({
          method: 'GET',
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            
            var tbodyEl = $('#tweetbody');
            tbodyEl.html('');
  
            response.tweetinfo.forEach(function(tweet) {
              tbodyEl.append('\
                <tr>\
                  <td class="id">' + tweet.id + '</td>\
                  <td class="text">' + tweet.text + '</td>\
                  <td class="created_at">' + tweet.created_at + '</td>\
                </tr>\
          ');
        });
      }
    });
    });


    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {
        //TODO: get a searched tweet(s) & display it
        $.ajax({
          method: 'GET',
          url: '/searchinfo',
          contentType: 'application/json',
          success: function(response) {
            
            var tbodyEl = $('#searchbody');
            tbodyEl.html('');
  
            response.tweetSearched.forEach(function(tweet) {
              tbodyEl.append('\
                <tr>\
                  <td class="id">' + tweet.id + '</td>\
                  <td class="text">' + tweet.text + '</td>\
                  <td class="created_at">' + tweet.created_at + '</td>\
                </tr>\
          ');
        });
      }
    });
    });


  //CREATE
  $('#create-form').on('submit', function(event){
        event.preventDefault();

        var createInput = $('#create-input');
        var inputArray = createInput.val();
        const splitArray = inputArray.split(';');

        //TODO: creat a tweet
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ id: splitArray[0], text: splitArray[1] }),
          
          success: function(response) {
              console.log(response);
              createInput.val('');
              $('#get-tweets-button').click();
          }
      });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
  
    //TODO: search a tweet and display it.
    $.ajax({
      url: '/searchinfo',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ id: userID.val() }),
      
      success: function(response) {
          console.log(response);
          userID.val('');
          $('#get-searched-tweets').click();
      }
  });
});

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){
    event.preventDefault();
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var name = parsedStrings[0];
    var newName = parsedStrings[1]; 
    
    //TODO: update a tweet
    $.ajax({
      url: '/tweets/' + name,
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newName: newName }),
      success: function(response) {
          console.log(response);
          updateInput.val('');
          $('#get-button').click();
      }
  });
  });


  //DELETE
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input');
    event.preventDefault();
    
    //TODO: delete a tweet
    $.ajax({
      url: '/tweetinfo/' + id.val(),
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
          console.log(response);
          id.val('');
          $('#get-tweets-button').click();
      }
  });
  });
});


                    
   