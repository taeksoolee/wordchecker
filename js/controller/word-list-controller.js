import { defaultWordList } from "../service/word-service.js"

export function listWordController(angularModule){
    angularModule
    .controller('ListWordController', function($scope){
        $scope.wordList = defaultWordList;
    })
}