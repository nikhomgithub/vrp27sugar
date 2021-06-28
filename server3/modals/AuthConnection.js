const mongoose = require('mongoose');

function makeConnection(uri) {
    console.log('Auth 1')
    const db = mongoose.createConnection(uri, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Auth 2')

    db.on('error', function (error) {
        console.log(`MongoDB error :: connection ${this.name} ${JSON.stringify(error)}`);
        db.close().catch(() => console.log(`MongoDB :: failed to close connection ${this.name}`));
    });

    db.on('connected', function () {
        mongoose.set('debug', function (col, method, query, doc) {
            console.log('AUTH_MONGO_URI debug')
            //console.log(`MongoDB debug :: ${this.conn.name} ${col}.${method}(${JSON.stringify(query)},${JSON.stringify(doc)})`);
        });
        console.log(`AUTH_MONGO_URI connected :: connected ${this.name}`);
    });

    db.on('disconnected', function () {
        console.log(`MongoDB disconnected :: disconnected ${this.name}`);
    });

    return db;
}

const authConnection = makeConnection(process.env.AUTH_MONGO_URI);

module.exports = {
    authConnection
};