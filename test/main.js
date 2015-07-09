/* jshint node: true */
/* global describe, it, beforeEach */
'use strict';

require('mocha');
var should = require('should');

var fs = require('fs');

var gutil = require('gulp-util');
var closureJade = require('../');


describe('gulp-closure-jade', function() {
    var jade = new gutil.File({
        path: './test/fixture/test.jade',
        cwd: './test/',
        base: './test/fixture/',
        contents: fs.readFileSync('./test/fixture/test.jade')
    });
    var js = new gutil.File({
        contents: fs.readFileSync('./test/fixture/test.js')
    });

    it('should convert jade file to Closure template functions', function(done) {
        var stream = closureJade();
        stream.on('data', function (newFile) {
            should.exist(newFile.contents);
            newFile.contents.toString().should.equal(js.contents.toString());
        });
        stream.once('end', done);

        stream.write(jade);
        stream.end();
    });
});
