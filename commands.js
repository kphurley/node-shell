var fs = require('fs');
var request = require('request');

var pwd = function (stdin, arg, done) {
    done(process.env.PWD);
}
var date = function (stdin, arg, done) {
    done((new Date()).toString());
}
var ls = function (stdin, arg, done) {
    fs.readdir('.', function (err, files) {
        if (err) throw err;
        var str='';
        files.forEach(function (file) {
            str += file.toString() + "\n";
        });
        done(str);
    });
}
var echo = function (stdin, arg, done) {
    if (arg[1].toUpperCase() === '$PATH') {
        done(process.env.PATH);
    }
    else {
        var toPrint = arg.slice(1).join(' ');
        done(toPrint);
    }
}
var cat = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        done(data);
    });
}
var head = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        var firstFive = data.split('\n').slice(0, 5).join('\n');
        done(firstFive);
    });
}
var tail = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        var lastFive = data.split('\n');
        lastFive = lastFive.slice(lastFive.length - 5).join('\n');
        done(lastFive);
    });
}
var sort = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        var linesOfData = data.split('\n').sort();
        done(linesOfData.join('\n'));
    });
}
var wc = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        var len = data.split('\n').length;
        done(String(len));
    });
}
var uniq = function (stdin, arg, done) {
    fs.readFile(arg[1], 'utf8', function (err, data) {
        if (err) throw err;
        var dat = data.split('\n');
        removeDuplicates(dat);
        done(dat.join('\n'));   
    });
}
var removeDuplicates = function (dat) {
    for (var i = 1; i < dat.length; i++) {
        if (dat[i] === dat[i - 1]) {
            dat.splice(i, 1);
            i--;
        }
    }
}
var curl = function (stdin, arg, done) {
    var url =arg[1];
    if(/http:\/\//.test(arg[1]) === false){
        url = 'http://' + url;
    }
    
    request.get(url, function (error, response, body) {
        //console.log('in request callback');
        if (!error && response.statusCode == 200) {
            
            done(body.toString());
        }
    });
}

module.exports = {
    pwd: pwd
    , date: date
    , ls: ls
    , echo: echo
    , cat: cat
    , head: head
    , tail: tail
    , sort: sort
    , wc: wc
    , uniq: uniq
    , curl: curl
}