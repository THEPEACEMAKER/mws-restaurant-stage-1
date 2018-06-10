


// Register the serviceWorker

registerServiceWorker = () => {
	if (!navigator.serviceWorker) return; //detect if this feature is supported in the borwser

	navigator.serviceWorker.register('/sw.js').then(function(){
		console.log('Registeration Worked!');
	}).catch(function(){
		console.log('serviceWorker registeration failed!!');
	});
};

registerServiceWorker();