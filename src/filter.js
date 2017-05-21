import Vue from 'vue'

Vue.filter('distanceFilter', function(val){
	
	val = Number(val);
	
	if(val < 1000){
		return val+'m';
	}
	
	//>=1000
	var newVal = Math.round(val/10);
	return newVal/100 + 'km';
	
})
