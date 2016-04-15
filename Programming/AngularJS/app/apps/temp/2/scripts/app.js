/**
 * Created by ltatuan on 11/21/14.
 */
'use strict';
(function() {
  angular.module('testApp1', [])
    .directive('dir1',['$timeout', function($timeout) {
      return {
        restrict: 'A',
        scope: {},
        //controller: function dirCtrl() {
        //  console.log('controller dir1');
        //},
        //templateUrl: 'scripts/dir1.html',
        template: '<div>dir1 Template<div dir2></div><div dir3></div></div>',
        compile: function compileDir(tEle, tAttr, transclude) {
          console.log('compile dir1');
          return {
            pre: function preLink(tEle, tAttr, preCtrl) {
              console.log('preLink dir1');
            },
            post: function postLink(tEle, tAttr, postCtrl) {
              console.log('postLink dir1');
              //$timeout(function() {
              //  console.log('$timeout dir1');
              //});
            }
          };
        }
        //link: function() {
        //  console.log('postlink dir1');
        //}
      };
    }])
    .directive('dir2',['$timeout', function($timeout) {
      return {
        restrict: 'A',
        scope: true,
        //controller: function dirCtrl() {
        //  console.log('controller dir2');
        //},
        //templateUrl: 'scripts/dir2.html',
        template: '<div>dir2 Template<div dir2-s0-s1></div></div>',
        compile: function compileDir(tEle, tAttr, transclude) {
          console.log('compile dir2');
          return {
            pre: function preLink(tEle, tAttr, preCtrl) {
              console.log('preLink dir2');
            },
            post: function postLink(tEle, tAttr, postCtrl) {
              console.log('postLink dir2');
              //$timeout(function() {
              //  console.log('$timeout dir2');
              //});
            }
          };
        }
        //link: function() {
        //  console.log('postlink dir2');
        //}
      };
    }])
    .directive('dir2S1',['$timeout', function($timeout) {
      return {
        restrict: 'A',
        scope: true,
        //require: '^dir2',
        /*controller: function dirCtrl() {
          console.log('controller dir2-s1');
        },*/
        //templateUrl: 'scripts/dir2S1.html',
        templateUrl: '<div>dir2-s1 Template</div>',
        compile: function compileDir(tEle, tAttr, transclude) {
          console.log('compile dir2-s1');
          return {
            pre: function preLink(tEle, tAttr, preCtrl) {
              console.log('preLink dir2-s1');
            },
            post: function postLink(tEle, tAttr, postCtrl) {
              console.log('postLink dir2-s1');
              //$timeout(function() {
              //  console.log('$timeout dir2-s1');
              //});
            }
          };
        }
        //link: function() {
        //  console.log('postlink dir2S1');
        //}
      };
    }])
    .directive('dir2S0S1',['$timeout', function($timeout) {
      return {
        restrict: 'A',
        scope: {},
        //controller: function dirCtrl() {
        //  console.log('controller dir2-s0-s1');
        //},
        //templateUrl: 'scripts/dir2S0S1.html',
        template: '<div>dir2-s0-s1 Template</div>',
        compile: function compileDir(tEle, tAttr, transclude) {
          console.log('compile dir2-s0-s1');
          return {
            pre: function preLink(tEle, tAttr, preCtrl) {
              console.log('preLink dir2-s0-s1');
            },
            post: function postLink(tEle, tAttr, postCtrl) {
              console.log('postLink dir2-s0-s1');
              //$timeout(function() {
              //  console.log('$timeout dir2-s0-s1');
              //});
            }
          };
        }
        //link: function() {
        //  console.log('postlink dir2S0S1');
        //}
      };
    }])
    .directive('dir3',['$timeout', function($timeout) {
      return {
        restrict: 'A',
        scope: {},
        //controller: function dirCtrl() {
        //  console.log('controller dir3');
        //},
        //templateUrl: 'scripts/dir3.html',
        template: '<div>dir3 Template</div>',
        compile: function compileDir(tEle, tAttr, transclude) {
          console.log('compile dir3');
          return {
            pre: function preLink(tEle, tAttr, preCtrl) {
              console.log('preLink dir3');
            },
            post: function postLink(tEle, tAttr, postCtrl) {
              console.log('postLink dir3');
              //$timeout(function() {
              //  console.log('$timeout dir3');
              //});
            }
          };
        }
        //link: function() {
        //  console.log('postlink dir3');
        //}
      };
    }])
    .controller('testCtrl1',['$scope', function($scope) {
      $scope.viewTpl = 'scripts/viewTpl.html';
    }]);
})();
