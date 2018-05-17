using System;
using System.Reflection;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using WordPressSharp;
using WordPressSharp.Models;

namespace WordpressTests
{
    [TestClass]
    public class WordpressTests
    {
        private WordPressSiteConfig siteConfiguration;

        [TestInitialize]
        public void Init()
        {
            siteConfiguration = new WordPressSiteConfig
            {
                BaseUrl = "www.thepathoftruth.com",
                BlogId = 1, //find out
                Username = "braden",
                Password = "mercury10"
            };
        }

        //from: https://brudtkuhl.com/using-wordpresssharp-publish-post/
        [TestMethod]
        public void PublishPostTest()
        {
            // create a new Post in WordPress
            var post = new Post
            {
                PostType = "post", // "post" or "page"
                Title = "Using WordPressSharp",
                Content = "<p>WordPressSharp is a C# utility for interfacing with the WordPress XML-RPC API</p>",
                PublishDateTime = DateTime.Now,
                Status = "draft" // "draft" or "publish"
            };

            var customFields = new[]
            {
                new CustomField
                {
                    Key= "my_custom_field",
                    Value ="My Custom Value"
                },
                new CustomField
                {
                    Key = "another_custom_field",
                    Value = "Yet another"
                }
            };

            post.CustomFields = customFields;

            using (var client = new WordPressClient(siteConfiguration))
            {
                Assert.Inconclusive("not ready, get permission first!");
                string id = client.NewPost(post);
            }
        }


        [TestMethod]
        public void CreatePost()
        {
            using (var client = new WordPressClient(siteConfiguration))
            {
                var post = new Post
                {
                    PostType = "post",
                    Title = "My Awesome Post",
                    Content = "<p>This is the content</p>",
                    PublishDateTime = DateTime.Now,
                    Author = "Michael Preston"
                };

                Assert.Inconclusive("not ready, get permission first!");
                int id = Convert.ToInt32(client.NewPost(post));
            }
        }

        [TestMethod]
        public void CreatePostTag()
        {
            using (var client = new WordPressClient(siteConfiguration))
            {
                Assert.Inconclusive("not ready, get permission first!");

                string termId = client.NewTerm(new Term
                {
                    Name = "term test",
                    Description = "term description",
                    Slug = "term_test",
                    Taxonomy = "post_tag"
                });
            }
        }


        [TestMethod]
        public void CreateFeatureImage()
        {
            Assert.Inconclusive("not ready, get permission first!");

            string url = "https://unsplash.imgix.net/photo-1423683249427-8ca22bd873e0";
            using (var client = new WordPressClient())
            {
                var post = new Post
                {
                    PostType = "post",
                    Title = "New photo from Unsplash",
                    Content = "<p>Check out this new picture from Unsplash.</p>",
                    PublishDateTime = DateTime.Now
                };

                var featureImage = Data.CreateFromUrl(url);
                post.FeaturedImageId = client.UploadFile(featureImage).Id;

                int id = Convert.ToInt32(client.NewPost(post));
            }
        }
    }
}
