// What are we doing in our app???

    // Create an app object (to make use of namespacing)
    const artApp = {};

    // Save information which will be reused (e.g. API key) within properties on the app object
    artApp.apiKey = 'voCUAW6q';
    artApp.apiURL = 'https://www.rijksmuseum.nl/api/en/collection';

    // Create a method which will make a call to the API and get some data back
        // THEN we will take that data and put it on the page
        // Note: don't pollute the global scope with floating data - it's easy to overwrite the data when it's in the global scope and slows your app down
    artApp.getArt = function(usersChosenAnimal) {

        // use the URL constructor to format the API endpoint to which we will be making our request
            // this is the baseline URL
        const url = new URL(artApp.apiURL);
        console.log(url);

        // format and add our parameters to our URL
        url.search = new URLSearchParams({
            // include the API parameters here:
            key: artApp.apiKey,
            q: usersChosenAnimal,
            imgonly: true,
            ps: 25
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

            // take the data returned from the API above and passing it to the displayArt method
            artApp.displayArt(artFromTheApi.artObjects);
        })
    }

    // Create a method which will take the API data and display on our page
    artApp.displayArt = function(artArray) {
        // Note: forEach loops need a callback function
        artArray.forEach(function(individualArtObject){
            // whatever parameter you pass into the callback function it refers to the items in the array
            // console.log(individualArtObject);

            // extract the data from the API (artist name, piece title, image URL, alt text) and save it within variables
            const artworkTitle = individualArtObject.title;
            const artworkImage = individualArtObject.webImage.url;
            const artist = individualArtObject.principalOrFirstMaker;
            const altText = individualArtObject.longTitle;

            console.log(artworkTitle, artworkImage, artist, altText);

            // create an li element with a class of .piece in which this information will be added
            const listElement = document.createElement('li');
            listElement.classList.add('piece');

            // create an h2 to hold the art title
            const heading = document.createElement('h2');
            heading.textContent = artworkTitle;

            // create am img to hold the artwork picture
            const image = document.createElement('img');

            // this element node has src and alt properties which we can use!
            image.src = artworkImage;
            image.alt = altText;

            // create a p with a class of .artist to hold the artist name
            const paragraphElement = document.createElement('p');
            paragraphElement.classList.add('artist');
            paragraphElement.textContent = artist;

            // take the elements we have created and add them to the li
            // listElement
            //     .appendChild(heading)
            //     .appendChild(image)
            //     .appendChild(paragraphElement);

            // another way of writing this ^^ is this code below:
            listElement.append(heading, image, paragraphElement);    

            // add the li to the ul
            const ulElement = document.querySelector('#artwork');
            ulElement.appendChild(listElement);

        })
    }


    // Create an initialization method which will kickstart our app
    artApp.init = function() {
        console.log('app is initialized');

        // call the method which will get us our art data
            // Note: this ensures the DOM loads and call the method of getArt() - which shows the data
            // this line of code is going off to get some data
        artApp.getArt('whales');

        // Note: think about what's available within the scope of what you're looking for before you call it in the init
    };

    // Call the initialization method (at the end of our code)
    artApp.init();
