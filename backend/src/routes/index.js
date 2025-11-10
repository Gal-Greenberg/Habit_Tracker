module.exports = function (router) {
    require('fs').readdirSync(__dirname).forEach(function (file) {
        if (file != 'index.js') {
            require('./' + file)(router)
        }
    });
};
