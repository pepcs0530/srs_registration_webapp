function dbmodel_university(){

    this.online = "dbmodel is working";
    var mysql = require('mysql');
    var config = {
        host : "localhost",
        user : "root",
        password : "1234",
        database : "srs_new"
    }
    
    var db = null;
    
    this.connect = function (callback) {
        //db = mysql.createConnection(config);
        db = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);
        db.connect(function(err){
            if(err) 
                
                console.log(err);
            
            callback(err);
            console.log('Connection Start Successfully.');
        });
    }
    
}
module.exports = new dbmodel_university();