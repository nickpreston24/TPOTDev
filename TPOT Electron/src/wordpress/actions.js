import { wp } from './wordpress'

const createPage = (wordpressCredentials, draftState, pageConfig) => {
    // Add Authentication information to existing WPAPI instance
    wp._options = {
        ...wp._options,
        username: wordpressCredentials.username,
        password: wordpressCredentials.password,
    }
    // These are Default Options assuming that ...pageConfig has no values
    let options = {
        ...pageConfig,
        content: draftState? draftState : '<p>This is a default post</p>',
        status: 'pending',
        meta: {
            author: 'z6onX6acVvOZbNcirQCDGMIiIQi2',
            key: 'lePmMgx6AYDc5H2MDDIn'
        },
        author: 3,
        date: new Date(),
    }
    // Create the page and do error checking here.
    wp.pages().create(options)
        .then((response, reject) => {
            response && console.log('response: ', response)
            reject && console.log('Rejection ', reject)
        }).catch((error) => {
            if (error) console.error('ERROR: ', error)
        })

}

export {
    createPage,
}