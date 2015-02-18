'use strict';
app.controller('ForgotPwdCtrl', ['$scope', '$rootScope', '$http', '$state', 'FbAuth', function($scope, $rootScope, $http, $state, FbAuth) {
    FbAuth.$unauth();
    $scope.userEmail = "";
    $scope.authError = null;
    $scope.success = false;
    $scope.resetPwd = function(e) {
        e.preventDefault();
        
    };
}]);
