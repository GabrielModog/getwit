const twitter = require("twitter");
const fs = require("fs");

require("dotenv").config();

// setup Twitter API
let client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// declara the parameter you will use on the request
let params = {user_id: process.env.USER_ID};

client.get("statuses/user_timeline", params, (error, tweets, response) => {
    if(!error){
		
		// initialize a empty object
		let obj = { text: [] };
		
		// will be used to store JSON data
		let data;
		
		// catch tweets from the user and store on the property(obj.text) of the object
		for(let i = 0; i < tweets.length; i++){
	
			obj.text[i] = tweets[i].text.toString();
			
		}
		
		// turning the obj data(twitter texts) on json format
		data = JSON.stringify(obj, null, 4);
		
		// OUTPUT //
		// saving the data on JSON file
		fs.writeFile('tweets.json', data, 'utf8', (err) => {
			if (err) throw err;
			console.log('\nthe json file was saved\n');
		});
	
		console.log(data);
	}
		
});