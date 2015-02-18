'use strict';

/* Controllers */
// signin controller
app.controller('LoginCtrl', ['$window','$scope', '$rootScope', '$http', '$state', 'FbAuth', function( $window, $scope, $rootScope, $http, $state, FbAuth) {
    FbAuth.$unauth();
    $scope.user = null;
    $scope.authError = null;
    $scope.login = function(e) {
        e.preventDefault();
        $scope.authError = null;
        FbAuth.$authWithPassword({
            email: $scope.user.email,
            password: $scope.user.password
        }).then(function(authData) {
            $window.location.replace("/")
        }).catch(function(error) {

            switch (error.code) {
                case "INVALID_PASSWORD":
                    $scope.authError = "Email atau password salah!";
                    break;
                case "INVALID_USER":
                    $scope.authError = "Email atau password salah!";
                    break;
                default:
                    $scope.authError = error;
                    break;
            }
            console.log(error);

        });
    };
}]);
