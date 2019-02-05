// Note: these aren't very good regexes, don't use them!
const HANDLE_REGEX = /\@[\w]+/g;
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
const URL_REGEX = /(https?:\/\/|www)+([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-])*\/?/g

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
}