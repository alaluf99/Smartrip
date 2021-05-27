module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.devServer.disableHostCheck = true;
    return config;
}
