const withSass = require('@zeit/next-sass')
const withCss = require('@zeit/next-css')

// module.exports = withPlugins([
//   withCss,
//   [
//     withSass,
//     {
//       cssModules: true,
//     },
//   ],
// ])

module.exports = withSass(
  withCss({
    cssModules: true,
  })
)
