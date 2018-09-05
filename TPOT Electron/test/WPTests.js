var WPAPI = require('wpapi');
var wordpress = new WPAPI({
    // endpoint: "https://www.thepathoftruth.com/",
    endpoint: "https://www.thepathoftruth.com/wp-json",
    // endpoint: "https://www.thepathoftruth.com/wp-admin/edit.php?post_type=post&author=3",
    username: 'michael.n.preston@gmail.com',
    password: "MercuryMedium10!"
})



describe('Get Posts from WP()', () => {

    const html = "<div><p class=\"p element-0\"></p><p class=\"p element-1\"><span class=\"r element-2\">The Case for Coming Out &lt;http://www.thepathoftruth.com/teachings/case-for-coming-out-church-system-churches.htm&gt;</span></p><p class=\"p element-3\"></p><p class=\"p element-4\"><span class=\"r element-5\">Also read the following:</span></p><p class=\"p element-6\"></p><p class=\"p element-7 Heading1\"><span class=\"r element-8\">Heading 1</span></p><p class=\"p element-9\"></p><p class=\"p element-10\"><span class=\"r element-11\">The Origin and Identity of Satan &lt;http://www.thepathoftruth.com/teachings/origin-identity-satan.htm&gt;</span></p><p class=\"p element-12\"><span class=\"r element-13\">'</span><span class=\"r element-14\">Satans Redemption &lt;http://www.thepathoftruth.com/false-teachers/derek-prince.htm&gt;</span></p><p class=\"p element-15\"><span class=\"r element-16\">Giants Who Bring Humanity Down &lt;http://www.thepathoftruth.com/false-teachers/douglas-hamp.htm&gt;</span></p><p class=\"p element-17\"></p><p class=\"p element-18\"><span class=\"r element-19\">And more about our salvation and living the life of faith in Christ:</span></p><p class=\"p element-20\"></p><p class=\"p element-21\"><span class=\"r element-22\">Obedience &lt;http://www.thepathoftruth.com/teachings/obedience.htm&gt;</span></p><p class=\"p element-23\"><span class=\"r element-24\">How One Is Saved &lt;http://www.thepathoftruth.com/teachings/how-one-is-saved.htm&gt;</span></p><p class=\"p element-25\"><span class=\"r element-26\">The Cross - Only the Death Sentence Will Avail </span><a><span class=\"r element-27 Hyperlink\">http://www.thepathoftruth.com/teachings/the-cross-only-death-sentence-will-avail.htm</span></a><a name=\"_GoBack\"></a></p><p class=\"p element-28\"></p><p class=\"p element-29 Hyperlink\"><span class=\"r element-30\"></span><span class=\"r element-31\"></span><span class=\"r element-32\"></span><span class=\"r element-33 Hyperlink\">READ MORE</span></p><p class=\"p element-34\"><span class=\"r element-35\"></span></p><p class=\"p element-36\"><span class=\"r element-37\"></span></p><p class=\"p element-38\"></p><p class=\"p element-39\"><span class=\"r element-40\">Styles:</span></p><p class=\"p element-41\"><span class=\"r element-42\">Bold</span><span class=\"r element-43\">,</span></p><p class=\"p element-44\"><span class=\"r element-45\">Italic</span></p><p class=\"p element-46\"><span class=\"r element-47\">Underline</span></p><p class=\"p element-48\"><span class=\"r element-49\">Bold underline</span></p><p class=\"p element-50\"><span class=\"r element-51\">Bold italic</span></p><p class=\"p element-52\"><span class=\"r element-53\">Italic underlined</span></p><p class=\"p element-54\"><span class=\"r element-55\">Bold italic underlined</span></p><p class=\"p element-56 Heading1\"><span class=\"r element-57\">Heading1</span></p><p class=\"p element-58 Heading2\"><span class=\"r element-59\">Heading2</span></p><p class=\"p element-60\"></p></div>";

    //Discovery:

    //Find pages:
    console.log('wordpress api: ', wordpress);
    wordpress.pages().then(function (data) {
        // do something with the returned posts
        console.log('got data! - \n', data);
        console.log('data ^^^^', );

    }).catch(function (err) {
        // handle error
        if (err) console.log('got Error!');
    });

    // console.log('', wordpress.posts());


    // wordpress.posts().author(3).then(function (data) {
    //     console.log('got data for Victor\n', data);
    // }).catch(() => {
    //     console.log('got Error - ', );
    // });

    // client.posts().get((error, data) => {
    //     // if (error)
    //     //     console.log('An error occured when getting posts! - \n', error);
    //     console.log('data: ', data);
    //     // console.log('# of posts -:\n', resolve.posts.length);
    // })

    // client.newPost({
    //     title: "Html post test",
    //     content: html
    // }, (error, data) => {
    //     if (error) console.log('error: ', error)
    // });

    // client.newPost({
    //     title: "Hello from NodeJS!",
    //     content: "This is a test message from the new Letters program!"
    // }, (error, data) => {
    // if (error) console.log('error: ', error)
    // });
})