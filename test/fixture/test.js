goog.provide('todomvc.views.Hello');



/**
 * @param {Object=} locals Template object.
 * @return {string} Markup string.
 */
todomvc.views.Hello.header = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1>Welcome</h1><hr/>");;return buf.join("");
};


/**
 * @param {Object=} locals Template object.
 * @return {string} Markup string.
 */
todomvc.views.Hello.menu = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<ul><li>main</li><li>articles</li><li>about</li></ul>");;return buf.join("");
};


/**
 * @param {Object=} locals Template object.
 * @return {string} Markup string.
 */
todomvc.views.Hello.article = function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (article) {
buf.push("<article><h2>" + (jade.escape((jade_interp = article.title) == null ? '' : jade_interp)) + "</h2><p>" + (jade.escape((jade_interp = article.text) == null ? '' : jade_interp)) + "</p></article>");}.call(this,"article" in locals_for_with?locals_for_with.article:typeof article!=="undefined"?article:undefined));;return buf.join("");
};

