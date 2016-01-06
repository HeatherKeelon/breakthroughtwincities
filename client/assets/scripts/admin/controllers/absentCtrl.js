myApp.controller('absentCtrl', ['$scope', '$http', 'DataService', function($scope, $http, DataService){
    console.log('on admin absent controller--absentCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();
    $scope.homework_sent = false;

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }



    var excusedCheckbox = "<md-checkbox ng-model='row.entity.excused' class='md-warn md-hue2' type='checkbox' name='excused' ng-change='grid.appScope.saveRow(row.entity)'></md-checkbox>"; 
    var homeworkCheckbox = "<md-checkbox ng-model='row.entity.homework_sent' class='md-warn md-hue2' type='checkbox' name='homework_sent'  ng-change='grid.appScope.saveRow(row.entity)'></md-checkbox>";


    $scope.gridOptions = {
        enableSorting: true,

        columnDefs: [
            { name:'id', field: 'id', enableCellEdit: false },
            { name:'Teacher', field: 'lastname' , enableCellEdit:true},
            { name:'First Name', field: 'student_firstname' , enableCellEdit:true},
            { name:'Last Name', field: 'student_lastname' , enableCellEdit:true},
            { name:'Phone 1', field: 'phone1' , enableCellEdit:true},

            { name:'Call Status', field: 'contact_status' , enableCellEdit:true,

            { name:'Call Status', field: 'contact_status' ,   enableCellEdit:true,

                editableCellTemplate: 'ui-grid/dropdownEditor',
                editDropdownValueLabel: 'contact_status',
                editDropdownOptionsArray: [
                    { id: 'Not Yet Called', contact_status: 'Not Yet Called' },
                    { id: 'Reached', contact_status: 'Reached' },
                    { id: 'Left Message', contact_status: 'Left Message' }
                ]},
            { name:'Homework Sent', field: 'homework_sent' , cellTemplate: homeworkCheckbox, enableCellEdit:true},
            { name:'Excused', field: 'excused' , cellTemplate: excusedCheckbox, enableCellEdit:true},
            { name:'Attendance Notes', field: 'attendance_notes' , enableCellEdit:true}
        ]
    };
    console.log($scope.dataService.getData());
    $scope.gridOptions.data = $scope.dataService.getData();


    $scope.saveRow = function( rowEntity ) {
        console.log("in save row");
        console.log("rowEntity", rowEntity);
        var promise = $http.put('/updateAbsent', rowEntity).then(function(response){
            console.log(response);
            console.log(promise);
        });
        $scope.gridApi.rowEdit.setSavePromise( rowEntity, promise);
    };

    $scope.gridOptions.onRegisterApi = function(gridApi){
        //set gridApi on scope
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
    };


    $scope.openStudent = function(student){
        $http.get('/student', {params: {who: student}}).then(function(response){
            console.log(response.data);
            $scope.dataService.setData(response.data);

        });
    }



}]);