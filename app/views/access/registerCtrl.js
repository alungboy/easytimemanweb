'use strict';
app.controller('RegisterCtrl', ['$window', '$scope', '$timeout', '$stateParams', '$state', 'FbAuth',

    function($window, $scope, $timeout, $stateParams, $state, FbAuth) {

        if (FbAuth.$getAuth()) {
            $state.go("app.home");
        }

        $scope.userError = null;
        $scope.newUser = {};
        $scope.loading = false;

        $scope.register = function() {
            $scope.userError = null;
            $scope.loading = true;

             if (!$scope.newUser.Email  || $scope.newUser.Email2.length < 5) {
                $scope.userError = "Masukkan email dengan benar!";
                $scope.loading = false;
                return;
            }

             if (!$scope.newUser.Passwd  || $scope.newUser.Passwd.length < 1) {
                $scope.userError = "Password tidak boleh kosong!";
                $scope.loading = false;
                return;
            }
            if ($scope.newUser.Email != $scope.newUser.Email2) {
                $scope.userError = "Email dan ulangi email harus sama!";
                $scope.loading = false;
                return;
            }

            if ($scope.newUser.Passwd != $scope.newUser.Passwd2) {
                $scope.userError = "Password dan ulangi Password harus sama!";
                $scope.loading = false;
                return
            }



            FbAuth.$createUser($scope.newUser.Email, $scope.newUser.Passwd).then(function() {
                console.log("User created successfully!");
                return FbAuth.$authWithPassword({
                    email: $scope.newUser.Email,
                    password: $scope.newUser.Passwd
                });
            }).then(function(authData) {
                $state.go("first.user");
            }).catch(function(error) {
                if (error) {
                     $scope.userError = error;
                    switch (error.code) {
                        case "EMAIL_TAKEN":
                            $scope.userError = "Email sudah terdaftar!";
                            break;
                        case "INVALID_EMAIL":
                            $scope.userError = "Format email tidak benar!!";
                            break;
                        default:
                            $scope.userError = error;
                            break;
                    }
                    $scope.loading = false;
                }

            });


        };

    }
]);
