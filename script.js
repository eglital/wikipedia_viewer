$(document).ready(function(){

  /*Enter and search button functionality*/
 $("#submit").on("click", submit);
 $("#searchfield").on("keydown", submit);
 $("#searchfield").on("keydown", function(e){
   if (e.which == 13) {
     $("#searchfield").autocomplete("close");
   }
 });
  /*random search function*/
  $("#random").on("click", function(){  window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  /*implement autocomplete funcionality*/
  $("#searchfield").autocomplete({
   delay: 100,
    source: function(request, response) {
      $.ajax({
        url: "http://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          response(data[1]);
        }
      });
    }
  });

  /*set input submit function */
  function submit(e) {
    if (e.which == 13 || e.type == "click") {

      $(".article").empty();
      var title = $("#searchfield").val();
      title.replace(" ", "_");

      //generate wiki url
      var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=extracts&exlimit=max&explaintext&exintro&exsentences=2&gsrsearch=" + title + "&callback=?";
      //access API data

      $.getJSON(url, function(data){
        $.each(data.query.pages, function(i, item){
          var pageUrl = "<a target='_blank' href='http://en.wikipedia.org/?curid=" + item.pageid + "'>" + item.title + "</a>";
          console.log(pageUrl);
          $(".article").append("<li><h3>" + pageUrl + "</h3>" + item.extract + "</li>");
        });
      });
    }
  }
});