const route_param=[
	/category(.)*/
];

function route() {
	const sstrn='/nghichcode.github.io/';
	const haspn=window.location.pathname.search(sstrn);
  var hpath=window.location.hash.replace("#","");
	const hasht=hpath.search('.html');
	if (hasht>=0) {hpath=hpath.split(SEP).pop();}
  const hostn=window.location.host;
  if (haspn>=0) {
  	window.history.pushState({},null,window.location.protocol+'//'+hostn+sstrn+hpath);
  } else {
  	window.history.pushState({},null,window.location.protocol+'//'+hostn+'/'+hpath);
  }

  if (hpath == "") {
  	// Load index page
  	$("#banner").show();$("#grid-posts").show();
  	$("#single-page").hide();$("#home-page").show();
	} else {
  	$("#banner").hide();$("#grid-posts").hide();
  	$("#single-page").show();$("#home-page").hide();
	  // Load single/page
    var pdt=hpath.split(SEP);
    if (hpath.search(route_param[0])>=0) {
    	CreateSinglePage(pdt[1],pdt.length===3?parseInt(pdt[2]):0);
    } else {
    	if (pdt.length===2) { CreateSinglePost(pdt[0],pdt[1]); }
    }
    return ;
  };
  showPBar(100);
}
// Home page
// ""
// Single Page route
// "category"
// "category>cate"
// "category>cate>id"
// Single Post route
// "cate>title"
// 
