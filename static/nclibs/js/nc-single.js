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
// Load
function CreateSinglePost(path){console.log(path);
  showProgressBar(90);
  var url;
  if ( path!=="") {url="./data/"+path+".xml";}
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
function loadPage() {
  if (window.location.hash != "") { // Load single/page
    CreateSinglePost(window.location.hash.replace("#",""));
    return ;
  };
  $("#post-content").hide();$("#main-content").show();
  // Load index page
  showProgressBar(100);
}

// Create
function getCtg(ctg) {
  return db.filter(function(d,i){return d[4]==ctg;})
}
function viDate(date) {
  var ds=new Date(date).toDateString().split(' ');
  if (ds.length !=4) {return 'unknow';}
  return ds[1]+' '+ds[2]+', '+ds[3];
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
  createProducts(10);

});