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
const IMG_DIR="./static/images/home/";
const SEP='$';
const CTG_DIR="category"+SEP;
showPBar(90);
// Create
function getCtg(ctg) {
  return db.filter(function(d,i){return d[4]===ctg;})
}
function PostData(images='',link='',title='',author='',date=''){
  this.images=IMG_DIR+images;this.link='#'+link;this.title=title;
  this.author=author;this.date=enDate(date);
};
// ==========END GLOB=============
// Load
function CreateSinglePage(ctg,page){
  var psts=getCtg(ctg);
  page=page-1<0?0:page;
  page=page+1<psts.length?page:psts.length-1;
  showPBar(90);

  var tpltMenu=''+
  '<a class="lnk-default" href="index.html">'+
    '<i class="fas fa-home"></i> Home <i class="ml-1 fas fa-chevron-right"></i>'+
  '</a>'+
  '<a class="lnk-default" href="#'+CTG_DIR+ctg+'"> '+ucFirst(ctg)+' Archive</a>';
  $("#page-menu").empty();$("#page-menu").append(tpltMenu);

  $("#r-title").empty();$("#r-title").append('<b>'+ctg.toUpperCase()+'</b>');

  var dfi = new DiffRand(0,IMG_PATH.length);
  const NUM_POSTS=10;
  $("#r-page").empty();
  for (var id=page*NUM_POSTS; id < ((page+1)*NUM_POSTS>=psts.length?psts.length:(page+1)*NUM_POSTS); id++) {
    var url=psts[id][4]+SEP+psts[id][5];
    tplt=''+
    '<div class="col-sm-6">'+
      '<img src="./static/images/home/'+IMG_PATH[dfi.next()]+'" alt="nc page img">'+
      '<a class="d-block pt-10 h5 bl-yl-link" href="#'+url+'">'+psts[id][0]+'</a>'+
      '<small class="d-block color-lite-black mb-30">'+
        'by <a href="'+psts[id][1]+'.html" class="bl-yl-link"><b>'+psts[id][1]+',</b></a> Jan 25, 2018'+
      '</small>'+
    '</div>';
    $("#r-page").append(tplt);
  }

  const prev=CTG_DIR+ctg+SEP+(page-1<0?0:page-1);
  const next=CTG_DIR+ctg+SEP+(page+1<psts.length?page+1:psts.length-1);
  const tpltnav=''+
    '<div class="d-block mb-md-50 mt-20 text-center">'+
      '<a class="btn btn-outline-warning mr-2" href="#'+prev+'"><b>PREVIOUS PAGE</b></a>'+
      '<a class="btn btn-outline-warning ml-2" href="#'+next+'"><b>NEXT PAGE</b></a>'+
    '</div>';
  $("#page-nav").empty();$("#page-nav").append(tpltnav);
  showPBar(100);
}

function CreateSinglePost(ctg,title){
  showPBar(90);
  var pst=getCtg(ctg);id=1;
  var url="./static/database/data/"+ctg+'/'+title+".xml";

  $.ajax({
    url:url,
    error:function(xhr){console.log(xhr.statusText);},
    success:function(result){
      const pst=new PostData(
        IMG_PATH[NCRand(0,IMG_PATH.length)],'',
        result.querySelector('nc-parent>nc-title').innerHTML,
        result.querySelector('nc-parent>nc-author>user-name').innerHTML,
        result.querySelector('nc-parent>nc-post-date').innerHTML
      );
      var tplt=''+
      '<div class="sgl-header">'+
        '<div class="ctg-entry">'+
          '<a href="#category'+SEP+ctg+'" rel="category tag">'+ctg.toUpperCase()+'</a>'+
        '</div>'+
        '<h1 class="mt-0 mb-1" style="font-family:serif;">'+pst.title+'</h1>'+
        '<div class="entry-meta">'+
          '<small class="c-lblack">by <a href="'+pst.author+'.html" class="bl-yl-link">'+
            '<b>'+pst.author+',</b>'+
          '</a> '+pst.date+'</small>'+
        '</div>'+
      '</div>'+
      '<div class="my-3"><img src="'+pst.images+'" class="wp-image" alt="nc image"></div>'+
      '<div class="mt-3"><br/></div>';

      $("#single-page").empty();
      $("#single-page").append(tplt);
      $("#single-page").append(result.getElementsByTagName("nc-content")[0].textContent);
      showPBar(100);
    }
  });
}

function createPosts(n) {
  $("#posts-bg").empty();$("#posts-sm").empty();
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  var id=df.next();
  var url=posts[id][4]+SEP+posts[id][5];
  var postsBg='<img src="./static/images/home/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts bg">'+
    '<a href="#'+url+'" class="h4 d-block pt-10 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
    '<small class="d-block c-lblack pt-10 pt-sm-0 pb-5">'+
      'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+enDate(posts[id][2])+
    '</small>'+
    '<p class="d-block c-lblack pt-10 pt-sm-0">'+posts[id][7]+'</p>';
  $("#posts-bg").append(postsBg);
  
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+SEP+posts[id][5]+SEP+id;
    var tplt='<div class="oflow-hidden pos-relative mb-20 d-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./static/images/home/'+IMG_PATH[dfi.next()]+'" alt="nghichcode posts-sm">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="h5 bl-yl-link"><b>'+posts[id][0]+'</b></a>'+
        '<small class="d-block c-lblack pt-10">'+
          'by <a href="'+posts[id][1]+'.html" class="bl-yl-link"><b>'+posts[id][1]+',</b></a> '+enDate(posts[id][2])+
        '</small>'+
      '</div>'+
    '</div>';

    $("#posts-sm").append(tplt);
  }
}
function createRecentPosts(n) {
  $("#recent-posts").empty();var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);

  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=posts[id][4]+SEP+posts[id][5];
    var tplt='<div class="mtb-20">'+
        '<a class="color-white" href="#'+url+'"><b>'+posts[id][0]+'</b></a>'+
        '<small class="d-block">'+enDate(posts[id][2])+'</small>'+
      '</div>'+
      '<div class="brdr-ash-1 opacty-2"></div>';
    $("#recent-posts").append(tplt);
  }
}
function createTuts(n) {
  $("#tuts").empty();var tuts = getCtg('tuts');
  var df = new DiffRand(0,tuts.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=tuts[id][4]+SEP+tuts[id][5];
    var tplt='<div class="col-sm-6">'+
      '<div class="img-sm"><img class="wh-100" src="./static/images/home/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts"></div>'+
      '<a class="d-block pt-10 h5 bl-yl-link" href="#'+url+'"><b>'+tuts[id][0]+'</b></a>'+
      '<small class="d-block c-lblack mb-30">'+
        'by <a href="'+tuts[id][1]+'.html" class="bl-yl-link"><b>'+tuts[id][1]+',</b></a> '+enDate(tuts[id][2])+
      '</small>'+
    '</div>';
    $("#tuts").append(tplt);
  }
}
function createProducts(n) {
  $("#products").empty();var products = getCtg('products');
  var df = new DiffRand(0,products.length);
  var dfi = new DiffRand(0,IMG_PATH.length);
  for (var i = 0; i < n; i++) {
    var id=df.next();
    var url=products[id][4]+SEP+products[id][5];
    var tplt='<div class="oflow-hidden pos-relative mb-20 d-block">'+
      '<div class="wh-100x abs-tlr">'+
        '<img class="thumb-border-fh" src="./static/images/home/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts">'+
      '</div>'+
      '<div class="ml-120 min-h-100x">'+
        '<a href="#'+url+'" class="d-block h6 bl-yl-link"><b>'+products[id][0]+'</b></a>'+
        '<small class="d-block c-lblack">'+
          'by <a href="'+products[id][1]+'.html" class="bl-yl-link"><b>'+products[id][1]+',</b></a> '+enDate(products[id][2])+
        '</small>'+
      '</div>'+
    '</div>';
    $("#products").append(tplt);
  }
}

function createGridPostsBg(post) {
  var p1=new PostData(
    IMG_PATH[0],post[4]+SEP+post[5],post[0],
    post[1],enDate(post[2])
  );
  $("#gp-1 [nc-src='images']").attr('src',p1.images);
  $("#gp-1 [nc-href='link']").attr('href',p1.link);
  $("#gp-1 [nc-text='title']").html(p1.title);
  $("#gp-1 [nc-href='author']").attr('href',p1.author+'.html');
  $("#gp-1 [nc-text='author']").html(p1.author);
  $("#gp-1 [nc-text='date']").html(p1.date);
}
function createGridPostsSm(post,hid) {
  var dfi = new DiffRand(0,IMG_PATH.length);
  var p=new PostData(
    IMG_PATH[dfi.next()],post[4]+SEP+post[5],post[0],
    post[1],enDate(post[2])
  );
  $("#gp-2"+hid+" [nc-src='images']").attr('src',p.images);
  $("#gp-2"+hid+" [nc-href='link']").attr('href',p.link);
  $("#gp-2"+hid+" [nc-text='title']").html(p.title);
  $("#gp-2"+hid+" [nc-text='date']").html(p.date);
}
function createGridPosts() {
  var posts = getCtg('posts');
  var df = new DiffRand(0,posts.length);
  createGridPostsBg(posts[df.next()]);
  for (var i = 0; i < 5; i++) {
    createGridPostsSm(posts[df.next()],i+1);
  }
}

$(document).ready(function(){
  window.addEventListener('popstate', function(e){route();});
  createGridPosts();
  createProducts(10);
  createRecentPosts(2);
  createPosts(4);
  createTuts(6);
  route();
});