const {addAliases} = require('module-alias');
const path = require('path');
addAliases({
    '@themost/array': path.resolve(process.cwd(), 'src/index')
});
