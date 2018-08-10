/**
 * Common database helper functions.
 */
class DBHelper {

  /**
   * Database URL.
   * Change this to restaurants.json file location on your server.
   */
  static get DATABASE_URL() {
    const port = 1337 // Change this to your server port
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants(callback) {
    showCachedRestaurants().then(restaurants =>{
      if(restaurants.length == 10){  //if all restaurants are in the cache
        callback(null, restaurants);
        // console.log('returned the restaurants from the cache ' + restaurants);
      }else{    //if not all restaurants are in the cache
        fetch(DBHelper.DATABASE_URL)
        .then(response => response.json())
        .then(restaurants =>{ 
          // console.log(restaurants);
          callback(null, restaurants);
          addRestaurantsToCache(restaurants);
          // console.log('online');
        })
        .catch(e =>{
          console.log(e);
          callback(e, null);
        });        
      }
    })
    .catch(e => {   //if there is a problem in checking the cache
      console.log(e);
      fetch(DBHelper.DATABASE_URL)
      .then(response => response.json())
      .then(restaurants =>{ 
        // console.log(restaurants);
        callback(null, restaurants);
        addRestaurantsToCache(restaurants);
      // console.log('online and a problem in the cache');          
      })
      .catch(e =>{
        console.log(e);
        callback(e, null);
      });              
    });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id, callback) {
    showCachedRestaurant(id).then(restaurant =>{ 
      if(restaurant != undefined){  //if there is data in the cache
        callback(null, restaurant);
        // console.log('returned a restaurant from the cache ' + restaurant);      
      }else{    //if there is no data in the cache
        fetch(DBHelper.DATABASE_URL + `/${id}`)
        .then(response => response.json())
        .then(restaurant =>{ 
          fetch(`http://localhost:1337/reviews/?restaurant_id=${id}`)
          .then(response => response.json())
          .then(reviews =>{
            reviews.forEach((review) => {
              const readableTime = DBHelper.readableTime(review.updatedAt);
              review.updatedAt = readableTime;
            });
            restaurant.reviews = reviews;
            callback(null, restaurant);
            addRestaurantToCache(restaurant);
          });
          // console.log('online');
        })
        .catch(e =>{
          console.log(e);
          callback(e, null);
        });        
      }
    }).catch(e =>{  //if there is a problem in checking the cache
        console.log(e);
        fetch(DBHelper.DATABASE_URL + `/${id}`)
        .then(response => response.json())
        .then(restaurant =>{ 
          fetch(`http://localhost:1337/reviews/?restaurant_id=${id}`)
            .then(response => response.json())
            .then(reviews =>{
              reviews.forEach((review) => {
                const readableTime = DBHelper.readableTime(review.updatedAt);
                review.updatedAt = readableTime;
              });
              restaurant.reviews = reviews;
              callback(null, restaurant);
              addRestaurantToCache(restaurant);
            });
          // console.log('online and a problem in the cache');
        })
        .catch(e =>{
          console.log(e);
          callback(e, null);
        });              
    });
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine, callback) {
    // Fetch all restaurants  with proper error handling
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given cuisine type
        const results = restaurants.filter(r => r.cuisine_type == cuisine);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Filter restaurants to have only given neighborhood
        const results = restaurants.filter(r => r.neighborhood == neighborhood);
        callback(null, results);
      }
    });
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood, callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        let results = restaurants
        if (cuisine != 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type == cuisine);
        }
        if (neighborhood != 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood == neighborhood);
        }
        callback(null, results);
      }
    });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  static fetchNeighborhoods(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all neighborhoods from all restaurants
        const neighborhoods = restaurants.map((v, i) => restaurants[i].neighborhood)
        // Remove duplicates from neighborhoods
        const uniqueNeighborhoods = neighborhoods.filter((v, i) => neighborhoods.indexOf(v) == i)
        callback(null, uniqueNeighborhoods);
      }
    });
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines(callback) {
    // Fetch all restaurants
    DBHelper.fetchRestaurants((error, restaurants) => {
      if (error) {
        callback(error, null);
      } else {
        // Get all cuisines from all restaurants
        const cuisines = restaurants.map((v, i) => restaurants[i].cuisine_type)
        // Remove duplicates from cuisines
        const uniqueCuisines = cuisines.filter((v, i) => cuisines.indexOf(v) == i)
        callback(null, uniqueCuisines);
      }
    });
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    return (`/img/${restaurant.photograph}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, map) {
    const marker = new google.maps.Marker({
      position: restaurant.latlng,
      title: restaurant.name,
      url: DBHelper.urlForRestaurant(restaurant),
      map: map,
      animation: google.maps.Animation.DROP}
    );
    return marker;
  }

  static readableTime(timestamp){
      const d = new Date(timestamp),
            day = d.getDate(),
            month = d.toLocaleString("en-us", {month: "long"}),
            year = d.getFullYear(),
            result = month + " " + day + ", " + year;
      return result;
  }

}
