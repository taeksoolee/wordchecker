import { defaultWord } from "../service/word-service.js"

export function modifyWordController(angularModule){
    angularModule
    .controller('ModifyWordController', function($scope){
        if(typeof $scope.$blackScreen == "undefined") $scope.$blackScreen = $('#black-screen');
        if(typeof $scope.$modifyWordComponent == "undefined") $scope.$modifyWordComponent = $('#modifyWordComponent');
        $scope.selectedWord = defaultWord;
        
        $scope.openModifyWord = function(wordNo){
            console.log(wordNo);
            $scope.$modifyWordComponent.show(50);
            $scope.$blackScreen.show(50);
        }

        $scope.closeModifyWord = function(event){
            if(typeof event != "undefined")event.preventDefault();
            $scope.$modifyWordComponent.hide(50);
            $scope.$blackScreen.hide(50);
        }

        /* 단어 수정 실행 */
        $scope.modifyWord = function(){
            console.log('hellow world');
            $scope.confirm('확인 메시지', '선택하신 단어를 수정하시겠습니까?', function(){
                $scope.alert({
                    content1:'단어 수정을 완료하였습니다.'
                }, 'primary', 2);
                $scope.closeModifyWord();
            });
            
            
        }
    })
}