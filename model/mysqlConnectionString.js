var mysqlConnectionString = {
    connection : {
        dev : {
            host : 'localhost',
            user : 'root',
            password : '1234',
            database : 'srs_new'
        },
        
        qa : {
            host : 'localhost',
            user : 'root',
            password : '1234',
            database : 'srs_new'
        },
        
        prod : {
            host: 'localhost',
            user: 'root',
            password : '1234',
            database : 'srs_new'
        }
    }
};
module.exports.mysqlConnectionString = mysqlConnectionString;