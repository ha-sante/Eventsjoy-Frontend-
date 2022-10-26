const axios = require('axios');



let HEREGeocodeAPI = `https://geocode.search.hereapi.com/v1/geocode`;



exports.searchForLocation = (queryString) => {

	// take the query string
	// then send the request to HERE 
	// return the results
 return new Promise((resolve, reject) => {
    axios.get(HEREGeocodeAPI, { 
        params: { 
            apiKey: "INSERT YOUR HERE CODE API HERE",
            limit: 5,
            q: queryString
        } 
    }).then((response) => {
          resolve(response.data);
     }).catch((error) => {
          reject(error);
    });

  })
}