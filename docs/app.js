var app = angular.module('delegateApp', []);

app.controller('indexCtrl', function($scope, $http) {
    $scope.title = "OXYCOIN Official Pool";
    $scope.sharing = 90;
    $scope.schedule = "day";
    $scope.scheduleLong = "daily";
    $scope.username = "official_pool";

    $scope.accounts = [];
    $scope.lastpayout = 0;
    $scope.nextpayout = 0;

    $http.get ('poollogs.json').then (function (res) {
        $scope.lastpayout = res.data.lastpayout * 1000;
        $scope.nextpayout = moment ($scope.lastpayout).add (1, $scope.schedule).valueOf();
        $scope.accounts = [];

        for (addr in res.data.accounts) {
            var it = res.data.accounts[addr];
            it['address'] = addr;
            $scope.accounts.push (it);
        }
    });

    $http.get ('https://wallet.oxycoin.io/api/delegates/get?username='+$scope.username).then (function (res) {
        $scope.delegate = res.data.delegate;
    });
});
