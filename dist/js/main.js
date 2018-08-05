class DBHelper{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(e){showCachedRestaurants().then(t=>{10==t.length?e(null,t):fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),fetch("http://localhost:1337/reviews/").then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),t.forEach(t=>{const n=e.filter(e=>e.restaurant_id==t.id);t.reviews=n}),addRestaurantsToCache(t)})}).catch(t=>{console.log(t),e(t,null)})}).catch(t=>{console.log(t),fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),fetch("http://localhost:1337/reviews/").then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),t.forEach(t=>{const n=e.filter(e=>e.restaurant_id==t.id);t.reviews=n}),addRestaurantsToCache(t)})}).catch(t=>{console.log(t),e(t,null)})})}static fetchRestaurantById(e,t){showCachedRestaurant(e).then(n=>{null!=n?t(null,n):fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(n=>{fetch(`http://localhost:1337/reviews/?restaurant_id=${e}`).then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),n.reviews=e,t(null,n),addRestaurantsToCache(n)})}).catch(e=>{console.log(e),t(e,null)})}).catch(n=>{console.log(n),fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(n=>{fetch(`http://localhost:1337/reviews/?restaurant_id=${e}`).then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),n.reviews=e,t(null,n),addRestaurantsToCache(n)})}).catch(e=>{console.log(e),t(e,null)})})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((n,a)=>{if(n)t(n,null);else{const n=a.filter(t=>t.cuisine_type==e);t(null,n)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((n,a)=>{if(n)t(n,null);else{const n=a.filter(t=>t.neighborhood==e);t(null,n)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,n){DBHelper.fetchRestaurants((a,s)=>{if(a)n(a,null);else{let a=s;"all"!=e&&(a=a.filter(t=>t.cuisine_type==e)),"all"!=t&&(a=a.filter(e=>e.neighborhood==t)),n(null,a)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].neighborhood),a=t.filter((e,n)=>t.indexOf(e)==n);e(null,a)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].cuisine_type),a=t.filter((e,n)=>t.indexOf(e)==n);e(null,a)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/img/${e.photograph}`}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}static readableTime(e){if(Number.isInteger(e)){const t=new Date(e),n=t.getDate();return t.toLocaleString("en-us",{month:"long"})+" "+n+", "+t.getFullYear()}{const t=e,n=t.getDate();return t.toLocaleString("en-us",{month:"long"})+" "+n+", "+t.getFullYear()}}}let restaurants,neighborhoods,cuisines;var map,markers=[];document.addEventListener("DOMContentLoaded",e=>{fetchNeighborhoods(),fetchCuisines()}),fetchNeighborhoods=(()=>{DBHelper.fetchNeighborhoods((e,t)=>{e?console.error(e):(self.neighborhoods=t,fillNeighborhoodsHTML())})}),fillNeighborhoodsHTML=((e=self.neighborhoods)=>{const t=document.getElementById("neighborhoods-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),fetchCuisines=(()=>{DBHelper.fetchCuisines((e,t)=>{e?console.error(e):(self.cuisines=t,fillCuisinesHTML())})}),fillCuisinesHTML=((e=self.cuisines)=>{const t=document.getElementById("cuisines-select");e.forEach(e=>{const n=document.createElement("option");n.innerHTML=e,n.value=e,t.append(n)})}),window.initMap=(()=>{self.map=new google.maps.Map(document.getElementById("map"),{zoom:12,center:{lat:40.722216,lng:-73.987501},scrollwheel:!1}),updateRestaurants()}),updateRestaurants=(()=>{const e=document.getElementById("cuisines-select"),t=document.getElementById("neighborhoods-select"),n=e.selectedIndex,a=t.selectedIndex,s=e[n].value,r=t[a].value;DBHelper.fetchRestaurantByCuisineAndNeighborhood(s,r,(e,t)=>{e?console.error(e):(resetRestaurants(t),fillRestaurantsHTML())});const o=t.querySelector("option[aria-selected='true']");o&&o.removeAttribute("aria-selected");const l=e.querySelector("option[aria-selected='true']");l&&l.removeAttribute("aria-selected"),t[a].setAttribute("aria-selected","true"),e[n].setAttribute("aria-selected","true")}),resetRestaurants=(e=>{self.restaurants=[],document.getElementById("restaurants-list").innerHTML="",self.markers.forEach(e=>e.setMap(null)),self.markers=[],self.restaurants=e}),fillRestaurantsHTML=((e=self.restaurants)=>{const t=document.getElementById("restaurants-list");e.forEach(e=>{t.append(createRestaurantHTML(e))}),addMarkersToMap()}),createRestaurantHTML=(e=>{const t=document.createElement("li"),n=document.createElement("div");n.className="restaurant-item",t.append(n);const a=document.createElement("img");a.className="restaurant-img",a.setAttribute("alt",e.name+" restaurant image"),a.src="/img/"+e.id+"-300w.webp",a.setAttribute("srcset","/img/"+e.id+"-300w.webp 300w, /img/"+e.id+"-400w.webp 400w"),a.setAttribute("sizes","(max-width: 450px) 300px, (max-width: 650px) 400px, (max-width: 875px) 300px, (max-width: 1000px) 400px, 300px"),n.append(a);const s=document.createElement("h3");s.innerHTML=e.name,n.append(s);const r=document.createElement("p");r.innerHTML=e.neighborhood,n.append(r);const o=document.createElement("p");o.innerHTML=e.address,n.append(o);const l=document.createElement("a");return l.innerHTML="View Details",l.href=DBHelper.urlForRestaurant(e),n.append(l),t}),addMarkersToMap=((e=self.restaurants)=>{e.forEach(e=>{const t=DBHelper.mapMarkerForRestaurant(e,self.map);google.maps.event.addListener(t,"click",()=>{window.location.href=t.url}),self.markers.push(t)})});