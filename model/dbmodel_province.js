function dbmodel_province(){
    
    this.online = "dbmodel is working";
    var mysql = require('mysql');
    var mysqlConnectionString = require('./mysqlConnectionString.js');
    
    var db = null;
    
    this.connect = function (callback) {
        db = mysql.createConnection(mysqlConnectionString.mysqlConnectionString.connection.dev);
        db.connect(function(err){
            if(err) 
                
                console.log(err);
            
            callback(err);
            console.log('Connection Start Successfully.');
        });
    }
    
    //SELECT------------------------------------------------------------
    this.getData = function(id,callback) {
        var sql = "SELECT * FROM ctl_province  ORDER BY PROVINCE_PK ASC ";
        
        if(id>0) sql = "SELECT * FROM ctl_province  WHERE PROVINCE_PK = "+id
        
          db.query(sql,function(err,data){
        
            if(err) {
                
                console.log(err);
                throw err;
            }
            
            callback(err,data);
            
        });
        
        db.end(function (err){
                if(err){
                    console.log(err);
                    throw err;
                }
                console.log('Connection Close Successfully.');
            });
    }

}
module.exports = new dbmodel_province();