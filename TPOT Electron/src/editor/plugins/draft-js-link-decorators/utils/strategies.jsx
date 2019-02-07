// Note: these aren't very good regexes, don't use them!
const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const URL_REGEX = /(https?:\/\/|www)+([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?/g

// const MARKUP_REGEX_old = /\[?([a-zA-Z&\s\d-]+)?\]?(?:[\s\(]+?)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)/
const MARKUP_REGEX = /\[+([\w\s\d,&!?-]+)+\]+(?:[\s\(]+?)+([\w\s@#$%:=+~,._\/~#=-]{2,256})(?:[\S\)])+/g
const MASTER_REGEX = /(\[[a-zA-Z\s\d-]+\])?(?:[\s\(]+?)?(?:url=\s*)?([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(\][a-zA-Z\s\d-]+\[)?/g
const SHORT_CODE_REGEX = /[\burl=\b\s][\s<]*([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(?:\])([a-zA-Z\s\d&$-!]+)?(?:\[)/g

const isNullOrWhiteSpace = input => !input || !input.trim();
/**
 * Returns the extracted urls & titles, keyed to their respective types, e.g. {url: "https...", title: "The Issues of Life"}
 */
function extract(lines, pattern) {
    let results = lines.map(line => line.match(pattern));
    let extracted = [];

    for (let i in results) {
        let match = results[i];
        if (match[2] === undefined)
            continue;
        if(match.every(m=>m===undefined)){
            throw Error('Matches cannot all be undefined (null)!')
            //todo: log this error using a logging package.
        }
        extracted.push({
            url: match[2],
            title: isNullOrWhiteSpace(match[3]) ? match[1] : match[3],
        });
    }

    return extracted;
}

function entity(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

function generic(contentBlock, callback, contentState) {
    findWithRegex(URL_REGEX, contentBlock, callback);
}

function markup(contentBlock, callback, contentState) {
    findWithRegex(MARKUP_REGEX, contentBlock, callback);
}

function findWithRegex(regex, contentBlock, callback, contentState, b, c, d) {
    // console.log(regex)
    // console.log(contentBlock)
    // console.log(callback)
    // console.log(contentState)
    // console.log(b)
    // console.log(c)
    // console.log(d)
    const TEXT = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(TEXT)) !== null) {
        start = matchArr.index;
        callback(start, start + matchArr[0].length);
    }
    // const TEXT = contentBlock.getText();
    // let matchArr, start;
    // while ((matchArr = regex.exec(TEXT)) !== null) {
    //     start = matchArr.index;
    //     callback(start, start + matchArr[0].length);
    // }
}

export {
    entity,
    generic,
    URL_REGEX,
    markup,
    MARKUP_REGEX,
    MASTER_REGEX,
}