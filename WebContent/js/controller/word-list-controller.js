export function listWordController(angularModule){
    angularModule
    .controller('ListWordController', function($rootScope, $scope, utils, defaultWordFactory, getWordService){
    	$rootScope.afterLoginUrl = '/word/list';
    	
    	if(!$rootScope.isLogin){
    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    		utils.goRouting($rootScope.loginUrl);
    	}
    	
        utils.navControl.closeNav();
        
        $scope.wordList = [];
        var wordListStart = 0;
        var wordListLength = 10;
        
        $scope.setWordList = function(jwt, start, length){
        	getWordService.getWordList(jwt, start, length)
        	.then(function(success){
        		if(success.data.length != 0){
	        		var wordList = success.data;
	        		for(let i in wordList){
	        			$scope.wordList.push(wordList[i]);
	        		}
	        		wordListStart = wordListStart + wordListLength;
        		}else{
        			$scope.alert({content1:'마지막 줄 입니다.'}, 'warning');
        		}
	    	})
	    	.catch(function(error){
	    		$scope.alert({content1:'error.message'}, 'danger');
	    	})
        }
        $scope.setWordList(utils.cookieControl.getJwtCookie(), wordListStart, wordListLength);
        
        window.onscroll = function(){
        	if((document.body.offsetHeight + 96) == (window.innerHeight + window.scrollY)){
        		try{
        			$scope.setWordList(utils.cookieControl.getJwtCookie(), wordListStart, wordListLength);
        		}catch (e) {
        			$scope.alert({content1: e.message}, '');
				}
        	}
        }
    })
}