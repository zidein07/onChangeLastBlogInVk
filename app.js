var Nightmare = require('nightmare');

var nightmare = Nightmare({show: false});

var notifier = require('node-notifier');


var lastBlog = '';
var itar = 0;


getLastPost();

function getLastPost() {
    nightmare
        .goto('http://vk.com/sasha_tikhomirov' + '#' + itar)
        .evaluate(function () {
            return document.querySelector('#page_wall_posts .post.all.own .wall_post_text').textContent;
        })
        .then(function (result) {
            if (lastBlog !== result) {
                notifier.notify({
                    'title': 'Новая запись!',
                    'message': result,
                    sound: true,
                    time: 100000,
                    wait: true
                });
            }
            setTimeout(function () {
                getLastPost();
                itar++;
            }, 1000);
            lastBlog = result;
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        });
}