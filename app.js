// What are we doing in our app???

    // Create an app object (to make use of namespacing)
    const artApp = {};

    // Save information which will be reused (e.g. API key) within properties on the app object
    artApp.apiKey = 'voCUAW6q';
    artApp.apiURL = 'https://www.rijksmuseum.nl/api/en/collection';

    // Create a method which will make a call to the API and get some data back
        // THEN we will take that data and put it on the page
        // Note: don't pollute the global scope with floating data - it's easy to overwrite the data when it's in the global scope and slows your app down
    artApp.getArt = function() {

        // use the URL constructor to format the API endpoint to which we will be making our request
            // this is the baseline URL
        const url = new URL(artApp.apiURL);
        console.log(url);

        // format and add our parameters to our URL
        url.search = new URLSearchParams({
            // include the API parameters here:
            key: artApp.apiKey,
            q: 'monkey',
            imgonly: true
        });

        // now it is finally time to FETCH some data from the beautiful API endpoint we have just constructed
            // Note: a fetch request is a function call
        fetch(url)
        .then(function(apiResponse){
            // take the Promise that is returned and parse it into json
            return apiResponse.json();
        })
        .then(function(artFromTheApi){
            console.log(artFromTheApi.artObjects);
        })
    }

    // Create an initialization method which will kickstart our app
    artApp.init = function() {
        console.log('app is initialized');

        // call the method which will get us our art data
            // Note: this ensures the DOM loads and call the method of getArt()
        artApp.getArt();
    };

    // Call the initialization method (at the end of our code)
    artApp.init();
