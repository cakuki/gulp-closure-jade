/* jshint node: true */
'use strict';

var PLUGIN_NAME = 'gulp-closure-jade';

var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var es = require('event-stream');
var jade = require('jade');


var jsdoc = [
    '/**',
    ' * @param {Object=} locals Template object.',
    ' * @return {string} Markup string.',
    ' */\n'
].join('\n');


/**
 * @param {string} contents - Jade text
 * @param {Object?} options - Jade and Closure options.
 * @return {Buffer} Closure Template functions.
 */
function process(contents, options) {
    var buf = [];

    if (!contents) {
        throw new PluginError(PLUGIN_NAME, 'Empty file!');
    }

    contents = contents.toString();

    var namespace = getNamespace(contents);
    var templates = getTemplates(contents);

    buf.push('goog.provide(\'' + namespace + '\');\n\n\n');

    for (var templateTitle in templates) {
        if (!templates.hasOwnProperty(templateTitle) || typeof templates[templateTitle] != 'string') {
            continue;
        }

        buf.push(options.jsdoc + namespace + '.' + templateTitle + ' = ' +
            jade.compileClient(templates[templateTitle], {}) + ';\n\n');
    }

    return new Buffer(buf.join('\n'));
}


/**
 * @param {string} contents - Jade text.
 */
function getNamespace(contents) {
    var namespaceMatches = /^\s*\/\/-\s*(?:ns|namespace)\s*:\s*([\w\.]+)/gi.exec(contents);
    if (namespaceMatches.length === 0) {
        throw new PluginError(PLUGIN_NAME, 'No namespace declaration.');
    }
    if (namespaceMatches.length !== 2) {
        throw new PluginError(PLUGIN_NAME, 'Multiple namespace declaration.');
    }

    return namespaceMatches[1];
}


/**
 * @param {string} contents - Jade text.
 */
function getTemplates(contents) {
    var templatePairs = contents.split(/\n\s*\/\/-\s*(?:template|t)\s*:\s*([\w.]+)\n/gi);
    var templates = {};

    if (templatePairs.length < 3) {
        throw new PluginError(PLUGIN_NAME, 'No template can be found.');
    }

    for (var i = 1, ii = templatePairs.length; i < ii; i+=2) {
        if (templatePairs[i] && templatePairs[i + 1]) {
            templates[templatePairs[i]] = templatePairs[i + 1];
        }
    }

    return templates;
}


var plugin = function gulpClosureJade(options) {
    options = options || {};
    options.jsdoc = options.jsdoc || jsdoc;

    return es.map(function(file, cb){
        file.contents = process(file.contents, options);
        cb(null, file);
    });
};


module.exports = plugin;
