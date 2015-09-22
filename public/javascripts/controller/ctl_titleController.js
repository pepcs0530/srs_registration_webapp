app
.controller("ctl_titleController",ctl_titleController);

function ctl_titleController($scope,$http,$filter,$timeout){
    
    $scope.controllerName = "ตารางคำนำหน้า"; 
    //-------------------------------------------------------------------------------------------------------------------
    var arrLen ;    //ตัวแปรเก็บจำนวน Obj ใน Array
    
    
    
    var stsBtnAdd = false;
    $("#div-search").show();
    $("#div-add").hide();
    //------------------------------------------------------------------------
    
    //Array ที่ใช้เก็บData ตอนselect
    $scope.dataSelected = {
      alldata:[],
        colum: []
    };
    
    
    
    
    //DELETE ALL Selected
    $scope.updateSelected = function() {
        $http.post("/ctl_title/updateAll",$scope.dataSelected.colum);
    }
    
    //ฟังชั่นcheckAll
    $scope.check = function(condition)   {
        if(condition) 
            $scope.dataSelected.colum = angular.copy($scope.dataSelected.alldata)
        else 
            $scope.dataSelected.colum = [];
    }
    
    //------------------------------------------------------------------------
    $scope.btnSearch = function(title){ 
    
        $scope.searchBy = { 
            Code : title.Code,
            Name : title.Name,
            NameEng : title.NameEng
        }
    }
    
    $scope.rowClick = function(){
    
        $("#set-btn-edit").show();
        $("#set-btn-add").hide();
        $scope.btnCheckDel = false;
        $("#div-search").hide();
        $("#div-add").show();
    }
    
    $scope.clearValue = function(){
        $scope.title = {
            Code : "",
            Name : "",
            NameEng : "",
            Sex : "U"
        }
    }
    
    $scope.btnCancel = function(){
        
        $("#div-search").show();
        $("#div-add").hide();
        $scope.btnCheckDel = true;
        $scope.clearValue();
    }
    
    
    $scope.btnAdd = function(){
        
        
            $scope.btnCheckDel = false;
            //alert('btnCheckDel'+$scope.btnCheckDel);

            $("#div-search").hide();
            $("#div-add").show();
            $("#set-btn-edit").hide();
            $("#set-btn-add").show();
            $scope.title = {
                Code: '',
                Name: '',
                NameEng: '',
                Sex: 'U'
            }
            stsBtnAdd = true;
            $scope.btnCheckDel = true;
        
        
        
    }
    
    $scope.btnDel = function(){
        //alert('btnCheckDel = '+$scope.btnCheckDel);
        $scope.deleteData();
    }
    
    $scope.countArray = function(){
        arrLen = $scope.dataSelected.colum.length;
        alert('arrLeng = '+arrLen);
    }
    //------------------------------------------------------------------------
    
    $scope.checkToDelete = function(){
        arrLen = $scope.dataSelected.colum.length;
        if(arrLen <= 1){
            $scope.deleteData();
            alert("Single Delete");
        }else{
            $scope.deleteSelected();
            alert("Multiple Delete");
        }
    }
    
    //เซ็ตปุ่มลบ
    $scope.btnCheckDel = true;
    $scope.setBtnDel = function(){
        $scope.globlCheck = false;
        if($scope.dataSelected.colum.length > 0){
            $scope.btnCheckDel = false;
        }else{
            $scope.btnCheckDel = true;
        }

    }
    
    //------------------------------------------------------------------------
    //SELECT
    getdata(); 
    function getdata() {
    //$scope.getdata = function(){
        $http.get("/ctl_title/getAll").success(function(response){ 
            $scope.ctl_titles = response;  
            console.log('response = '+$scope.ctl_titles);
            
            $scope.dataSelected.alldata=[];
            angular.forEach($scope.ctl_titles,function(ctl_titles){
                    $scope.dataSelected.alldata.push(ctl_titles.TITLE_CODE);
            });
        });
        $scope.data = "";
        $scope.checkEdit = true;
    }
    //------------------------------------------------------------------------
    
    //INSERT
    var dateFilter = $filter('date');
    var filteredDate = dateFilter(new Date(), 'yyyy-MM-dd hh-mm-ss')
    
    $scope.addData = function(title) {
        
        console.log($scope.title);
        
        $scope.title = {
            TITLE_CODE : title.Code,
            TITLE_NAME : title.Name,
            TITLE_Name_Eng : title.NameEng,
            SEX : title.Sex,
            CREATE_DATE : filteredDate,
            ACTIVE : 1
        };
        
        
        $http.post("/ctl_title/addData", $scope.title).success(function(data){ 
            //เช็ค
            if(data.status && data.status == 'successful'){ 
                        $timeout(function afterTimeOut(){
                            //Clear 
                        },5000);
                        alert("Data posted successfully");
            }else{
                        alert("รหัสคำนำหน้า :"+title.Code+" ซ้ำ กรุณากรอกใหม่");
            }
            //
            console.log("Add Complete");
             getdata();
        });
        
       
    };
    //------------------------------------------------------------------------
    
    //SELECT ROW TO UPDATE
    $scope.editCurrentTitle = function(ctl_title){  

        $scope.dataSelected.colum = [ctl_title.TITLE_CODE];
        
//        $("#set-btn-edit").show();
//        $("#set-btn-add").hide();
        
        $scope.rowClick();
   
//        console.log(ctl_title.TITLE_CODE);
        $scope.title = {
            Code: ctl_title.TITLE_CODE,
            Name: ctl_title.TITLE_NAME,
            NameEng: ctl_title.TITLE_NAME_ENG,
            Sex: ctl_title.SEX
        }
    
        //ctl_title.Selected = true;
        
        //alert("Edit posted successfully");
    };
    
    //UPDATE
    $scope.updateData = function(){  //alert('ctl_title = '+ctl_title); console.log(ctl_title);
        //$scope.checkEdit = false;  
        console.log('$scope.title = '+$scope.title.Code);
        $http.put("/ctl_title/updateData", $scope.title).success(function(data){
            //เช็ค
            if(data.status && data.status == 'successful'){ 
                        $timeout(function afterTimeOut(){
                            //Clear 
                        },5000);
                        alert("Data updated successfully");
            }
            getdata();
            console.log("Update Complete");
        });
    };
    //------------------------------------------------------------------------
    
    //DELETE
    $scope.deleteData = function(){  
        console.log('$scope.title = '+$scope.dataSelected.colum);
//        $http.put("/ctl_title/deleteData", $scope.title).success(function(data){
        $http.put("/ctl_title/deleteData", $scope.dataSelected.colum).success(function(data){
            //เช็ค
            if(data.status && data.status == 'successful'){ 
                        $timeout(function afterTimeOut(){
                            //Clear 
                        },5000);
                        alert("Data deleted successfully");
            }
            getdata();
            console.log("Delete Complete");
        });
    };
    //------------------------------------------------------------------------
    
    //DELETE ALL Selected
    $scope.deleteSelected = function() {
        $http.post("/ctl_title/deleteAll",$scope.dataSelected.colum).success(function(data){
            //เช็ค
            if(data.status && data.status == 'successful'){ 
                        $timeout(function afterTimeOut(){
                            //Clear 
                        },5000);
                        alert("Data deleted all successfully");
            }
            getdata();
            $scope.dataSelected.colum = [];
            console.log("Delete Multi Complete");
        });
    }
    //-------------------------------------------------------------------------------------------------------------------
}