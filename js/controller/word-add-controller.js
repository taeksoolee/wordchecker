import { defaultWordList } from "../service/word-service.js"

export function addWordController(angularModule){
    angularModule
    .controller('AddWordController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
        $scope.wordCnt = 1;

        $scope.wordList = defaultWordList;
        
        $scope.changeWordCnt = function(){
            if(isNaN(parseInt($scope.wordCnt)) || $scope.wordCnt < 1){
                $scope.wordCnt = 1; 
            }

            var calc = $scope.wordCnt - $scope.wordList.length;
            if(calc > 0){
                for(let i=0; i<calc; i++){
                    let temp = {speling: "", meaning: ""};
                    $scope.wordList.push(temp);
                }
            }else if(calc < 0){
                for(let i=0; i<(calc*-1); i++){
                    $scope.wordList.pop();
                }
            }
        }
    })
}