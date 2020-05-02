export const angularModule = angular.module('wordCheckerApp', ['ngRoute', 'ngAnimate'])
.controller('MainController', function($rootScope, $scope){
    $rootScope.isLoading = false;


    // test를 위한 정의 함수
    $rootScope.test = function(){
        console.log('test');
        // alert 함수 테스트
        $scope.alert({content1:'hello world'}, 'danger');
        // confirm 함수 테스트
        //$scope.confirm('title', 'message', function(){console.log('hello')});
    }
})

