var should = require('chai').should(),
    expect = require('chai').expect;

var Compiler = require('../index'),
    JSONfn = require('json-fn');

describe('Json-compiler', function () {
  var obj;

  beforeEach(function () {
    obj = {
      header: {
        fooHeader: 'barHeader'
      },
      content: {
        fooContent: 'barContent'
      },
      footer: {
        fooFooter: 'barFooter'
      }
    };
  });

  it('should replace header function', function (done) {
    var expectedFunction = new Function('currentPage, pageCount', 'return ' + JSONfn.stringify({fooHeader: 'barHeader'}) + ';')

    var compiled = Compiler.compile(obj);

    expect(typeof compiled.header).to.eql('function');
    expect(compiled.header.toString()).to.eql(expectedFunction.toString());
    done();
  });

  it('should replace footer function', function (done) {
    var expectedFunction = new Function('currentPage, pageCount', 'return ' + JSONfn.stringify({fooFooter: 'barFooter'}) + ';')

    var compiled = Compiler.compile(obj);

    expect(typeof compiled.footer).to.eql('function');
    expect(compiled.footer.toString()).to.eql(expectedFunction.toString());
    done();
  });

  it('should not replace content function', function (done) {
    var compiled = Compiler.compile(obj);

    expect(typeof compiled.content).to.eql('object');
    expect(compiled.content).to.eql({
      fooContent: 'barContent'
    });
    done();
  });
});