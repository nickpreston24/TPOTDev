var assert = require('assert');
var chai = require('chai');
chai.use(require('chai-string'));
var expect = require('expect');

/**
 * PROBLEM
 *
 I need 3 more regex functions
 for each
 case.make sure to grab all variants of the url without preceding space.I already did the generic one at the bottom.Try to keep them under 60 characters
 for now and
 if we find we need support
 for other URLs later, we can do that.Here is the tester text:

     REGEX: /_____/g
 Highlighted Bracket Insert < http: //www.a.google.com/test-3.html>
     Highlighted Bracket Insert < https: //www.google.com/test/2-1.co.htm >
     Highlighted Bracket Insert < www.google.com / test.org >

     REGEX: /_____/g [url = http: //www.a.google.com/test-3.html]A Short Code Link[/url]
         [url = https: //www.google.com/test/2-1.co.htm]A Short Code Link[/url]
             [url = www.google.com / test.org] A Short Code Link[/url]

                 REGEX: /_____/g [Markup Notation](http: //www.a.google.com/test-3.html)
                     [Markup Notation](https: //www.google.com/test/2-1.co.htm)
                         [Markup Notation](www.google.com / test.org)

                         REGEX: /(https?:\/\/|www)+([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?/g
                         http: //www.a.google.com/test-3.html
                         https: //www.google.com/test/2-1.co.htm
                         www.google.com / test.org
 * 
 * 
 */

describe("Canary Test", () => {

    it("should match 'ac' and 'c'", () => {
        let match = 'ack'.match(/a(z)?(c)?/)

        console.log(match.length); // 3
        console.log(match[0]); // ac (whole match)
        console.log(match[1]); // undefined, because there's nothing for (z)?
        console.log(match[2]); // c
    })
})

/**GOOD REGEX */
const markup_re = /(\[[a-zA-Z\s\d-]+?\])?(?:[\s\(]+?)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/

/**TESTING REGEX */
const master_re = /(\[[a-zA-Z\s\d-]+\])?(?:[\s\(]+?)?(?:url=\s*)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(\][a-zA-Z\s\d-]+\[)?/
// const master_re = /\[?([a-zA-Z\s\d-]+)?\]?(?:[\s\(]+?)?(?:url=\s*)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(\][a-zA-Z\s\d-]+\[\/url\])?/ //leaves some 'url=' in first grouping.

var bracketInserts = [
    "Highlighted & Bracket Insert < http://www.a.google.com/test-3.html#imahastag!>",
    "these are the Issues of Life <https://www.google.com/test/2-1.co.htm >",
    "WhAt THe LoRd HAs DoNE WiTH Me < www.google.com/test.org>"
]

describe("Extract Inserts (<URL>s)", () => {
    it("should parse out tpot urls from <>", () => {
        let results = bracketInserts.map(line => line.match(master_re));

        for (let i in results) {
            let match = results[i];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            let url = match[2];
            assert.notEqual(match[2], undefined)
        }
    })
})

function isHtml(line) {
    return line != undefined;
}

var markup = [
    "[Markup the Notation](http://www.a.google.com/test-3.html)",
    "[Markup Notation 2](https://www.google.com/test/2-1.co.htm)",
    "[Markup-Notation](www.google.com/test.org)"
]

describe("Extract Markup", () => {
    it("should extract markup URLs & bracket Text", () => {
        let results = markup.map(line => line.match(markup_re));
        for (let i in results) {
            let match = results[i];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            assert.notEqual(match[2], undefined)
            assert.notEqual(match[1], undefined)
        }
    })
})

short_code_links = [
    "[url= http://www.a.google.com/test-3.html]A Short Code Link[/url]",
    "[url=https://www.google.com/test/2-1.co.htm]A Short Code Link[/url]",
    "[url= www.google.com/test.org]A Short Code Link[/url]"
]

describe("Extract 'url=' links", () => {
    it("should extract URLs between [url=...]title[/url]", () => {
        let results = short_code_links.map(line => line.match(master_re));
        for (let i in results) {
            let match = results[i];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            assert.notEqual(match[2], undefined)
            assert.notEqual(match[3], undefined)
        }
    })
})

describe("Extract Everything", () => {
    it("should extract all URLs & enclosed Text", () => {

        let everything = markup.concat(bracketInserts).concat(short_code_links);
        let results = everything.map(line => line.match(master_re));
        for (let i in results) {
            let match = results[i];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            assert.notEqual(match[2], undefined)
        }
    })
})

// let {
//     0: group1,
//     1: group2
// } = element; //results[i]
// console.log(group1, group2)

// match.should.not.startWith('=')
// match.should.not.startWith(':')
// match.should.not.startWith('url')