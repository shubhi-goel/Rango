
var fs = require('fs'); 
var http = require('http'); 
var url = require('url'); 
var PAGE_DIRECTORY = "Rango/"; 
http.createServer( function (request, result) {
var urlObj = url.parse(request.url, true, false); 
	fs.readFile(PAGE_DIRECTORY + urlObj.pathname, function (error, page_contents) { 
		if (error) { 
			result.writeHead(404); 
			result.end(JSON.stringify(error)); 
			return; 
		} 
		result.writeHead(200); 
		result.end(page_contents);
		 }); 
}).listen(3000);
console.log("Server has started :)");

