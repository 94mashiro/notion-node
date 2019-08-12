const { name } = require('./package.json')
const path = require('path')

module.exports = {
  apps: [
    {
      name,
      interpreter: path.resolve(__dirname, './node_modules/.bin/ts-node'),
      interpreter_args: '-r tsconfig-paths/register',
      script: path.resolve(__dirname, './src/index.ts'),
      instances: require('os').cpus().length,
      autorestart: true,
      watch: true,
      env_production: {
        NODE_ENV: 'production',
        PORT: 8080,
      },
    },
  ],
}
