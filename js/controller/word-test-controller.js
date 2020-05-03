import { defaultWordList } from "../service/word-service.js"

export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($scope){
        closeNav();
        $scope.wordList = defaultWordList;
    })
}