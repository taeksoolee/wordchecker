export function addWordController(angularModule){
    angularModule
    .controller('AddWordController', function($rootScope, $scope, utils, defaultWordFactory, addWordService){
    	$rootScope.afterLoginUrl = '/word/add';
    	
    	if(!$rootScope.isLogin){
    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    		utils.goRouting($rootScope.loginUrl);
    	}
    	
        utils.navControl.closeNav();
        
        $scope.wordCnt = 1;
        $scope.wordList = defaultWordFactory.getWordList();
        
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
        
        $scope.addWordList = function(){
        	for(let i in $scope.wordList){
        		if($scope.wordList[i].speling==""){
        			$scope.alert({content1:'모든 단어를 입력해주세요'}, 'warning');
        			return;
        		}
        		if($scope.wordList[i].meaning==""){
        			$scope.alert({content1:'모든 단어를 입력해주세요'}, 'warning');
        			return;
        		}
        		if(!utils.validation.word.speling($scope.wordList[i].speling)){
        			$scope.alert({content1:'스펠링은 영문자를 입력해주세요'}, 'warning');
        			return;
        		}
        		if(!utils.validation.word.meaning($scope.wordList[i].meaning)){
        			$scope.alert({content1:'해석은 한글을 입력해주세요'}, 'warning');
        			return;
        		}
        	}
        	
        	
        	$scope.confirm('확인 메시지', '단어를 등록 하시겠습니까?', function(){
	        	addWordService.addWordList($scope.wordList, utils.cookieControl.getJwtCookie())
	        	.then(function(success){
	        		$scope.wordList = defaultWordFactory.getWordList();
	        		$scope.wordCnt = 1;
	       			$scope.alert({content1: success.data.result+'개의 단어 입력 완료하였습니다.'}, 'success');
		    	})
		    	.catch(function(error){
		    		$scope.alert({content1:'error.message'}, 'danger');
		    	})
        	})
        }
    });
}