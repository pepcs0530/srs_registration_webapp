app
.controller("homeController",homeController);

function homeController($scope,$http){
    $scope.controllerName = "Home"; 
    
    
    $scope.prov = {
        pk:'',
        previous: 'test'
    }
    $scope.amphur = '';
//  

    
    
    //------------------------------------------------------------------------
    //SELECT PROVINCE
    getdata(); 
    function getdata() {
    //$scope.getdata = function(){
        $http.get("/getAll").success(function(response){ 
            $scope.ctl_provinces = response;  
            console.log('response = '+$scope.ctl_provinces);
            
//            $scope.dataSelected.alldata=[];
//            angular.forEach($scope.ctl_titles,function(ctl_titles){
//                    $scope.dataSelected.alldata.push(ctl_titles.TITLE_CODE);
            });
//        $scope.data = "";
//        $scope.checkEdit = true;
    }
    //------------------------------------------------------------------------
    //SELECT AMPHUR
    function getdataAmphur(pk) {
    //$scope.getdata = function(){
        $http.get("/getAllAmphur/"+pk).success(function(response){ 
            $scope.ctl_amphurs = response;  
            console.log('response = '+$scope.ctl_amphurs);
            
//            $scope.dataSelected.alldata=[];
//            angular.forEach($scope.ctl_titles,function(ctl_titles){
//                    $scope.dataSelected.alldata.push(ctl_titles.TITLE_CODE);
            });
//        $scope.data = "";
//        $scope.checkEdit = true;
    }
    //------------------------------------------------------------------------
    //SELECT DISTRICT
    function getdataDistrict(pk) {
    //$scope.getdata = function(){
        $http.get("/getAllDistrict/"+pk).success(function(response){ 
            $scope.ctl_districts = response;  
            console.log('response = '+$scope.ctl_districts);
            
            });
    }
    //------------------------------------------------------------------------

    $scope.changeProv = function(pk){
        console.log("Before select : "+$scope.test);
        if($scope.test != pk) {
            getdataAmphur(pk);
            $scope.test = pk;
            console.log("After select : "+$scope.test);
        }
        
    }
    
    $scope.changeAmphur = function(pk){
        console.log("Before select : "+$scope.test);
        if($scope.test != pk) {
            getdataDistrict(pk);
            $scope.test = pk;
            console.log("After select : "+$scope.test);
        }
    }
    //------------------------------------------------------------------------
}