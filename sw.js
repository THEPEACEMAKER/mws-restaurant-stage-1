self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('index-static-v1').then(function(cache){
			console.log('caches added to the SW')
			return cache.addAll([
				'/',
				'/manifest.json',
				// '//normalize-css.googlecode.com/svn/trunk/normalize.css',
				// 'js/indexController.js',
				'js/offline-script.js',
				// 'js/idb-script.js',
				'js/main.js',
				'js/restaurant_info.js',
				// 'css/styles.css',
				// 'js/dbhelper.js'
				'/restaurant.html?id=1',
				'/restaurant.html?id=2',
				'/restaurant.html?id=3',
				'/restaurant.html?id=4',
				'/restaurant.html?id=5',
				'/restaurant.html?id=6',
				'/restaurant.html?id=7',
				'/restaurant.html?id=8',
				'/restaurant.html?id=9',
				'/restaurant.html?id=10',
				'/img/1-300w.webp',
				'/img/2-300w.webp',
				'/img/3-300w.webp',
				'/img/4-300w.webp',
				'/img/5-300w.webp',
				'/img/6-300w.webp',
				'/img/7-300w.webp',
				'/img/8-300w.webp',
				'/img/9-300w.webp',
				'/img/10-300w.webp',
				'/img/1-400w.webp',
				'/img/2-400w.webp',
				'/img/3-400w.webp',
				'/img/4-400w.webp',
				'/img/5-400w.webp',
				'/img/6-400w.webp',
				'/img/7-400w.webp',
				'/img/8-400w.webp',
				'/img/9-400w.webp',
				'/img/10-400w.webp',
				'/img/1-600w.webp',
				'/img/2-600w.webp',
				'/img/3-600w.webp',
				'/img/4-600w.webp',
				'/img/5-600w.webp',
				'/img/6-600w.webp',
				'/img/7-600w.webp',
				'/img/8-600w.webp',
				'/img/9-600w.webp',
				'/img/10-600w.webp'
				// '/img/logo.svg'
				// 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBxcv426vnVa-jJpL5T5567JakNW1d-7Jw&libraries=places&callback=initMap',

			]).catch(error =>{
				console.log(error);
			});
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
