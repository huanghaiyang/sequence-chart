module.exports = function (grunt) {
    grunt.initConfig({
        pkgFile: 'package.json',
        clean: ['dist'],
        babel: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './lib',
                    src: ['*.js'],
                    dest: 'dist',
                    ext: '.js'
                }]
            }
        },
        watch: {
            dist: {
                files: ['./lib/*.js'],
                tasks: ['babel:dist']
            }
        }
    })

    require('load-grunt-tasks')(grunt)
    grunt.registerTask('default', ['build'])
    grunt.registerTask('build', 'Build sequence chart', function () {
        grunt.task.run([
            'clean',
            'babel'
        ])
    })
}
