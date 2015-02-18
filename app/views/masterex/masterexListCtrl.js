'use strict';
app.controller('MasterExListCtrl', ['$scope', '$stateParams', '$state', 'masexs', 'CompanyIdCounterRef',
    function($scope, $stateParams, $state, masexs, CompanyIdCounterRef) {
        console.log(masexs);
        $scope.ListMasterEx = [];
        $scope.showLoadMore = function() {
            var paramSize = parseInt($stateParams.size);
            if ($scope.ListMasterEx.length >= paramSize) {
                return true;
            } else {
                return false;
            }
        };

        $scope.loadMore = function() {
            var paramSize = parseInt($stateParams.size);

            if ($scope.ListMasterEx.length >= paramSize) {

                $state.transitionTo('app.users.list', {
                    compId: $stateParams.compId,
                    idx: '1',
                    size: paramSize + 5
                });
            }
        };

        $scope.view = 'List';
        $scope.breadcrumb.view = $scope.view;

        $scope.checkView = function(input) {
            return $scope.view == input;
        };

        $scope.compId = $stateParams.compId;
        $scope.idx = parseInt($stateParams.idx);
        $scope.size = parseInt($stateParams.size);


        // State View List
        $scope.ListMasterEx = masexs;

        $scope.Detail = function(selected) {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
            $scope.masex = selected;

        }
        $scope.toCreate = function(selected) {
            $scope.view = 'Create';
            $scope.breadcrumb.view = $scope.view;
            $scope.newMasex = {};
        }

        // State View Create

        $scope.create = function() {

            var MasExCountRef = CompanyIdCounterRef($stateParams.compId, "ExcId");

            MasExCountRef.$transaction(function(currentCount) {
                if (!currentCount) {
                    return 1;
                }
                if (currentCount < 1) {
                    return;
                };
                return currentCount + 1;
            }).then(function(snapshot) {
                if (snapshot === null) {
                    alert("Gagal menambahakn Master Ijin!");
                } else {
                    var newKey = snapshot.val();
                    var dbDeps = $scope.ListMasterEx.$inst();
                    $scope.newDep.UpdatedAt = {
                        '.sv': 'timestamp'
                    };
                    $scope.newDep.UpdatedBy = $rootScope.User.$id;
                    dbDeps.$set('' + newKey, $scope.newDep).then(function(ref) {
                        alert('berhasil ditambahkan Departemen ' + $scope.newDep.Name);
                        $scope.view = 'List';
                        $scope.breadcrumb.view = $scope.view;
                        $scope.newDep = {};
                    }, function(error) {
                        console.log("Error:", error);
                    });
                }
            }, function(error) {
                alert(error);
            });

        }

        // State View Detail
        $scope.toList = function() {
            $scope.view = 'List';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.toEdit = function() {
            $scope.view = 'Edit';
            $scope.breadcrumb.view = $scope.view;
        };
        $scope.remove = function() {

            $scope.ListMasterEx.$remove($scope.dev).then(function(ref) {
                $scope.view = 'List';
                $scope.breadcrumb.view = $scope.view;

            }, function(err) {
                console.log("Error: ", err)
            });

        };

        // State View Edit
        $scope.toDetail = function() {
            $scope.view = 'Detail';
            $scope.breadcrumb.view = $scope.view;
        };

        $scope.update = function() {
            $scope.ListMasterEx.$save($scope.dev).then(function(ref) {
                $scope.view = 'Detail';
                $scope.breadcrumb.view = $scope.view;
            }, function(err) {
                console.log("Error: ", err)
            })
        };



    }
]);
