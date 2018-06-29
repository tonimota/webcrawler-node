var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var axios = require('axios');

axios.get('http://www.imdb.com/chart/moviemeter')
  .then(response => {
    var $ = cheerio.load(response.data);
    console.log($);
    $('.lister-list tr').each(function() {
        var title = $(this).find('.titleColumn a').text().trim();
        var rating = $(this).find('.imdbRating strong').text().trim();
        console.log('Titulo: ' + title);
        console.log('Rating: ' + rating);
        fs.appendFile('imdb.txt', title + ' ' + rating + '\n');
    })
  })
  .catch(error => {
    console.log(error);
  });