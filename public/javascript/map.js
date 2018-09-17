function initMap(){
        let options = {
            zoom: 10,
            center: {
                lat:37.7076595, 
                lng: -97.3112780
            }
        }
        //New map
        let map = new google.maps.Map(document.getElementById('map'), options);
        
        //Add marker
        let marker = new google.maps.Marker({
            position: {lat: 37.7076595, lng: -97.3112780},
            map:map 
        });
        
        let infoWindow = new google.maps.InfoWindow({
            content: '<h3>St James Missionary Baptist Church</h3>' +
                '<div class="info-content">' +
                '<p> 1350 North Ash Wichita, KS  67214</p>'
            
        });
        
        marker.addListener('click', function(){
           infoWindow.open(map, marker); 
        });
    }
    
    
