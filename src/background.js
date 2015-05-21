chrome.app.runtime.onLaunched.addListener(function ()
{
	chrome.app.window.create('window.html', {
		'id': 'main',
		'bounds': {
			'width': 1000,
			'height': 600
		},
        frame: {
            color: '#3CB371'
        },
		'minWidth': 800,
		'minHeight': 400
	});
});