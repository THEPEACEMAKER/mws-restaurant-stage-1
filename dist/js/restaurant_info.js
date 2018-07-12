let restaurant;var map;window.initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})}),fetchRestaurantFromURL=(e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");t?DBHelper.fetchRestaurantById(t,(t,n)=>{self.restaurant=n,n?(fillRestaurantHTML(),e(null,n)):console.error(t)}):(error="No restaurant id in URL",e(error,null))}),fillRestaurantHTML=((e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name,document.getElementById("restaurant-address").innerHTML=e.address;const t=document.getElementById("restaurant-img");t.className="restaurant-img",t.setAttribute("alt",e.name+" restaurant image"),t.src="/img/"+e.id+"-600w.jpg",t.setAttribute("srcset","/img/"+e.id+"-300w.jpg 300w, /img/"+e.id+"-400w.jpg 400w, /img/"+e.id+"-600w.jpg 600w"),t.setAttribute("sizes","(max-width: 713px) 600px, (max-width: 830px) 300px, (max-width: 1125px) 400px, 600px"),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML()}),fillRestaurantHoursHTML=((e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let n in e){const a=document.createElement("tr"),r=document.createElement("td");r.innerHTML=n,a.appendChild(r);const l=document.createElement("td");l.innerHTML=e[n],a.appendChild(l),t.appendChild(a)}}),fillReviewsHTML=((e=self.restaurant.reviews)=>{const t=document.getElementById("reviews-container"),n=document.createElement("h3");if(n.innerHTML="Reviews",t.appendChild(n),!e){const e=document.createElement("p");return e.innerHTML="No reviews yet!",void t.appendChild(e)}const a=document.getElementById("reviews-list");e.forEach(e=>{a.appendChild(createReviewHTML(e))}),t.appendChild(a)}),createReviewHTML=(e=>{const t=document.createElement("li"),n=document.createElement("div");n.setAttribute("class","reviewHeader"),t.appendChild(n);const a=document.createElement("p");a.innerHTML=e.name,a.setAttribute("class","reviewName"),n.appendChild(a);const r=document.createElement("p");r.innerHTML=e.date,r.setAttribute("class","reviewDate"),n.appendChild(r);const l=document.createElement("p");l.innerHTML=`Rating: ${e.rating}`,l.setAttribute("class","reviewRating"),t.appendChild(l);const s=document.createElement("p");return s.innerHTML=e.comments,s.setAttribute("class","reviewBody"),t.appendChild(s),t}),fillBreadcrumb=((e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),n=document.createElement("li");n.innerHTML=e.name,t.appendChild(n)}),getParameterByName=((e,t)=>{t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const n=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null});class DBHelper{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(e){showCachedRestaurants().then(t=>{0!=t.length?e(null,t):fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})}).catch(t=>{console.log(t),fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})})}static fetchRestaurantById(e,t){showCachedRestaurant(e).then(n=>{null!=n?t(null,n):fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(e=>{t(null,e),addRestaurantsToCache(e)}).catch(e=>{console.log(e),t(e,null)})}).catch(n=>{console.log(n),fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(e=>{t(null,e),addRestaurantsToCache(e)}).catch(e=>{console.log(e),t(e,null)})})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((n,a)=>{if(n)t(n,null);else{const n=a.filter(t=>t.cuisine_type==e);t(null,n)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((n,a)=>{if(n)t(n,null);else{const n=a.filter(t=>t.neighborhood==e);t(null,n)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,n){DBHelper.fetchRestaurants((a,r)=>{if(a)n(a,null);else{let a=r;"all"!=e&&(a=a.filter(t=>t.cuisine_type==e)),"all"!=t&&(a=a.filter(e=>e.neighborhood==t)),n(null,a)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].neighborhood),a=t.filter((e,n)=>t.indexOf(e)==n);e(null,a)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,n)=>{if(t)e(t,null);else{const t=n.map((e,t)=>n[t].cuisine_type),a=t.filter((e,n)=>t.indexOf(e)==n);e(null,a)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/img/${e.photograph}`}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}}