const expect = require('chai').expect

const html = `<div><p class=\"p element-0\"></p><p class=\"p element-1\"><span class=\"r element-2\">The Case for Coming Out &lt;http://www.thepathoftruth.com/teachings/case-for-coming-out-church-system-churches.htm&gt;</span></p><p class=\"p element-3\"></p><p class=\"p element-4\"><span class=\"r element-5\">Also read the following:</span></p><p class=\"p element-6\"></p><p class=\"p element-7 Heading1\"><span class=\"r element-8\">Heading 1</span></p><p class=\"p element-9\"></p><p class=\"p element-10\"><span class=\"r element-11\">The Origin and Identity of Satan &lt;http://www.thepathoftruth.com/teachings/origin-identity-satan.htm&gt;</span></p><p class=\"p element-12\"><span class=\"r element-13\">'</span><span class=\"r element-14\">Satans Redemption &lt;http://www.thepathoftruth.com/false-teachers/derek-prince.htm&gt;</span></p><p class=\"p element-15\"><span class=\"r element-16\">Giants Who Bring Humanity Down &lt;http://www.thepathoftruth.com/false-teachers/douglas-hamp.htm&gt;</span></p><p class=\"p element-17\"></p><p class=\"p element-18\"><span class=\"r element-19\">And more about our salvation and living the life of faith in Christ:</span></p><p class=\"p element-20\"></p><p class=\"p element-21\"><span class=\"r element-22\">Obedience &lt;http://www.thepathoftruth.com/teachings/obedience.htm&gt;</span></p><p class=\"p element-23\"><span class=\"r element-24\">How One Is Saved &lt;http://www.thepathoftruth.com/teachings/how-one-is-saved.htm&gt;</span></p><p class=\"p element-25\"><span class=\"r element-26\">The Cross - Only the Death Sentence Will Avail </span><a><span class=\"r element-27 Hyperlink\">http://www.thepathoftruth.com/teachings/the-cross-only-death-sentence-will-avail.htm</span></a><a name=\"_GoBack\"></a></p><p class=\"p element-28\"></p><p class=\"p element-29 Hyperlink\"><span class=\"r element-30\"></span><span class=\"r element-31\"></span><span class=\"r element-32\"></span><span class=\"r element-33 Hyperlink\">READ MORE</span></p><p class=\"p element-34\"><span class=\"r element-35\"></span></p><p class=\"p element-36\"><span class=\"r element-37\"></span></p><p class=\"p element-38\"></p><p class=\"p element-39\"><span class=\"r element-40\">Styles:</span></p><p class=\"p element-41\"><span class=\"r element-42\">Bold</span><span class=\"r element-43\">,</span></p><p class=\"p element-44\"><span class=\"r element-45\">Italic</span></p><p class=\"p element-46\"><span class=\"r element-47\">Underline</span></p><p class=\"p element-48\"><span class=\"r element-49\">Bold underline</span></p><p class=\"p element-50\"><span class=\"r element-51\">Bold italic</span></p><p class=\"p element-52\"><span class=\"r element-53\">Italic underlined</span></p><p class=\"p element-54\"><span class=\"r element-55\">Bold italic underlined</span></p><p class=\"p element-56 Heading1\"><span class=\"r element-57\">Heading1</span></p><p class=\"p element-58 Heading2\"><span class=\"r element-59\">Heading2</span></p><p class=\"p element-60\"></p></div>`;
const author = "Michael Preston"

var {
    WPAPI,
    wpapi
} = initializeTests();

//Creation (Pages):
describe.skip('Create WP Pages', () => {
    it('should create a page', () => {

        wpapi.pages().create({
                title: 'Raw Html Test Page 1',
                content: html,
                // categories : "",
                // author: author,
                status: 'draft'
            }).then(
                expect((response, reject) => {
                    // "response" will hold all properties of your newly-created post, including the unique `id` the post was assigned on creation
                    // console.log(response.id);
                    if (response) console.log('response: ', response);
                    if (reject) console.log('Rejection ', reject);
                }).does.not.throw())
            .catch((error) => {
                if (error) console.log('ERROR: ', error)
            })
    })
})

//Creation (Posts):
describe.skip('Create WP Posts', () => {
    it('should create a post', () => {
        wpapi.posts().create({
            title: 'Raw Html Test Post 1',
            content: html,
            // categories : "",
            status: 'draft'
        }).then(function (response) {
            // "response" will hold all properties of your newly-created post,
            // including the unique `id` the post was assigned on creation
            console.log(response.id);
        }).catch((error) => console.log('ERROR: ', error))
    })
})

//Discovery:
describe.skip('Discover WP site', () => {

    it('should discover and configure for authentication', () => {
        var apiPromise = WPAPI.discover('https://www.thepathoftruth.com/wp-json')
            .then(site => {
                return site.auth({
                    username: 'michael.n.preston@gmail.com',
                    password: 'MercuryMedium10!'
                });
            });
        apiPromise.then(site => {
            // site is now configured to use authentication
            if (site) console.log('Site promise: ', site);
            // if (resolve) console.log('\n\nResolve: ', resolve);
        })        
    })
})

//Find pages:
describe.skip('Get Posts from WP()', () => {

    it('should get all pages', () => {

        console.log('wordpress api: ', wpapi);
        wpapi.pages()
            .then(function (data) {
                // console.log('got data! - \n', data);
                console.log('data ^^^^', data.length);
            }).catch(function (err) {
                // handle error
                if (err) console.log('got Error!');
            });
    })
})


function initializeTests() {
    var WPAPI = require('wpapi');
    /* WPAPI */
    var wpapi = new WPAPI({
        endpoint: "https://www.thepathoftruth.com/wp-json",
        username: 'michael.n.preston@gmail.com',
        password: "MercuryMedium10!",
    });
    return {
        WPAPI,
        wpapi
    };
}