'use strict';
angular.module('main')
.constant('Config', {

  // gulp environment: injects environment vars
  ENV: {
    /*inject-env*/
    'RECENT_URL': 'http://beastmemes.com/api/get_recent_posts/',
    'CATEGORIES_URL': 'http://beastmemes.com/api/get_category_index/',
    'TAGS_URL': 'http://beastmemes.com/api/get_tag_index/'
    /*endinject*/
  },

  // gulp build-vars: injects build vars
  BUILD: {
    /*inject-build*/
    /*endinject*/
  }

});
