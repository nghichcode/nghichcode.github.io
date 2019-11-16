showProgressBar(90);
function createArticle(i,article,url) {
    var url=article[4]+'/'+article[5];
    var img = '<img src="'
      +(article[6]==''?'./wp-content/img/default-thumb-'+ncRand(1,5)+'.jpg':article[6])
      +'" class="img-thumbnail wp-image" />';
    var title = '<h3><a href="#'+url+'" >'+article[0]+'</a></h3>';
    var details='<h4 style="position: relative;"><small><a href="./'+article[1]+'.html">'+article[1]+'</a></small>'
      +' <small style="position: absolute;right: 10px;">'+article[2].split(" ")[0]+'</small></h4>';
    var content = '<p>'+article[7]+'</p>';
    return '<div class="col-sm-4" '+((i%3==1)?'style="clear:left;"':'')+'>'+img+title+details+content+'</div>';
}
function createSideBarItem(article){
  var url=article[4]+'/'+article[5];
  return ('<h5>['+article[2].split(" ")[0]
      +'] : <a href="#'+url
      +'" >'
      +article[0]+'</a></h5>');
}
function loadPost(path){
  showProgressBar(90);
  var url;
  if ( (typeof path) === "string") {url="./data/"+path+".xml";}
  else {console.log("Err");return;}
  $.ajax({
    url:url,
    error:function(xhr){console.log(xhr.statusText);},
    success:function(result){
      $("#main-content").hide();$("#post-content").empty();$("#post-content").show();
      $("#post-content").append(result.getElementsByTagName("nc-content")[0].textContent);
      showProgressBar(100);
    }
  });
}

$(document).ready(function(){
  loadPage();
  window.addEventListener('popstate', function(){loadPage();});

  function loadPage() {
    if (window.location.hash != "") {
      loadPost(window.location.hash.replace("#",""));
      var df = new DiffRand(36,db.length);
      for(var i=0; i<10; i++) { $("#sidebar").append(createSideBarItem(db[df.next()]) );  }
      return ;
    };
    $("#post-content").hide();$("#main-content").show();
    // Load index page
    var df = new DiffRand(1,db.length);console.log(df);
    for(var i=1; i<=36; i++){
      var article = createArticle(i,db[df.next()]);
      if (i%3==0) {article=article+'<br/>'};
      if (i<10) $("#posts").append(article);
      else if (i<19) $("#products").append(article);
      else if (i<28) $("#samples").append(article);
      else {$("#tuts").append(article);}
    }
    for(var i=1; i<db.length-36; i++){
      if (i%3==0) {article=article+'<br/>'};
      var sidebar = createSideBarItem(db[df.next()]);
      $("#sidebar").append(sidebar);
    }
    showProgressBar(100);
  }
});