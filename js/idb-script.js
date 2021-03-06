
// -----IndexedDB

// openDatabase();
function openDatabase() {
  // If the browser doesn't support service worker,
  // we don't care about having a database
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('restaurantsDB', 1, function(upgradeDb) {
    var restaurantsOS = upgradeDb.createObjectStore('restaurantsOS', { keyPath: 'id' });

    var restaurantsWithReviewsOS = upgradeDb.createObjectStore('restaurantsWithReviewsOS', { keyPath: 'id' });

    var offlineReviews = upgradeDb.createObjectStore('offlineReviews', { keyPath: 'createdAt' });

  });
}

// All restaurants but with no reviews


function addRestaurantsToCache(restaurants) {
  openDatabase().then(function(db) {
    if (!db) return;

    var tx = db.transaction('restaurantsOS', 'readwrite');
    var store = tx.objectStore('restaurantsOS');

    restaurants.forEach(function(restaurant) {
      store.put(restaurant);
    });
    
    return tx.complete;
  })
  // .then(function(){
  // 	// console.log('Added the restaurants to the cache')
  // });

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

// restaurant with its reviews


function addRestaurantToCache(restaurant) {
  openDatabase().then(function(db) {
    if (!db) return;

    var tx = db.transaction('restaurantsWithReviewsOS', 'readwrite');
    var store = tx.objectStore('restaurantsWithReviewsOS');

    store.put(restaurant);
    
    return tx.complete;
  })
  // .then(function(){
  //   // console.log('Added the restaurant to the cache')
  // });

};

function showCachedRestaurant(id) {
  return openDatabase().then(function(db) {
    var tx = db.transaction('restaurantsWithReviewsOS');
    var Store = tx.objectStore('restaurantsWithReviewsOS');

    id = parseInt(id);

    return Store.get(id); //returns the targeted object
  }).then(function(restaurant) {
    // console.log(restaurant);
    return restaurant;
  });
};


// offlineReviews

function addOfflineReviewToCache(review) {
  openDatabase().then(function(db) {
    if (!db) return;

    var tx = db.transaction('offlineReviews', 'readwrite');
    var store = tx.objectStore('offlineReviews');

    store.put(review);
    
    return tx.complete;
  })
  // .then(function(){
  //   // console.log('Added the review to the cache')
  // });

};

function showOfflineCachedReviews() {
  return openDatabase().then(function(db) {
    var tx = db.transaction('offlineReviews');
    var Store = tx.objectStore('offlineReviews');

    return Store.getAll(); //returns a promise with a list of all the objects in the store
  }).then(function(Reviews) {
    // console.log('returned the Reviews from the cache ' + Reviews);
    return Reviews

  });
};

function deleteOfflineCachedReview(timeStamp) {
  openDatabase().then(function(db) {
    if (!db) return;

    var tx = db.transaction('offlineReviews', 'readwrite');
    var store = tx.objectStore('offlineReviews');

    // timeStamp = parseInt(timeStamp);
    store.delete(timeStamp);
    
    return tx.complete;
  })
  // .then(function(){
  //   // console.log('Added the review to the cache')
  // });

};