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
    var expectedFunction = new Function('currentPage, pageCount', 'return ' + JSONfn.stringify({fooHeader: 'barHeader'}) + ';');

    var compiled = Compiler.compileHeader(obj);

    expect(typeof compiled.header).to.eql('function');
    expect(compiled.header.toString()).to.eql(expectedFunction.toString());
    done();
  });

  it('should replace footer function', function (done) {
    var expectedFunction = new Function('currentPage, pageCount', 'return ' + JSONfn.stringify({fooFooter: 'barFooter'}) + ';');

    var compiled = Compiler.compileFooter(obj);

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

  it('should replace page strings', function (done) {
    var obj2 = {
      header: {
        fooHeader: 'currentPage/pageCount'
      },
      footer: {
        fooFooter: 'currentPage/pageCount'
      }
    };

    var compiled = Compiler.compile(obj2);
console.log(compiled.header.toString());
    expect(compiled.header(1, 2)).to.eql({fooHeader: '1/2'});
    expect(compiled.footer(1, 2)).to.eql({fooFooter: '1/2'});
    done();
  });
});