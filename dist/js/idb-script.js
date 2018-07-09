
// -----IndexedDB

function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('restaurantsDB', 1, function(upgradeDb) {
    var store = upgradeDb.createObjectStore('restaurantsOS', { keyPath: 'id' });
  });
}

// openDatabase();
function addRestaurantsToCache(restaurants) {
  openDatabase().then(function(db) {
    if (!db) return;

    var tx = db.transaction('restaurantsOS', 'readwrite');
    var store = tx.objectStore('restaurantsOS');

    if(restaurants.length == undefined){  //if the length is undefined then it's only one restaurant, not a list
    	store.put(restaurants);
    }else{
    restaurants.forEach(function(restaurant) {
      store.put(restaurant);
    });
	}
    
    return tx.complete;
  }).then(function(){
  	// console.log('Added the restaurants to the cache')
  });

};

function showCachedRestaurants() {
  return openDatabase().then(function(db) {
    var tx = db.transaction('restaurantsOS');
    var Store = tx.objectStore('restaurantsOS');

    return Store.getAll(); //returns a promise with a list of all the objects in the store
  }).then(function(restaurants) {
    // console.log('returned the restaurants from the cache ' + restaurants);
    return restaurants

  });
};

function showCachedRestaurant(id) {
  return openDatabase().then(function(db) {
    var tx = db.transaction('restaurantsOS');
    var Store = tx.objectStore('restaurantsOS');

    id = parseInt(id);

    return Store.get(id); //returns the targeted object
  }).then(function(restaurant) {
    // console.log(restaurant);
    return restaurant;
  });
};