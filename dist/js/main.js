class DBHelper{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(e){showCachedRestaurants().then(t=>{0!=t.length?e(null,t):fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})}).catch(t=>{console.log(t),fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})})}static fetchRestaurantById(e,t){showCachedRestaurant(e).then(n=>{null!=n?t(null,n):fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(e=>{t(null,e),addRestaurantsToCache(e)}).catch(e=>{console.log(e),t(e,null)})}).catch(n=>{console.log(n),fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(e=>{t(null,e),addRestaurantsToCache(e)}).catch(e=>{console.log(e),t(e,null)})})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((n,s)=>{if(n)t(n,null);else{const n=s.filter(t=>t.cuisine_type==e);t(null,n)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((n,s)=>{if(n)t(n,null);else{const n=s.filter(t=>t.neighborhood==e);t(null,n)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,n){DBHelper.fetchRestaurants((s,a)=>{if(s)n(s,null);else{let s=a;"all"!=e&&(s=s.filter(t=>t.cuisine_type==e)),"all"!=t&&(s=s.filter(e=>e.neighborhood==t)),n(null,s)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].neighborhood),s=t.filter((e,n)=>t.indexOf(e)==n);e(null,s)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].cuisine_type),s=t.filter((e,n)=>t.indexOf(e)==n);e(null,s)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/img/${e.photograph}`}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}}let restaurants,neighborhoods,cuisines;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,s=t.selectedIndex,a=e[n].value,r=t[s].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(a,r,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())});const l=t.querySelector("option[aria-selected='true']");l&&l.removeAttribute("aria-selected");const o=e.querySelector("option[aria-selected='true']");o&&o.removeAttribute("aria-selected"),t[s].setAttribute("aria-selected","true"),e[n].setAttribute("aria-selected","true")}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),createRestaurantHTML=(e=>{const t=document.createElement("li"),n=document.createElement("div");n.className="restaurant-item",t.append(n);const s=document.createElement("img");s.className="restaurant-img",s.setAttribute("alt",e.name+" restaurant image"),s.src="/img/"+e.id+"-300w.jpg",s.setAttribute("srcset","/img/"+e.id+"-300w.jpg 300w, /img/"+e.id+"-400w.jpg 400w"),s.setAttribute("sizes","(max-width: 450px) 300px, (max-width: 650px) 400px, (max-width: 875px) 300px, (max-width: 1000px) 400px, 300px"),n.append(s);const a=document.createElement("h3");a.innerHTML=e.name,n.append(a);const r=document.createElement("p");r.innerHTML=e.neighborhood,n.append(r);const l=document.createElement("p");l.innerHTML=e.address,n.append(l);const o=document.createElement("a");return o.innerHTML="View Details",o.href=DBHelper.urlForRestaurant(e),n.append(o),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})});