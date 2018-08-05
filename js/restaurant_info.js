let restaurant;
var map;

/**
 * Initialize Google map, called from HTML.
 */
window.initMap = () => {
  fetchRestaurantFromURL((error, restaurant) => {
    if (error) { // Got an error!
      console.error(error);
    } else {
      self.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: restaurant.latlng,
        scrollwheel: false
      });
      fillBreadcrumb();
      DBHelper.mapMarkerForRestaurant(self.restaurant, self.map);
    }
  });
}

/**
 * Get current restaurant from page URL.
 */
fetchRestaurantFromURL = (callback) => {
  if (self.restaurant) { // restaurant already fetched!
    callback(null, self.restaurant)
    return;
  }
  const id = getParameterByName('id');
  if (!id) { // no id found in URL
    error = 'No restaurant id in URL'
    callback(error, null);
  } else {
    DBHelper.fetchRestaurantById(id, (error, restaurant) => {
      self.restaurant = restaurant;
      if (!restaurant) {
        console.error(error);
        return;
      }
      fillRestaurantHTML();
      callback(null, restaurant)
    });
  }
}

/**
 * Create restaurant HTML and add it to the webpage
 */
fillRestaurantHTML = (restaurant = self.restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = restaurant.name;

  const favorite = document.getElementById('favorite');
  if (restaurant.is_favorite == "true"){
    favorite.className = 'is_favorite'
  }else {
    favorite.className = 'is_not_favorite'
  }


  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img'
  image.setAttribute('alt', restaurant.name + ' restaurant image');  
  image.src = "/img/"+ restaurant.id +"-600w.webp";
  image.setAttribute('srcset', "/img/"+ restaurant.id +"-300w.webp 300w, /img/"+ restaurant.id +"-400w.webp 400w, /img/"+ restaurant.id +"-600w.webp 600w");
  image.setAttribute( 'sizes', '(max-width: 713px) 600px, (max-width: 830px) 300px, (max-width: 1125px) 400px, 600px');

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = restaurant.cuisine_type;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = restaurant.address;

  // fill operating hours
  if (restaurant.operating_hours) {
    fillRestaurantHoursHTML();
  }
  // fill reviews
  fillReviewsHTML();
}

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
fillRestaurantHoursHTML = (operatingHours = self.restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (let key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
}

/**
 * Create all reviews HTML and add them to the webpage.
 */
fillReviewsHTML = (reviews = self.restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h3');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach(review => {
    ul.appendChild(createReviewHTML(review));
  });
  container.appendChild(ul);
}
/**
 * Create review HTML and add it to the webpage.
 */
createReviewHTML = (review) => {
  const li = document.createElement('li');
  const reviewHeader = document.createElement('div');
  reviewHeader.setAttribute('class', 'reviewHeader');
  li.appendChild(reviewHeader);
  const name = document.createElement('p');
  name.innerHTML = review.name;
  name.setAttribute('class', 'reviewName');
  reviewHeader.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.updatedAt;
  date.setAttribute('class', 'reviewDate');  
  reviewHeader.appendChild(date);

  const rating = document.createElement('p');
  rating.innerHTML = `Rating: ${review.rating}`;
  rating.setAttribute('class', 'reviewRating');    
  li.appendChild(rating);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  comments.setAttribute('class', 'reviewBody');      
  li.appendChild(comments);

  return li;
}
/**
 * Add restaurant name to the breadcrumb navigation menu
 */
fillBreadcrumb = (restaurant=self.restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.innerHTML = restaurant.name;
  breadcrumb.appendChild(li);
}

/**
 * Get a parameter by name from page URL.
 */
getParameterByName = (name, url) => {
  if (!url)
    url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results)
    return null;
  if (!results[2])
    return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}



  document.getElementById('favorite').addEventListener('click', (event) => {
    const favorite = document.getElementById('favorite');
    const id = self.restaurant.id;
    addToFavorite(id, favorite);

  });

addToFavorite = (id, favorite) =>{
    if (favorite.className == "is_favorite"){
      favorite.className = 'is_not_favorite';
      self.restaurant.is_favorite = "false";
      addRestaurantsToCache(self.restaurant);
      fetch(DBHelper.DATABASE_URL + `/${id}/?is_favorite=false`, {
        method: 'PUT'
      }).catch(e =>{
        console.log(e);
        if (!navigator.onLine){
          // console.log("offline");
          window.addEventListener('online', (event) => {
            fetch(DBHelper.DATABASE_URL + `/${id}/?is_favorite=false`, {
              method: 'PUT'
            })
          });
        }
      })

    }else if(favorite.className == "is_not_favorite"){
      favorite.className = 'is_favorite';
      self.restaurant.is_favorite = "true";
      addRestaurantsToCache(self.restaurant);      
      fetch(DBHelper.DATABASE_URL + `/${id}/?is_favorite=true`, {
        method: 'PUT'
      }).catch(e =>{
        console.log(e);
        if (!navigator.onLine){
          // console.log("offline");
          window.addEventListener('online', (event) => {
            fetch(DBHelper.DATABASE_URL + `/${id}/?is_favorite=true`, {
              method: 'PUT'
            })
          });
        }
      })
    }
  };

