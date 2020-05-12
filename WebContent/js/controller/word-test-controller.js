export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($scope, utils){
            utils.navControl.closeNav();
            $scope.wordList = defaultWordList;
    });
}