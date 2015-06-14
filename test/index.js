var fs = require('fs');
var test = require('tape');

var JXT = require('jxt').getGlobalJXT();
var Atom = require('../');

JXT.use(Atom);


var atomText = fs.readFileSync(__dirname + '/feed.xml');
var feed = JXT.parse(atomText);

test('Feed Entries', function (t) {
    t.equal(feed.entries.length, 1);
    t.end();
});


var entry = feed.entries[0];


// ====================================================================
// Feed Tests

test('Feed Title', function (t) {
    t.equal(feed.title.type, 'text');
    t.equal(feed.title.value, 'Atom Feed');
    t.end();
});

test('Feed Subtitle', function (t) {
    t.equal(feed.subtitle.type, 'text');
    t.equal(feed.subtitle.value, 'Example');
    t.end();
});

test('Feed Authors', function (t) {
    t.equal(feed.authors.length, 1);

    var author = feed.authors[0];

    t.equal(author.name, 'Jane Doe');
    t.equal(author.email, 'janedoe@example.com');
    t.end();
});

test('Feed Contributors', function (t) {
    t.equal(feed.contributors.length, 1);

    var contributor = feed.contributors[0];

    t.equal(contributor.name, 'John Doe');
    t.equal(contributor.email, 'johndoe@example.com');
    t.end();
});



// ====================================================================
// Entry Tests

test('Entry Title', function (t) {
    t.equal(entry.title.type, 'text');
    t.equal(entry.title.value, 'Test JXT Atom parsing');
    t.end();
});

test('Entry Subtitle', function (t) {
    t.equal(entry.subtitle.type, 'text');
    t.equal(entry.subtitle.value, 'Now with subtitles');
    t.end();
});

test('Entry Authors', function (t) {
    t.equal(entry.authors.length, 1);

    var author = entry.authors[0];

    t.equal(author.name, 'Jane Doe');
    t.equal(author.email, 'janedoe@example.com');
    t.end();
});

test('Entry Contributors', function (t) {
    t.equal(entry.contributors.length, 1);

    var contributor = entry.contributors[0];

    t.equal(contributor.name, 'John Doe');
    t.equal(contributor.email, 'johndoe@example.com');
    t.end();
});

