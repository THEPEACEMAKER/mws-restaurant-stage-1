class DBHelper{static get DATABASE_URL(){return"http://localhost:1337/restaurants"}static fetchRestaurants(e){showCachedRestaurants().then(t=>{null!=t?e(null,t):fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})}).catch(t=>{console.log(t),fetch(DBHelper.DATABASE_URL).then(e=>e.json()).then(t=>{e(null,t),addRestaurantsToCache(t)}).catch(t=>{console.log(t),e(t,null)})})}static fetchRestaurantById(e,t){showCachedRestaurant(e).then(a=>{null!=a?t(null,a):fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(a=>{fetch(`http://localhost:1337/reviews/?restaurant_id=${e}`).then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),a.reviews=e,t(null,a),addRestaurantToCache(a)})}).catch(e=>{console.log(e),t(e,null)})}).catch(a=>{console.log(a),fetch(DBHelper.DATABASE_URL+`/${e}`).then(e=>e.json()).then(a=>{fetch(`http://localhost:1337/reviews/?restaurant_id=${e}`).then(e=>e.json()).then(e=>{e.forEach(e=>{const t=DBHelper.readableTime(e.updatedAt);e.updatedAt=t}),a.reviews=e,t(null,a),addRestaurantToCache(a)})}).catch(e=>{console.log(e),t(e,null)})})}static fetchRestaurantByCuisine(e,t){DBHelper.fetchRestaurants((a,n)=>{if(a)t(a,null);else{const a=n.filter(t=>t.cuisine_type==e);t(null,a)}})}static fetchRestaurantByNeighborhood(e,t){DBHelper.fetchRestaurants((a,n)=>{if(a)t(a,null);else{const a=n.filter(t=>t.neighborhood==e);t(null,a)}})}static fetchRestaurantByCuisineAndNeighborhood(e,t,a){DBHelper.fetchRestaurants((n,r)=>{if(n)a(n,null);else{let n=r;"all"!=e&&(n=n.filter(t=>t.cuisine_type==e)),"all"!=t&&(n=n.filter(e=>e.neighborhood==t)),a(null,n)}})}static fetchNeighborhoods(e){DBHelper.fetchRestaurants((t,a)=>{if(t)e(t,null);else{const t=a.map((e,t)=>a[t].neighborhood),n=t.filter((e,a)=>t.indexOf(e)==a);e(null,n)}})}static fetchCuisines(e){DBHelper.fetchRestaurants((t,a)=>{if(t)e(t,null);else{const t=a.map((e,t)=>a[t].cuisine_type),n=t.filter((e,a)=>t.indexOf(e)==a);e(null,n)}})}static urlForRestaurant(e){return`./restaurant.html?id=${e.id}`}static imageUrlForRestaurant(e){return`/img/${e.photograph}`}static mapMarkerForRestaurant(e,t){return new google.maps.Marker({position:e.latlng,title:e.name,url:DBHelper.urlForRestaurant(e),map:t,animation:google.maps.Animation.DROP})}static readableTime(e){const t=new Date(e),a=t.getDate();return t.toLocaleString("en-us",{month:"long"})+" "+a+", "+t.getFullYear()}}let restaurant;var map;window.initMap=(()=>{fetchRestaurantFromURL((e,t)=>{e?console.error(e):(self.map=new google.maps.Map(document.getElementById("map"),{zoom:16,center:t.latlng,scrollwheel:!1}),fillBreadcrumb(),DBHelper.mapMarkerForRestaurant(self.restaurant,self.map))})}),fetchRestaurantFromURL=(e=>{if(self.restaurant)return void e(null,self.restaurant);const t=getParameterByName("id");t?DBHelper.fetchRestaurantById(t,(t,a)=>{self.restaurant=a,a?(fillRestaurantHTML(),e(null,a)):console.error(t)}):(error="No restaurant id in URL",e(error,null))}),fillRestaurantHTML=((e=self.restaurant)=>{document.getElementById("restaurant-name").innerHTML=e.name;const t=document.getElementById("favorite");"true"==e.is_favorite?t.className="is_favorite":t.className="is_not_favorite";const a=document.getElementById("restaurant-img");a.className="restaurant-img",a.setAttribute("alt",e.name+" restaurant image"),a.src="/img/"+e.id+"-600w.webp",a.setAttribute("srcset","/img/"+e.id+"-300w.webp 300w, /img/"+e.id+"-400w.webp 400w, /img/"+e.id+"-600w.webp 600w"),a.setAttribute("sizes","(max-width: 713px) 600px, (max-width: 830px) 300px, (max-width: 1125px) 400px, 600px"),document.getElementById("restaurant-cuisine").innerHTML=e.cuisine_type,document.getElementById("restaurant-address").innerHTML=e.address,e.operating_hours&&fillRestaurantHoursHTML(),fillReviewsHTML(),fillFormHTML()}),fillRestaurantHoursHTML=((e=self.restaurant.operating_hours)=>{const t=document.getElementById("restaurant-hours");for(let a in e){const n=document.createElement("tr"),r=document.createElement("td");r.innerHTML=a,n.appendChild(r);const s=document.createElement("td");s.innerHTML=e[a],n.appendChild(s),t.appendChild(n)}}),fillReviewsHTML=((e=self.restaurant.reviews)=>{const t=document.getElementById("reviews-container"),a=document.createElement("h3");if(a.innerHTML="Reviews",t.appendChild(a),!e){const e=document.createElement("p");return e.innerHTML="No reviews yet!",void t.appendChild(e)}const n=document.getElementById("reviews-list");e.forEach(e=>{n.appendChild(createReviewHTML(e))}),t.appendChild(n)}),createReviewHTML=(e=>{const t=document.createElement("li"),a=document.createElement("div");a.setAttribute("class","reviewHeader"),t.appendChild(a);const n=document.createElement("p");n.innerHTML=e.name,n.setAttribute("class","reviewName"),a.appendChild(n);const r=document.createElement("p");r.innerHTML=e.updatedAt,r.setAttribute("class","reviewDate"),a.appendChild(r);const s=document.createElement("p");s.innerHTML=`Rating: ${e.rating}`,s.setAttribute("class","reviewRating"),t.appendChild(s);const l=document.createElement("p");return l.innerHTML=e.comments,l.setAttribute("class","reviewBody"),t.appendChild(l),t}),fillBreadcrumb=((e=self.restaurant)=>{const t=document.getElementById("breadcrumb"),a=document.createElement("li");a.innerHTML=e.name,t.appendChild(a)}),getParameterByName=((e,t)=>{t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");const a=new RegExp(`[?&]${e}(=([^&#]*)|&|#|$)`).exec(t);return a?a[2]?decodeURIComponent(a[2].replace(/\+/g," ")):"":null}),fillFormHTML=(()=>{const e=document.getElementById("reviews-container"),t=document.getElementById("formDiv");e.appendChild(t)}),document.getElementById("favorite").addEventListener("click",e=>{const t=document.getElementById("favorite"),a=self.restaurant.id;addToFavorite(a,t)}),addToFavorite=((e,t)=>{"is_favorite"==t.className?(t.className="is_not_favorite",self.restaurant.is_favorite="false",addRestaurantsToCache(self.restaurant),fetch(DBHelper.DATABASE_URL+`/${e}/?is_favorite=false`,{method:"PUT"}).catch(t=>{console.log(t),navigator.onLine||window.addEventListener("online",t=>{fetch(DBHelper.DATABASE_URL+`/${e}/?is_favorite=false`,{method:"PUT"})})})):"is_not_favorite"==t.className&&(t.className="is_favorite",self.restaurant.is_favorite="true",addRestaurantsToCache(self.restaurant),fetch(DBHelper.DATABASE_URL+`/${e}/?is_favorite=true`,{method:"PUT"}).catch(t=>{console.log(t),navigator.onLine||window.addEventListener("online",t=>{fetch(DBHelper.DATABASE_URL+`/${e}/?is_favorite=true`,{method:"PUT"})})}))}),review=(()=>{const e=document.forms.reviewForm,t=document.forms.reviewForm.name.value,a=document.forms.reviewForm.rating.value,n=document.forms.reviewForm.comments.value,r=(new Date).getTime(),s=DBHelper.readableTime(r),l=getParameterByName("id"),o={restaurant_id:l,name:t,createdAt:s,updatedAt:s,rating:a,comments:n},i={restaurant_id:l,name:t,createdAt:r,updatedAt:r,rating:a,comments:n};document.getElementById("reviews-list").appendChild(createReviewHTML(o)),self.restaurant.reviews.push(o),addRestaurantsToCache(self.restaurant),fetch("http://localhost:1337/reviews/",{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{console.log(e)}).catch(e=>{console.log(e)}),e.reset()});