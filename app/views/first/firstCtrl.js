'use strict';
app.controller('FirstCtrl', ['$window', '$scope', '$timeout', '$stateParams', '$state', 'currentAuth', 'UsersRegRef', 'userReg',

    function($window, $scope, $timeout, $stateParams, $state, currentAuth, UsersRegRef, userReg) {

        $scope.userReg = userReg;
        $scope.loading = false;
        var firstChange = function(unwatch) {

            if ($scope.userReg && $scope.userReg.Status && $scope.userReg.Status > 8) {
                unwatch();
                $scope.userReg.$destroy();
                alert("Berhasil Setting!");
                $window.location.replace("/")
                return;
            }
            if ($scope.userReg && $scope.userReg.Status && $scope.userReg.Status > 0) {
                $scope.loading = false;
            }
            return;

        };

        listenRegChange($scope.userReg, firstChange);
        $scope.loading = false;
        $scope.regError = null;
        $scope.userReg.Err = "";

        if (!$scope.userReg.User) {
            $scope.userReg.User = {
                Email: currentAuth.password.email
            };
            $scope.userReg.Device = {
                Sn: "",
                TimeZone: "+08:00",
                Name: ""
            };
            $scope.userReg.Sche = {

                Name: "Default Jadwal",
                Note: 'default Jadwal',
                '1': {
                    Active: true,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: true,
                    Close: 59
                },
                '2': {
                    Active: true,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: true,
                    Close: 59
                },
                '3': {
                    Active: true,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: true,
                    Close: 59
                },
                '4': {
                    Active: true,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: true,
                    Close: 59
                },
                '5': {
                    Active: true,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '15:00:00',
                    OverTime: '16:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: true,
                    Close: 59
                },
                '6': {
                    Active: false,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: false,
                    Close: 59
                },
                '7': {
                    Active: false,
                    Open: 60,
                    StartWork: '08:00:00',
                    EndWork: '17:00:00',
                    OverTime: '18:00:00',
                    EndOverTime: '23:00:00',
                    IsOverTime: false,
                    Close: 59
                }
            };
            $scope.userReg.Depart = {
                Name: "Umum"
            };
        }

        // var validateEmail function (email) {
        //     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //     return re.test(email);
        // };

        var setErr = function(err) {
            $scope.regError = err;
        };



        $scope.nextUser = function() {
            $scope.userReg.Err = null;
            if (!$scope.userReg.User.CompanyName || $scope.userReg.User.CompanyName.trim().length < 1) {
                $scope.userReg.Err = "Masukan Nama Perusahaan";
                return;
            };

            if (!$scope.userReg.User.Name || $scope.userReg.User.Name.trim().length < 1) {
                $scope.userReg.Err = "Nama Lengkap Harus Diisi";
                return;
            };

            $state.go("first.device");

        };

        $scope.nextDevice = function() {


            $state.go("first.schedule");

        };

        $scope.nextSchedule = function() {

            $state.go("first.depart");

        };

        $scope.nextDepart = function() {

            $state.go("first.review");

        };



        $scope.firstReg = function() {
            $scope.loading = true;
            $scope.userReg.Status = 0;
            $scope.userReg.UpdatedAt = {
                '.sv': 'timestamp'
            };
            $scope.userReg.uid = currentAuth.uid;
            $scope.userReg.Err = "";
            $scope.loading = true;
            $scope.userReg.$save().then(function(ref) {


            }, function(error) {
                var regError = error;
                setErr(regError);
                $scope.loading = false;
                return;
            });


        };

    }
]);


var listenRegChange = function(regObj, firstChange) {
    var unwatch = regObj.$watch(function() {
        firstChange(unwatch);
    });

}
