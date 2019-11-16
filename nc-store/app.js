var app=angular.module('ncStore');
app.controller("StoreControl", function($scope) {
	$scope.products = JSON.parse('[{"productId":2,"qrCode":"0893601736000","itemName":"TƯƠNG ỚT CHIN-SU MỚI","commonName":"Tuong ot Trung Thanh - 0","price":4000,"keycode":"GTIN","gtn":"8936017360009","partyName":"Công ty Cổ phần Hàng tiêu dùng Masan","description":"Tuong ot chin su","trusted":true},{"productId":3,"qrCode":"0893601736001","itemName":"TƯƠNG ỚT CHIN-SU MỚI","commonName":"Tuong ot Trung Thanh - 1","price":45000,"keycode":"GTIN","gtn":"8936017360009","partyName":"Công ty Cổ phần Hàng tiêu dùng Masan","description":"Tuong ot chin su","trusted":true}]');
	// $.get("products.json",function(res){
	// 	for (var i = 0; i < res.length; i++) {
	// 		res[i].rChar=String.fromCharCode(Math.floor(Math.random()*26+65));
	// 	};
	// 	console.log(res);
	// 	$scope.products = res;
	// });
});
$.get("products.json",function(res){
	app.controller("StoreControl", function($scope) {
		for (var i = 0; i < res.length; i++) {
			res[i].rChar=String.fromCharCode(Math.floor(Math.random()*26+65));
		};
		console.log(res);
		$scope.products = res;
	});
});