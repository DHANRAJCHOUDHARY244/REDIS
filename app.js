const redis = require("redis"); 
const redisclient = redis.createClient(); 

(async () => { 
	await redisclient.connect(); 
})(); 

console.log("Connecting to the Redis"); 

redisclient.on("ready", async() => { 
	console.log("Connected!"); 
	await redisclient.set('name','dhanraj')
	console.log(await redisclient.get('name'));
	await redisclient.lPush('enteries','dhanraj')
	const a=await redisclient.lRange('enteries',0,-1)
	console.log(a,'----------');
}); 

redisclient.on("error", (err) => { 
	console.log("Error in the Connection"); 
});  

