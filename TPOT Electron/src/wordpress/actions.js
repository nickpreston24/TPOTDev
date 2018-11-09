import {
    wp
} from './wordpress'

const getCatg = async() => {
    wp.categories().then((response) => {
        response.forEach(r => {
            console.log(r)
        })
    })
}

const createPage = (wordpressCredentials, pageConfig) => {
    // Add Authentication information to existing WPAPI instance
    wp._options = {
        ...wp._options,
        username: wordpressCredentials.username,
        password: wordpressCredentials.password,
    }
    // These are Default Options assuming that ...pageConfig has no values
    let options = {
        ...pageConfig,
        status: 'pending',
        author: 3, // Victor Hafichuk
        categories: [496], // letters
        date: new Date(), // publish time
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
    getCatg,
}