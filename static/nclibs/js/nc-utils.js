'use strict';

function NCRand(s,e){return (s + Math.floor(Math.random()*e));};
function DiffRand(s,e){
  if (s>e) {console.warn("S>E");return;}
  this.ars=[];this.s=0;this.e=0;

  this.init=function(s,e) {this.s=s;this.e=e;this.reset();for(var i=s;i<e;i++){this.ars.push(i);} };
  this.NCRand=NCRand;
  this.next=function() {
    if (this.ars.length<1) {this.init(this.s,this.e);console.warn("RS",this.ars);}
    var r=this.NCRand(0,this.ars.length);var rv=this.ars[r];this.ars=this.ars.filter(function(v,i){return i!=r;});return rv;
  };
  this.reset=function() {this.ars=[];};
  this.init(s,e);
}
function showPBar(per) {
  $(".nav-progress-bar").css({"opacity":1,"visibility":"visible","width":per+"%"});
  if (per === 100) {setTimeout(function(){ $(".nav-progress-bar").attr({"style":""}); }, 1600);}
}
function enDate(date) {
  var ds=new Date(date).toDateString().split(' ');
  if (ds.length !=4) {return 'unknow';}
  return ds[1]+' '+ds[2]+', '+ds[3];
}
function ucFirst(st) { return st.charAt(0).toUpperCase() + st.slice(1); }