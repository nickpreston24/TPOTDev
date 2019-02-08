export const MARKUP_BRACKET = /\//g
export const MARKUP_REGEX = /\[+([\w\s\d,&!?-]+)?\]+(?:[\s\(]+?)([\w\s@#$%:=+~,._\/\~#=-][^\n]{2,256})(?:[\S\)][^a-])/g
// export const SHORT_CODE_REGEX = /[\burl=\b\s][\s<]*([(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b[-a-zA-Z0-9@:%_\+.~#?&//=]*)(?:\])([a-zA-Z\s\d&$-!]+)?(?:\[)/g
export const GENERIC_REGEX = /(https?:\/\/|www)+([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?/g

// : Decorator Strategy Functions

export const bracket = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(MARKUP_BRACKET, contentBlock, callback)

export const markup = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(MARKUP_REGEX, contentBlock, callback)

export const shortcode = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(MARKUP_REGEX, contentBlock, callback)

export const generic = (contentBlock, callback) =>
    findDecoratorRangesWithRegex(GENERIC_REGEX, contentBlock, callback)

export const entity = (contentBlock, callback, contentState) =>
    findDecoratorRangesWithEntity(contentBlock, callback, contentState)

// : Decorator from Regular Expression
export const findDecoratorRangesWithRegex = (regex, contentBlock, callback) => {
    const TEXT = contentBlock.getText()
    let matchArr, start
    while ((matchArr = regex.exec(TEXT)) !== null) {
        start = matchArr.index
        callback(start, start + matchArr[0].length)
    }
}

// : Decorator from Entity
export const findDecoratorRangesWithEntity = (contentBlock, callback, contentState) => {
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

// : Entity from Regular Expression
export const findEntityRangesWithRegex = (regex, contentBlock) => {
    let results = []
    const TEXT = contentBlock.getText()
    let matchArr, start
    while ((matchArr = regex.exec(TEXT)) !== null) {
        start = matchArr.index
        results.push(start, start + matchArr[0].length)
    }
    return results
}


// TODO - Extra Utilities?
export const isNullOrWhiteSpace = (input) => !input || !input.trim();

/**
 * Returns the extracted urls & titles, keyed to their respective types, e.g. {url: "https...", title: "The Issues of Life"}
 */
// ? Don't think this is needed anymore
export const extract = (lines, pattern) => {
    let results = lines.map(line => line.match(pattern));
    let extracted = [];
    for (let i in results) {
        let match = results[i];
        if (match[2] === undefined)
            continue;
        if (match.every(m => m === undefined)) {
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