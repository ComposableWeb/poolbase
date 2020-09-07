const path = require('path');
module.exports = {
  components: 'src/components/**/[A-Z]*.tsx',
  styleguideDir: '../../docs/styleguide',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/ThemeWrapper')
  }
}
