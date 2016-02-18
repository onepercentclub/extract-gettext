'use strict';

var program = require('commander'),
    _ = require('lodash'),
    fs = require('fs'),
    async = require('async'),
    mkdirs = require('mkdirs'),
    parsePath = require('parse-filepath'),
    scan = require('./scan');

function run(sourcePaths, outputFile) {
    var paths = sourcePaths.split(',').map(function(path) {
        return path + '/**/*';
    });
    console.log('Running ' + sourcePaths);
    var outputDir = parsePath(outputFile).dirname;

    console.log("Creating " + outputDir)

    mkdirs(outputDir, function(err){
        console.log('Woot');
        if(err) {
            console.log(err)
        } else {
            console.log('Right');
        }
    });
    fs.writeFile(outputFile, 'test', null, 2);
    console.log('File created');

    async.map(paths, scan, function(err, outputFile) {
        console.log('Done scanning');
        var strings = results.reduce(function(strings, result) {
            return strings.concat(result);
        }, []);

        strings = _.uniq(strings).sort().reduce(function(strings, string) {
            strings[string] = string;
            return strings;
        }, {});

        return fs.writeFile(outputFile, JSON.stringify(strings, null, 2), done('All done'));
    });
}

module.exports = run;
