/**
 * Handles require calls to external URLs (e.g. "require('http://external.site.com/some.css")")
 * Currently only handles .js and .css files.
 */

var url = require("url");

module.exports = function(settings) {
	this.requireTypes = ["comment"];
	this.extensions = [".js",".css"];
	this.filePathType = "external";
	
	this.go = function(data,update,done) {
		var parsed = url.parse(data.filePath,false,true);
		var ext = parsed.pathname.substring(parsed.pathname.lastIndexOf("."));
		
		if (ext === ".css") {
			update({
				type:"externalCss",
				url:data.filePath
			},done);
		} else if (ext === ".js") {
			update({
				type:"externalJs",
				url:data.filePath
			},done);
		}
	};
	
};