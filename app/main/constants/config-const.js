'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'RECENT_URL': 'http://beastmemes.com/api/get_recent_posts/',
    'POST_URL': 'http://beastmemes.com/api/get_post/',
    'CATEGORIES_URL': 'http://beastmemes.com/api/get_category_index/',
    'CATEGORY_URL': 'http://beastmemes.com/api/get_category_posts/',
    'TAGS_URL': 'http://beastmemes.com/api/get_tag_index/',
    'TAG_URL': 'http://beastmemes.com/api/get_tag_posts/',
    'DATES_URL': 'http://beastmemes.com/api/get_date_index/',
    'AUTHORS_URL': 'http://beastmemes.com/api/get_author_index/',
    'AUTHOR_URL': 'http://beastmemes.com/api/get_author_posts/',
    'SEARCH_URL': 'http://beastmemes.com/api/get_search_results/'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
