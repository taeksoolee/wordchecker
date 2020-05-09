export function listWordController(angularModule){
    angularModule
    .controller('ListWordController', function($scope, utils, defaultWordFactory){
        utils.navCtrlFuncs.closeNav();
        $scope.wordList = defaultWordFactory.wordList;
    })
}