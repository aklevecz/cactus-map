module.exports = {
  webpack: config => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    }
    config.module.rules.push({
      test: /\.svg$/,
      use: ["file-loader"],
      // options: {
      //   outputPath: 'images',
      // },
    });
    return config
  }
}
