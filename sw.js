self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('index-static-v1').then(function(cache){
			console.log('caches added')
			return cache.addAll([
				'/',
				'//normalize-css.googlecode.com/svn/trunk/normalize.css',
				'css/styles.css',
				'js/dbhelper.js',
				'js/main.js',
				'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxcv426vnVa-jJpL5T5567JakNW1d-7Jw&libraries=places&callback=initMap',
				'js/main/indexController.js'

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
