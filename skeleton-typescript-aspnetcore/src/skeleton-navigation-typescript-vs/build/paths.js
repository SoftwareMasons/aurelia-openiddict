var appRoot = 'src/';
var outputRoot = 'wwwroot/dist/';
var exportSourceRoot = 'wwwroot/';
var exporSrvtRoot = 'export/'

module.exports = {
  root: appRoot,
  source: appRoot + '**/*.ts',
  html: appRoot + '**/*.html',
  css: 'styles/**/*.css',
  output: outputRoot,
  cssOutput: exportSourceRoot + 'css',
  exportSourceRoot: exportSourceRoot,
  exportSrv: exporSrvtRoot,
  doc: './doc',
  e2eSpecsSrc: 'test/e2e/src/**/*.ts',
  e2eSpecsDist: 'test/e2e/dist/',
  dtsSrc: [
    'typings/browser/**/*.d.ts',
    'custom_typings/**/*.d.ts',
    './wwwroot/jspm_packages/**/*.d.ts'
  ]
}
