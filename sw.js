self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('index-static-v1').then(function(cache){
			console.log('caches added to the SW')
			return cache.addAll([
				'/',
				// '//normalize-css.googlecode.com/svn/trunk/normalize.css',
				// 'js/indexController.js',
				'js/offline-script.js',
				// 'js/idb-script.js',
				'js/main.js',
				'js/restaurant_info.js',
				'css/styles.css',
				// 'js/dbhelper.js'
				'restaurant.html?id=1',
				'restaurant.html?id=2',
				'restaurant.html?id=3',
				'restaurant.html?id=4',
				'restaurant.html?id=5',
				'restaurant.html?id=6',
				'restaurant.html?id=7',
				'restaurant.html?id=8',
				'restaurant.html?id=9',
				'restaurant.html?id=10'
				// 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxcv426vnVa-jJpL5T5567JakNW1d-7Jw&libraries=places&callback=initMap',

			]);
		})
	);
});

self.addEventListener('fetch', function(event){
	event.respondWith(
			caches.match(event.request).then(function(response){
				if (response) return (response);
				return fetch(event.request);
			})
		);
});
