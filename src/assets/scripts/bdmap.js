export default{
  loadmapjs() {
    return new Promise(function (resolve, reject) {
      if(!window.BMap){
        window.initmap = function () {
          resolve(BMap);
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://api.map.baidu.com/api?v=2.0&ak=DlKzTQnuPu0gqUtOvuCoKuE0&callback=initmap";
        script.onerror = reject;
        document.head.appendChild(script);
      }else{
        resolve(BMap);
      }
    })
  },
  getBaiduPos(suc,err){
    this.loadmapjs().then(BMap=>{
      let geolocation = new BMap.Geolocation();
  		geolocation.getCurrentPosition(function(r){
  			if(this.getStatus() == BMAP_STATUS_SUCCESS){
  				suc({lng:r.point.lng,lat:r.point.lat})
  			}
  			else {
  				err(this.getStatus());
  			}
  		},{enableHighAccuracy: true})
    });
	}
}
