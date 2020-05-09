export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($scope, utils){
            utils.navCtrlFuncs.closeNav();
            $scope.wordList = defaultWordList;
    });
}