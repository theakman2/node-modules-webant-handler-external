var Handler = require("../lib/index.js");
var HandlerBase = require("./lib/Handler.js");

function createHandler(Handler,settings) {
	var handlerBase = new HandlerBase(settings);
	
	Handler.prototype = handlerBase;
	Handler.prototype.constructor = Handler;
	
	return new Handler();
}

var handler = createHandler(Handler,{});

var tests = {
	"test external 1":function(assert,done) {
		var data = {
			filePath:"http://microsoft.com/path/to/file.css?bla=foo#anchor"	
		};
		
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,true,"Handler should claim to handle this file.");
			
			handler.handle(data,function(resp){
				assert.deepEqual(
					resp,
					{
						type:"externalCss",
						url:"http://microsoft.com/path/to/file.css?bla=foo#anchor"
					},
					"Handler should call 'update' correctly."
				);
				
				done();
			});
		});
	},
	"test external 2":function(assert,done) {
		var data = {
			filePath:"//cdn.google.com/assets/popularlibrary.js"
		};
		
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,true,"Handler should claim to handle this file.");
			
			handler.handle(data,function(resp){
				assert.deepEqual(
					resp,
					{
						type:"externalJs",
						url:"//cdn.google.com/assets/popularlibrary.js"
					},
					"Handler should call 'update' correctly."
				);
				
				done();
			});
		});
	},
	"test external 3":function(assert,done) {
		var data = {
			filePath:"//cdn.google.com/assets/template.hbs"
		};
		
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
			done();
		});
	},
	"test external 4":function(assert,done) {
		var data = {
			filePath:__dirname+"/path/to/local.css"
		};
		
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
			done();
		});
	},
	"test external 5":function(assert,done) {
		var data = {
			filePath:"http://microsoft.com/path/to/file.css?bla=foo#anchor",
			requireType:"function"
		};
		
		handler.willHandle(data,function(err,yes){
			assert.strictEqual(err,null,"Handler should not report an error.");
			assert.strictEqual(yes,false,"Handler should not claim to handle this file.");
			done();
		});
	}
};

require("test").run(tests);