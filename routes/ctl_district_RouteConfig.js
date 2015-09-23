var express = require('express');
var router = express.Router();

var dbc = require('../model/dbmodel_district');

/* GET home page. */

//SELECT ROUTE
router.get("/getAllDistrict/:id", function(reqeust,response){   
    
    console.log('Check Route getAll = '+reqeust);
    
    dbc.connect(function(err){
        dbc.getData(reqeust.params.id, function(err,data){
            console.log('Check Callback error = '+err);
            console.log('Check Callback Data = '+data);
            response.json(data);
        });
    });
});
//-------------------------------------------------


module.exports = router;