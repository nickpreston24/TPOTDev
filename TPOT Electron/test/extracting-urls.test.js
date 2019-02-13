var assert = require('assert');
var chai = require('chai');
var expect = require('expect');

// import * as strategies from '../src/editor/plugins/draft-js-link-decorators/utils/strategies.jsx';

describe("Canary Test", () => {

    it("should match 'ac' and 'c'", () => {
        let match = 'ack'.match(/a(z)?(c)?/)

        console.log(match.length); // 3
        console.log(match[0]); // ac (whole match)
        console.log(match[1]); // undefined, because there's nothing for (z)?
        console.log(match[2]); // c
    })
})

const bracketInserts = [
    "Highlighted & Bracket Insert < http://www.a.google.com/test-3.html#imahastag!>",
    "these are the Issues of Life <https://www.google.com/test/2-1.co.htm >",
    "WhAt THe LoRd HAs DoNE WiTH Me < www.google.com/test.org>"
]

const markup = [
    "[Markup the Notation](http://www.a.google.com/test-3.html)",
    "[Markup Notation 2](https://www.google.com/test/2-1.co.htm)",
    "[Markup-Notation](www.google.com/test.org)"
]

const short_code_links = [
    "[url= http://www.a.google.com/test-3.html]A Short Code Link[/url]",
    "[url=https://www.google.com/test/2-1.co.htm]A Short Code Link[/url]",
    "[url= www.google.com/test.org]A Short Code Link[/url]"
]

let everything = markup.concat(bracketInserts).concat(short_code_links);


/**GOOD REGEX */
const markup_re = /\[?([a-zA-Z&\s\d-]+)?\]?(?:[\s\(]+?)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const generic_re = /([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/

/**TESTING REGEX */
const master_re = /\[?([a-zA-Z&\s\d-]+)?\]?(?:[\s\(]+?)?[\burl=\b\s]?[\s<]*([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(?:\])?([a-zA-Z\s\d-]+)?(?:\[)?/

describe("Extract Inserts (<URL>s)", () => {
    it("should parse out tpot urls from <>", () => {
        let results = bracketInserts.map(line => line.match(master_re));

        for (let j in results) {
            let match = results[j];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            let url = match[2];
            assert.notEqual(match[2], undefined)
        }
    })
})

describe("Generic", () => {
    it("Should get free floating urls"), _ => {
        everything.map(line => line.match(generic_re));
    }
})

describe("Extract Markup", () => {
    it("should extract markup URLs & bracket Text", () => {
        let results = markup.map(line => line.match(markup_re));
        for (let j in results) {
            let match = results[j];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            assert.notEqual(match[2], undefined)
            assert.notEqual(match[1], undefined)
        }
    })
})

describe("Extract 'url=' links", () => {
    it("should extract URLs between [url=...]title[/url]", () => {
        let results = short_code_links.map(line => line.match(master_re));
        for (let j in results) {
            let match = results[j];
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

        let results = everything.map(line => line.match(master_re));
        for (let j in results) {
            let match = results[j];
            for (i = 1; i < match.length; i++) {
                console.log(`${i} = ${match[i]}`);
            }

            assert.notEqual(match[2], undefined)
        }
    })
})

describe("Extract Titles and URLs", () => {
    it("Should extract all URLs, enclosed Text & assign link type", () => {
        let details = extract(everything, master_re);
        console.table(details)
        assert.notEqual(details, undefined);
    })
})

describe.skip("Extract Everything Using Draft (implementation)", () => {
    it("should extract all URLs & enclosed Text", () => {
        // TODO: test strategies.jsx here.
    })
})


const isNullOrWhiteSpace = input => !input || !input.trim();
/**
 * Returns the extracted urls & titles, keyed to their respective types, e.g. {Url: "https...", Title: "The Issues of Life"}
 */
function extract(lines, pattern) {
    let results = lines.map(line => line.match(pattern));
    let extracted = [];

    for (let j in results) {
        let match = results[j];
        extracted.push({
            url: match[2],
            title: isNullOrWhiteSpace(match[3]) ? match[1] : match[3],
        });
    }

    return extracted;
}
