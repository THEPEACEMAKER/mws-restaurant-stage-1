self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('index-static-v1').then(function(cache){
			console.log('caches added to the SW')
			return cache.addAll([
				'/',
				// '//normalize-css.googlecode.com/svn/trunk/normalize.css',
				'js/main/indexController.js',
				'js/idb-library.js',
				'js/idb-script.js',
				'js/main.js',
				'js/restaurant_info.js',
				'css/styles.css',
				'js/dbhelper.js'
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
