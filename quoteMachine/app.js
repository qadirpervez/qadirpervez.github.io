/*  Javascript Code for Random Quote Machine Game;
made for freeCodeCamp.

Owner: Qadir Pervez
*/

var data = {
  method: "getQuote",
  lang: "en" ,
  format:"jsonp",
  dataType: "jsonp"
};

var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
function getQuote(){

  $.getJSON(url, data, function(quotes) {
    $("#quoteContent").html(quotes.quoteText);
    if(quotes.quoteAuthor == ''){
      $("#author").html("Anonymous");
    } else {
      $("#author").html(quotes.quoteAuthor);
    }
    shareUrl = "https://twitter.com/intent/tweet?text="+quotes.quoteText;
    $("#share").attr("href", shareUrl)
  });

}























getQuote();
