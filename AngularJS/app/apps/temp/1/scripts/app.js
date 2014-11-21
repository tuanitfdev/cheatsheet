/**
 * Created by ltatuan on 11/21/14.
 */
'use strict';
(function() {
  angular.module('testApp1', [])
    .controller('testCtrl1',['$scope', function($scope) {
      $scope.t1 = {};

      $scope.t1.d1 = 1;
      $scope.t1.d2 = 2;

      $scope.$watch('t1.d1', function(newVal, oldVal) {
        console.log('watching t1.d1, newVal: ' + newVal + ', oldVal: ' + oldVal);
      });

      $scope.$watch('t1.d2', function(newVal, oldVal) {
        console.log('watching t1.d2, newVal: ' + newVal + ', oldVal: ' + oldVal);
      });

      $scope.t1.test = function() {
        $scope.t1.d1 = Math.random();
      }
    }]);
})();
