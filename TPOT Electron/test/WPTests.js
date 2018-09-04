var wordpress = require('wordpress');

var client = wordpress.createClient({
    url: "https://www.thepathoftruth.com",
    username: "michael.n.preston@gmail.com",
    password: "Mintsharp18!"
});

describe('Get Posts from WP()', () => {
    client.getPosts((error, posts) => {
        console.log('Found ' + posts.length + " posts!");
    })

    //Works!  Just commenting out so as not to spam TPOT.
    // client.newPost({
    //     title: "Hello from NodeJS!",
    //     content: "This is a test message from the new Letters program!"
    // }, (error, data) => console.log('error: ', error));
})