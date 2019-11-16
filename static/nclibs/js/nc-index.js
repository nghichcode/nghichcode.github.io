var IMG_PATH = [
  'slider-1-1200x900.jpg',
  'recent-news-1-600x450.jpg',
  'slider-2-450x600.jpg',
  'slider-3-450x600.jpg',
  'crypto-news-1-600x450.jpg',
  'crypto-news-2-600x450.jpg',
  'crypto-news-4-600x450.jpg',
  'crypto-news-5-600x450.jpg',
  'crypto-news-6-600x450.jpg',
  'adult.jpg',
  'default-thumb-1.jpg',
  'default-thumb-2.jpg',
  'default-thumb-3.jpg'
  ];

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

function getCtg(ctg) {
  return db.filter(function(d,i){return d[4]==ctg;})
}
function viDate(date) {
  var ds=new Date(date).toDateString().split(' ');
  if (ds.length !=4) {return 'unknow';}
  return ds[1]+' '+ds[2]+', '+ds[3];
}
function createPosts(n) {
  $("#posts-bg").empty();$("#posts-sm").empty();
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  var id=df.next();
  var url=posts[id][4]+'/'+posts[id][5];
  var postsBg='<img src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts bg">'+
    '<a href="#'+url+'" class="h4 dplay-block pt-10 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
    '<small class="dplay-block color-lite-black pt-10 pt-sm-0 pb-5">'+
      'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+viDate(posts[id][2])+
    '</small>'+
    '<p class="dplay-block color-lite-black pt-10 pt-sm-0">'+posts[id][7]+'</p>';
  $("#posts-bg").append(postsBg);
  
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+'/'+posts[id][5];
    var tplt='<div class="oflow-hidden pos-relative mb-20 dplay-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts-sm">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="h5 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
        '<small class="dplay-block color-lite-black pt-10">'+
          'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+viDate(posts[id][2])+
        '</small>'+
      '</div>'+
    '</div>';

    $("#posts-sm").append(tplt);
  }

}
function createPostsMin(n) {
  $("#posts-min").empty();
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+'/'+posts[id][5];
    var tplt='<div class="mtb-20">'+
        '<a class="color-white" href="#'+url+'"><b>'+posts[id][0]+'</b></a>'+
        '<small class="dplay-block">'+viDate(posts[id][2])+'</small>'+
      '</div>'+
      '<div class="brdr-ash-1 opacty-2 mr-30"></div>';
    $("#posts-min").append(tplt);
  }

}
function createTuts(n) {
  $("#tuts").empty();
  var tuts = getCtg('tuts');
  var df = new DiffRand(0,tuts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=tuts[id][4]+'/'+tuts[id][5];
    var tplt='<div class="col-sm-6">'+
      '<div class="img-sm"><img class="wh-100" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts"></div>'+
      '<a class="dplay-block pt-10 h5 bl-yl-link" href="#'+url+'"><b>'+tuts[id][0]+'</b></a>'+
      '<small class="dplay-block color-lite-black mb-30">'+
        'by <a href="'+tuts[id][1]+'.html" class="bl-yl-link"><b>'+tuts[id][1]+',</b></a> '+viDate(tuts[id][2])+
      '</small>'+
    '</div>';
    // $(tplt).insertAfter("#tuts");
    $("#tuts").append(tplt);

  }
}
function createProducts(n) {
  $("#products").empty();var products = getCtg('products');
  var df = new DiffRand(0,products.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=products[id][4]+'/'+products[id][5];
    var tplt='<div class="oflow-hidden pos-relative mb-20 dplay-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="dplay-block h6 bl-yl-link"><b>'+products[id][0]+'</b></a>'+
        '<small class="dplay-block color-lite-black">'+
          'by <a href="'+products[id][1]+'.html" class="bl-yl-link"><b>'+products[id][1]+',</b></a> '+viDate(products[id][2])+
        '</small>'+
      '</div>'+
    '</div>';
    $("#products").append(tplt);
  }
}

$(document).ready(function(){
  loadPage();
  window.addEventListener('popstate', function(){loadPage();});
  createPosts(4);
  createProducts(10);
  createTuts(6);
  createPostsMin(2);

  function loadPage() {
    if (window.location.hash != "") { // Load single/page
      loadPost(window.location.hash.replace("#",""));
      var df = new DiffRand(36,db.length);
      for(var i=0; i<10; i++) { $("#sidebar").append(createSideBarItem(db[df.next()]) );  }
      return ;
    };
    $("#post-content").hide();$("#main-content").show();
    // Load index page

    var df = new DiffRand(1,db.length);
    for(var i=1; i<=36; i++){
      var article = createArticle(i,db[df.next()]);
      if (i%3==0) {article=article+'<br/>'};
      if (i<10) $("#postsz").append(article);
      else if (i<19) $("#productsz").append(article);
      else if (i<28) $("#samplesz").append(article);
      else {$("#tutsz").append(article);}
    }
    for(var i=1; i<db.length-36; i++){
      if (i%3==0) {article=article+'<br/>'};
      var sidebar = createSideBarItem(db[df.next()]);
      $("#sidebar").append(sidebar);
    }
    showProgressBar(100);
  }
});