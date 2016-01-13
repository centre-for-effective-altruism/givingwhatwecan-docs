var sass = require('node-sass')
var clean = require('clean-css')
var path = require('path')
var fs = require('fs')
var each = require('async').each

var input = path.join(__dirname,'styles','styles.scss')
var outputDir = path.join(__dirname,'src','styles')



sass.render({
  file: input
}, function(err, result) {
	if(err) throw err
	console.log('Processed SCSS files')
	var files = {
		"styles.css" : result.css
	}

	cleaned = new clean({sourceMap:true,debug:true}).minify(result.css);
	files["styles.min.css"] = cleaned.styles;
	files["styles.min.map"] = cleaned.styles;
	console.log('Minified CSS file')
	console.log('Original vs Minified:',(cleaned.stats.originalSize/1000) + 'kb','/',(cleaned.stats.minifiedSize/1000) + 'kb','('+(cleaned.stats.efficiency*100).toFixed(2)+'% reduction)')
	

	each(Object.keys(files),function(file,cb){
		fs.writeFile(path.join(outputDir,file),files[file],function(err){
			console.log('+ Wrote file',file)
			cb(err);
		})
	},
	function(err){
		if(err) console.log(err)
		console.log('All files written!')
	})
});