/**

  Generate the binary file.

  $ grunt generate-binary

  @author     David Linse <davidlinse@gmail.com>
  @version    0.2.0
  @license    MIT

*/

module.exports = function(grunt) {

  'use strict';

  grunt.registerTask('generate-binary', function() {

    var shebang = grunt.file.read('fixtures/binary-header');
    var footer  = grunt.file.read('fixtures/binary-footer');

    var opts = {
      process: function(content) {
        return shebang +'\n' +
               content + '\n' +
               footer + '\n';
      }
    };

    var src = grunt.config.process('lib/<%= pkg.name %>.js');
    var dest = grunt.config.process('bin/<%= pkg.name %>');

    grunt.file.mkdir('bin');

    grunt.file.copy(src, dest, opts);

    require('fs').chmodSync(dest, '755');
  });
};
