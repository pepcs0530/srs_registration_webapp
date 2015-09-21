var express = require('express');
var router = express.Router();

var dbc = require('../model/dbmodel');

/* GET home page. */

//SELECT ROUTE
router.get("/getAll", function(reqeust,response){   
    
    console.log('Check Route getAll = '+reqeust);
    
    dbc.connect(function(err){
        dbc.getData(0,function(err,data){
            console.log('Check Callback error = '+err);
            console.log('Check Callback Data = '+data);
            response.json(data);
        });
    });
});
//-------------------------------------------------
//INSERT ROUTE
router.post("/addData", function(request,response){
    dbc.connect(function(err){
        dbc.insertData(request.body,function(data){
            response.json(data);
        });
    });
});
//-------------------------------------------------
//UPDATE ROUTE
router.put("/updateData", function(request,response){ 
    dbc.connect(function(err){
        dbc.updateData(request.body,function(data){ console.log('request.body'+request.body);
            response.json(data);           
        });
    });
});
//-------------------------------------------------
//DELETE ROUTE
router.put("/deleteData", function(request,response){
    var newdata = [columns=['ACTIVE'],values=['0'],request.body];
    dbc.connect(function(err){
        //dbc.deleteData(request.body,function(data){ console.log('request.body'+request.body);
        dbc.deleteData(newdata,function(data){ console.log('request.body'+newdata);
            response.json(data);           
        });
    });
});
//-------------------------------------------------
//DELETE ALL ROUTE
router.post('/deleteAll', function(request, response) {
    var newdata = [columns=['ACTIVE'],values=['0'],request.body];
      dbc.connect(function(err){
        dbc.updateAll(newdata,function(data){
            response.json(data);
        });
    });
});
//-------------------------------------------------

module.exports = router;