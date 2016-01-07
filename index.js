var Compiler = require('json-compiler'),
    JSONfn = require('json-fn');

function compile(template, data, helpers) {
  var compiled = Compiler.compile(template, data, helpers);
  compileHeader(compiled);
  compileFooter(compiled);
  return compiled;
};

function compileHeader(compiled) {
  if (!compiled) {
    return compiled;
  }

  if (typeof compiled.header === 'object') {
    var args = 'currentPage, pageCount',
        body = 'return ' + JSONfn.stringify(compiled.header) + ';';

    compiled.header = new Function(args, replacePageStrings(body));
  }

  return compiled;
}

function compileFooter(compiled) {
  if (!compiled) {
    return compiled;
  }

  if (typeof compiled.footer === 'object') {
    var args = 'currentPage, pageCount',
        body = 'return ' + JSONfn.stringify(compiled.footer) + ';';

    compiled.footer = new Function(args, replacePageStrings(body));
  }

  return compiled;
}

function replacePageStrings(str) {
  return str.replace('"currentPage/pageCount"', 'currentPage + \'/\' + pageCount');
}

module.exports = {
  compile: compile,
  compileHeader: compileHeader,
  compileFooter: compileFooter
}