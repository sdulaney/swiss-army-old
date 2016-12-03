// Hacker News
artoo.scrape('td.title:nth-child(3)', {
  title: {sel: 'a'},
  url: {sel: 'a', attr: 'href'}
}, artoo.savePrettyJson);

// Yelp
artoo.scrape('.biz-listing-large', {
  name: {sel: '.biz-name'},
  phone: {sel: '.biz-phone'}
}, artoo.savePrettyJson);
