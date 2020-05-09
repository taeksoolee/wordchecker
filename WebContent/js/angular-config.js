export const angularModule = angular.module('wordCheckerApp', ['ngRoute', 'ngAnimate'])
.provider('utils', function(){
    this.$get = function(){
        return {
            'navCtrlFuncs':{
                openNav: function(){
                    $('#navbarSupportedContent').addClass('show');
                },
                closeNav: function(){
                    $('#navbarSupportedContent').removeClass('show');
                }
            }
        }
    }
})
.controller('MainController', function($rootScope, $scope, utils){
    utils.navCtrlFuncs.closeNav();
    $rootScope.isLoading = false;



})

