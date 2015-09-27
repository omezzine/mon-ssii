module.exports = function() {

    var mongoose = require('mongoose'),
        config = require('./config');

    // Connect to mongodb
    var options = {
        db: {
            native_parser: true
        },
        server: {
            poolSize: 5
        },
        user: appConfig.database['USER_NAME'],
        pass: appConfig.database['PASSWORD']
    };

    mongoose.connect(config.db, options);

    connect();

    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);

}