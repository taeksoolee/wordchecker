export function addWordController(angularModule){
    angularModule
    .controller('AddWordController', function($rootScope, $scope, $interval, utils, defaultWordFactory, addWordService){
    	$rootScope.afterLoginUrl = '/word/add';
    	
    	$scope.loginInterval = $interval(function(){
    		if($rootScope.completeLoginCheck){
    			$interval.cancel($scope.loginInterval);
    			if(!$rootScope.isLogin){
    	    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    	    		utils.goRouting($rootScope.loginUrl);
    	    	}
    		}
    	})
    	
        utils.navControl.closeNav();
        
        $scope.wordCnt = 1;
        $scope.wordAddList = defaultWordFactory.getWordList();
        
        $scope.changeWordCnt = function(){
            if(isNaN(parseInt($scope.wordCnt)) || $scope.wordCnt < 0){
                $scope.wordCnt = 0; 
            }

            var calc = $scope.wordCnt - $scope.wordAddList.length;
            if(calc > 0){
                for(let i=0; i<calc; i++){
                    let temp = {speling: "", meaning: ""};
                    $scope.wordAddList.push(temp);
                }
            }else if(calc < 0){
                for(let i=0; i<(calc*-1); i++){
                    $scope.wordAddList.pop();
                }
            }
        }
        
        $scope.addWordList = function(){
        	for(let i in $scope.wordAddList){
        		if($scope.wordAddList[i].speling==""){
        			$scope.alert({content1:'모든 단어를 입력해주세요'}, 'warning');
        			return;
        		}
        		if($scope.wordAddList[i].meaning==""){
        			$scope.alert({content1:'모든 단어를 입력해주세요'}, 'warning');
        			return;
        		}
        		if(!utils.validation.word.speling($scope.wordAddList[i].speling)){
        			$scope.alert({content1:'스펠링은 영문자를 입력해주세요'}, 'warning');
        			return;
        		}
        		if(!utils.validation.word.meaning($scope.wordAddList[i].meaning)){
        			$scope.alert({content1:'해석은 한글을 입력해주세요'}, 'warning');
        			return;
        		}
        	}
        	
        	
        	$scope.confirm('확인 메시지', '단어를 등록 하시겠습니까?', function(){
        		$rootScope.isLoading = true;
        		
        		for(let i in $scope.wordAddList){
        			$scope.wordAddList[i].speling = $scope.wordAddList[i].speling.toLowerCase(); 
        		}
        		
	        	addWordService.addWordList($scope.wordAddList, utils.cookieControl.getJwtCookie())
	        	.then(function(success){
	        		$scope.wordAddList = defaultWordFactory.getWordList();
	        		$scope.wordCnt = 1;
	       			$scope.alert({content1: success.data.result+'개의 단어 입력 완료하였습니다.'}, 'success');
		    	})
		    	.catch(function(error){
		    		$scope.alert({content1:'error.message'}, 'danger');
		    	})
	        	.finally(function() {
	        		$rootScope.isLoading = false;
	        	})
        	})
        }
    });
}