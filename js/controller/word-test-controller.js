import { defaultWordList } from "../service/word-service.js"

export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
        $scope.wordList = defaultWordList;
    })
}