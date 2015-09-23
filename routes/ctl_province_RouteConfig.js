var express = require('express');
var router = express.Router();

var dbc = require('../model/dbmodel_province');

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


module.exports = router;