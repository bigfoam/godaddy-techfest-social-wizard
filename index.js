$( document ).ready(function() {
  console.log( 'ready!' );

  var appendContent = $('<div/>', {
    className: 'foobar',
    html: 'review 1'
  });

  $.ajax( {
    type:'Get',
    dataType: 'json',

    url:'http://localhost:3000/api/yelp/techfests-diner-phoenix/reviews',
    success:function(data) {
      console.log(data);
      parseData(data);
      $('#review-loader').hide();
    }
  });

  //pop up window when click on the plus button
  popUpWindow('plusModal', 'addbtn', 0);
  popUpWindow('add_social_media_modal', 'to-add', 1);
  closeWindow('plusModal', 'add_social_media_modal');

  attachWidgetPicture();
  attachSocialMediaPicture();
});

function parseData(jsonData) {
  const data = jsonData.data;

  for (var i = 0; i < data.length; i++) {
    var review = data[i];
    appendReview(review);
  }

  console.log( 'end!' );
}

function appendReview(review) {
  console.log( 'appendReview!' );

  var pic = document.createElement("IMG");
  pic.setAttribute("src", 'http://' + review.avatarLink);
  pic.setAttribute("width", "30");
  pic.setAttribute("width", "22");
  pic.setAttribute("class", "profile-pic");

  var content = $('<div/>', {
    id: review.commentId,
    html: pic
  });

  var reviewContent = document.createElement("span");
  var className = 'review-content';
  if (review.rating <= 2) {
    className += ' review-highlight';
  }

  reviewContent.setAttribute("class", className);
  reviewContent.innerHTML = review.comment;

  content.append(reviewContent);


  const htmlContent = $('<div/>', {
    class: 'reviews-list',
    id: review.commentId,
    html: content
  });

  $("#latest-reviews").append(htmlContent);
}

function popUpWindow(modalId, buttonId, index) {
  // Get the modal
  var modal = document.getElementById(modalId);
  // Get the button that opens the modal
  var btn = document.getElementById(buttonId);
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[index];
  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

// When the user clicks anywhere outside of the modal, close it
function closeWindow(modalId, modalId2) {
  var modal = document.getElementById(modalId);
  var modal2 = document.getElementById(modalId2);

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    } else if (event.target == modal2) {
      modal2.style.display = "none";
    }
  }
}


function attachWidgetPicture() {
  var flareBtn = document.getElementById('addFlareBtn');
  var btn = document.getElementById("addbtn");

  flareBtn.onclick = function() {

    //disable the addBtn
    btn.onclick = function() {
        return false;
    };
    $("#addbtn").css('background-image', 'url(2-az.jpg)');
  };

  var weiboBtn = document.getElementById('addWeiboBtn');
  weiboBtn.onclick = function() {
    btn.onclick = function() {
        return false;
    };
    $("#addbtn").css('background-image', 'url(3-az.jpg)');
  }
}

function attachSocialMediaPicture() {
  var googleBtn = document.getElementById('addGooglePlusBtn');
  var btn = document.getElementById("to-add");

  googleBtn.onclick = function() {

    //disable the addBtn
    btn.onclick = function() {
      return false;
    };

    $("#to-add").css('background-image', 'url(2-az.jpg)');
  }
}
