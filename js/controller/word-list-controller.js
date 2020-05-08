import { defaultWordList } from "../service/word-service.js"

export function listWordController(angularModule){
    angularModule
    .controller('ListWordController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
        $scope.wordList = defaultWordList;
    })
}