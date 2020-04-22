const path = require('path');
module.exports = {
  components: 'src/components/**/[A-Z]*.tsx',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/ThemeWrapper')
  }
}
