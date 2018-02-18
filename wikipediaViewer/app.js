/*
FCC PROJECT WIKIPEDIA VIEWER
developed by Qadir Pervez
*/
function checkBlank(){
  searchText = $("#searchText").val();
  if(searchText == ''){
    $("#wikiData").fadeOut(300);
    // $("#wikiData").html('');
  } else if(searchText.length > 5){
    searchWiki();
  }
}
window.url = "https://crossorigin.me/https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=";
link = "https://en.wikipedia.org/?curid=";
function searchWiki(){
  searchText = $("#searchText").val();
  if(searchText != ''){
    wikiApi = url + searchText;
    $.getJSON(wikiApi, function ( data ){
      $("#wikiData").html('');
      // window.data = data;
      // console.log(data);
      if(data.query === undefined){
        let html = `<a class="col-md-12" target="_blank" href="#">
        <div>
        <h1>Not Found</h1>
        <p>The query you searched for has no results on wikipedia.</p>
        </div>
        </a>`;
        $("#wikiData").append(html);
        return;
      }
      var pages = data.query.pages;

      for (var k in pages){
        if (pages.hasOwnProperty(k)) {
          let pageUrl = link + pages[k].pageid;
          let html = `<a class="col-lg-12 col-md-12 col-sm-12 col-xs-12 animation" target="_blank" href="`+pageUrl+`">
          <div>
          <h1>`+pages[k].title+`</h1>
          <p>`+pages[k].extract+`</p>
          </div>
          </a>`;
          $("#wikiData").append(html);
          $("#wikiData").show();
        }
      }
    });
  }
}
$(document).keypress(function(e) {
    if(e.which == 13) {
        searchWiki();
    }
});
