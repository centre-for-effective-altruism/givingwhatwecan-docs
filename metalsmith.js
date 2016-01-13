// start a timer
var buildTime = process.hrtime();
var buildTimeDiff = buildTime;

// environment vars
if(process.env.NODE_ENV !== 'production'){
	require('dotenv').load({silent: true})
}
// modules
var Metalsmith = require('metalsmith')

var ignore = require('metalsmith-ignore')
var metadata = require('metalsmith-metadata')
var collections = require('metalsmith-collections')

var markdown = require('metalsmith-markdown')
var navigation = require('metalsmith-navigation')
var relative = require('metalsmith-relative')
var layouts = require('metalsmith-layouts')

var merge = require('merge');
var minimatch = require('minimatch');

var chalk = require('chalk')
var moment = require('moment')

var path = require('path')

var watch = require('metalsmith-watch')

var M = new Metalsmith(__dirname)



	M
	.source('./src')
    .destination('./dest')
    .use(logMessage('ENVIRONMENT: ' + process.env.NODE_ENV,chalk.dim,true))
    .use(logMessage('NODE VERSION: ' + process.version,chalk.dim,true))
    .use(logMessage('BUILD TIME: ' + moment().format('YYYY-MM-DD @ H:m'),chalk.dim,true))
    .use(ignore([
        '**/.DS_Store',
    ]))
    // Set up some metadata
    .use(metadata({
        "site": "settings/site.yaml"
    }))
    .use(logMessage('Prepared global metadata'))
    .use(collections({
    	entries: {
    		pattern: 'entries/**/*.md',
    		orderBy: 'menuOrder'
    	}
    }))
    .use(logMessage('Prepared collections'))
    .use(function (files,metalsmith,done){
    	Object.keys(files).filter(minimatch.filter('entries/**')).forEach(function(file){
    		meta = files[file];
    		meta.layout = "entry.jade"
    		meta.navs = 'main'
    	})
    	done();
    })
    .use(markdown({
      "smartypants": true,
      "gfm": true,
      "tables": true
    }))
    .use(logMessage('Converted Markdown to HTML'))
    .use(function (files,metalsmith,done){
        // add paths to entries
        Object.keys(files).filter(minimatch.filter('entries/**/*.html')).forEach(function(file){
            var filepath = file.replace(/^entries\//,'');
            var index = /index\.html$/
            if(!index.test(filepath)){
                filepath = filepath.replace('.html','/index.html')
            }
            files[file].path = filepath === "index.html" ? '/' : filepath.replace('/index.html', '')
            if(filepath !== file){
                files[filepath] = files[file];
                delete files[file];
            }      
        })
        done();
    })
    .use(logMessage('Moved files into place'))
    .use(navigation({
    	main: {
    		sortBy: 'menuOrder',
    		pathProperty: 'path',
    		includeDirs: true,
    		filterProperty: 'navs',
    	}
    },{
    	navListProperty: 'navigation',
    	permalinks: true
    }))
    .use(relative())
    .use(layouts({
    	engine: 'jade',
    	pretty: true
    }))
    .use(logMessage('Built HTML files from layouts'))
    .use(logMessage('Starting watcher...',chalk.green))
    .use(
		watch({
			paths: {
				"${source}/**/*": "**/*",
				"layouts/**/*": "**/*",
			}
		})
	)
    .build(function(err,files){
    	if(err){
    		console.log(err)
    	} else {
	    	console.log('Build done')
    	}
    })




 // UTILITIES //

// LOG FILES
function logFilesMap (files, metalsmith, done) {
    Object.keys(files).forEach(function (file) {
        if(file.search('css'))
        console.log(">> ", file);
    });
    done();
};
// SEND CONSOLE MESSAGES
function message(m,c,t){
    c = c||chalk.yellow.bold
    t = t||false;
    var output = c(m);
    if(!t) {
        output += '................................................'.substr(m.length)
        output += chalk.dim('(+'+formatBuildTimeDiff()+' / '+formatBuildTime()+')')
    }
    console.log('-',output);
}
function logMessage (m,c,t){
    c = c ||chalk.bold.blue
    return function(files, metalsmith, done){
        message(m,c,t)
        done();
    }
}
// FORMAT BUILD TIMER INTO Mins : secs . milliseconds
function formatBuildTime(hrTimeObj){
    hrTimeObj = hrTimeObj || buildTime
    var t = process.hrtime(hrTimeObj)
    return (t[0] + (t[1]/10e+9)).toFixed(3)+'s';
}
function formatBuildTimeDiff(){
    var t = buildTimeDiff;
    buildTimeDiff = process.hrtime();
    return formatBuildTime(t);
}