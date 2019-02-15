var topics = ["Puppets", "Unicorns", "Dancing", "Tricycles", "Makeup", "Rolling", "Monster Trucks", "Bugeyes", "Yasssss", "Will Ferrell", "Dancing Babies", "Calculating", "Shaquille ONeil", "Typing Cats"];

// this function is allowing me to display the array above as buttons on the HTML
function buttonSelect() {
  $("#topic-view").empty();
  for (var i = 0; i < topics.length; i++) {
    var choice = $("<button>");
    choice.addClass("gif");
    choice.attr("data-name", topics[i]);
    choice.text(topics[i]);
    $("#topic-view").append(choice);
  }
}
buttonSelect();

// Adding click event listener to all buttons
$(".gif").on("click", function () {
  // Grabbing and storing the data-name property value from the button
  var chosen = $(this).attr("data-name");
  // Constructing a queryURL using the topic name
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=eZzkagxWq5nqa76kt0h8tGDtAk5EZMyj&q=" + chosen + "&limit=10&offset=0&rating=PG&lang=en";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>");
        p.text("Rating: " + results[i].rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifImage.attr("src", still);
        gifImage.attr("data-still", still);
        gifImage.attr("data-animate", animated);
        gifImage.attr("data-state", "still");
        gifImage.addClass("gif-image");

        gifImage.prepend(p);
        gifDiv.prepend(gifImage);
        $("#gifs-here").prepend(p);
        $("#gifs-here").prepend(gifImage);

      }

    });
});

// // still and animate logic
$(document).on('click', '.gif-image', function () {
  var state = $(this).attr("data-state");
  if (state === 'still') {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

// this code gets the input to show up as a button. still working on getting the API URL attached to this

$("#search").on("click", function (event) {
  $("#new-button").empty()
  // had to use the empty button as the input kept typing into the same button
  // event.preventDefault();
  // This line grabs the input from the textbox
  var newTopic = $("#search-input").eq(0).val();
  // var newGifButton = $("<button>");
  // newGifButton.addClass("gif");
  // newGifButton.attr("data-name", newTopic);
  // newGifButton.text(newTopic);
  $("#new-button").prepend(newTopic);
  if (newTopic.length > 2) {
    // topics.push(newTopic);

  }
  buttonSelect(topics, "search-input", "#gifs-box");

  {
    buttonSelect(topics, "search-input", "#gifs-box");


  };

});