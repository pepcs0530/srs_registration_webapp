app
.controller("ctl_universityController",ctl_universityController);

function ctl_universityController($scope,$http,$filter,$timeout){
    
    $scope.controllerName = "ตารางมหาวิทยาลัย";
    
    //------------------------------------------------------------------------
    //สถานะ
    $scope.University = {
        Active: true
    };
    
    $scope.onChange = function(cbState) {
        $scope.message = "The switch is now: " + cbState;
    };
    
    //------------------------------------------------------------------------
    //SELECT
    getdata(); 
    function getdata() {
    //$scope.getdata = function(){
        $http.get("/ctl_university/getAll").success(function(response){ 
            $scope.ctl_universities = response;  
            console.log('response = '+$scope.ctl_universities);
            
            $scope.dataSelected.alldata=[];
            angular.forEach($scope.ctl_universities,function(ctl_university){
                    $scope.dataSelected.alldata.push(ctl_universities.UNIVERSITY_PK);
            });
        });
    }
    //------------------------------------------------------------------------
}