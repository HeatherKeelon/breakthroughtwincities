myApp.controller('userCtrl', ['$scope', '$http', 'DataService', function ($scope, $http, DataService) {
    console.log('on admin user controller--userCtrl.js');

    $scope.dataService = DataService;
    $scope.user = {};
    $scope.date = $scope.dataService.getDate();

    $scope.user = $scope.dataService.peopleData();

    if($scope.dataService.peopleData() === undefined){
        $scope.dataService.retrieveData().then(function(){
            $scope.user = $scope.dataService.peopleData();
            console.log($scope.user);
        });
    }

    $scope.userList = [];
    $scope.newUser = {};

    $scope.submitForm = function () {
        $http.post('/roles', $scope.newUser).then(function (response) {
            console.log('post response :', response);
            $scope.getUserList();
        });
    };

    $scope.getUserList = function () {
        $http.get('/roles').then(function (response) {

            $scope.userList = response.data;

            console.log('this is userList :', $scope.userList);

            $scope.usersTable = {
                enableSorting: true,
                columnDefs: [
                    { name:'id', field: 'id', enableCellEdit:true},
                    { name:'Role', field: 'role' , enableCellEdit:true},
                    { name:'First Name', field: 'firstname' , enableCellEdit:true},
                    { name:'Last Name', field: 'lastname' , enableCellEdit:true},
                    { name:'Email', field: 'email' , enableCellEdit:true}
                ],
                data : $scope.userList
            };
        })
    };

    $scope.updateUser = function (person) {
        $http.put('/roles', person).then(function (response) {
            console.log('put response :', response);
            $scope.getUserList();
        });
    };

    $scope.deleteUser = function (person) {
        $http.delete('/roles', {params: {deleteMe: person}}).then(function (response) {
            console.log('delete response :', response);
            $scope.getUserList();
        });
    };
    $scope.getUserList();
}]);