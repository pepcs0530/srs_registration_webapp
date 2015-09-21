function dbmodel(){

    this.online = "dbmodel is working";
    var mysql = require('mysql');
    var config = {
        host : "localhost",
        user : "root",
        password : "1234",
        database : "srs_webapp"
    }
    
    var db = null;
    
    this.connect = function (callback) {
        db = mysql.createConnection(config);
        db.connect(function(err){
            if(err) 
                
                console.log(err);
            
            callback(err);
            console.log('Connection Start Successfully.');
        });
    }
    
    //SELECT------------------------------------------------------------
    this.getData = function(id,callback) {
        var sql = "SELECT * FROM ctl_title WHERE ACTIVE = 1 ORDER BY TITLE_CODE DESC ";
        
        if(id>0) sql = "SELECT * FROM ctl_title  WHERE TITLE_CODE = "+id
        
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
    
    
    //INSERT------------------------------------------------------------
    this.insertData = function(data,callback){
        var sql = "INSERT INTO ctl_title SET ?";
        db.query(sql,data,function(err,data){
            
            //
            if(err){
                console.log(err); 
                callback({status : 'error'});   console.log('Have Erroe'); 
            }else{
                callback({status : 'successful'});
                console.log(err,data);      console.log('Have Done');
            }
        });
        
        db.end(function (err){
                if(err){
                    throw err;
                }
                console.log('Connection Close Successfully.');
        });
    }
    
    //UPDATE------------------------------------------------------------
    this.updateData = function(data,callback){ 
    
//        var sql = "UPDATE student SET name='"+username+"', surname='"+surname+"',sex='"+sex+"' WHERE id = "+id;
        var sql = "UPDATE ctl_title SET TITLE_NAME = ?, TITLE_NAME_ENG = ?, SEX = ?, UPDATE_DATE = ? WHERE TITLE_CODE = ?";
        
        db.query(sql,[
        
                
                data.Name,
                data.NameEng,
                data.Sex,
                new Date(),
                data.Code
        
        ],function(err,data){
            //
            if(err){
                console.log(err); 
                callback({status : 'error'});   console.log('Have Error'); 
            }else{
                callback({status : 'successful'});
                console.log(err,data);      console.log('Have Done');
            }
            //
        });
        
        db.end(function (err){
                if(err){
                    throw err;
                }
                console.log('Connection Close Successfully.');
        });
    };
    
    //DELETE------------------------------------------------------------
    this.deleteData = function(data,callback){ 
    
//        var sql = "UPDATE student SET name='"+username+"', surname='"+surname+"',sex='"+sex+"' WHERE id = "+id;
        //var sql = "UPDATE ctl_title SET ACTIVE = ? WHERE TITLE_CODE = ?";
        var sql = "UPDATE ctl_title SET ?? = ? WHERE TITLE_CODE IN(?)";
        
        //db.query(sql,[0,data.Code],function(err,data){
        db.query(sql,data,function(err,data){
            //
            if(err){
                console.log(err); 
                callback({status : 'error'});   console.log('Have Error'); 
            }else{
                callback({status : 'successful'});
                console.log(err,data);      console.log('Have Done');
            }
            //
        });
        
        db.end(function (err){
                if(err){
                    throw err;
                }
                console.log('Connection Close Successfully.');
        });
    };

    //update ALL------------------------------------------------------------
    this.deleteAll = function(data,callback){ 
    
//        var sql = "UPDATE student SET name='"+username+"', surname='"+surname+"',sex='"+sex+"' WHERE id = "+id;
        var sql = "UPDATE ctl_title SET ??=? WHERE TITLE_CODE IN(?)";
        
        db.query(sql,data,function(err,data){
            //
            if(err){
                console.log(err); 
                callback({status : 'error'});   console.log('Have Error'); 
            }else{
                callback({status : 'successful'});
                console.log(err,data);      console.log('Have Done');
            }
            //
        });
        
        db.end(function (err){
                if(err){
                    throw err;
                }
                console.log('Connection Close Successfully.');
        });
    };
    
}
module.exports = new dbmodel();