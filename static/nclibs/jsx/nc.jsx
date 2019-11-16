
var tuts = getCtg('tuts');
var df = new DiffRand(0,tuts.length);
var dfi = new DiffRand(0,IMG_PATH.length);
for (var i = 0; i < n; i++) {
  var id=df.next();
  var url=tuts[id][4]+'/'+tuts[id][5];
  var tplt='<div class="col-sm-6">'+
    '<div class="img-sm"><img class="wh-100" src="./wp-content/img/'+IMG_PATH[dfi.next()]+'" alt="nghichcode tuts"></div>'+
    '<a class="dplay-block pt-10 h5 bl-yl-link" href="#'+url+'"><b>'+tuts[id][0]+'</b></a>'+
    '<small class="dplay-block c-lblack mb-30">'+
      'by <a href="'+tuts[id][1]+'.html" class="bl-yl-link"><b>'+tuts[id][1]+',</b></a> '+enDate(tuts[id][2])+
    '</small>'+
  '</div>';
  // $(tplt).insertAfter("#tuts");
  $("#tuts").append(tplt);
}

const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('tuts'));