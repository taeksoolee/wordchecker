export function listWordController(angularModule){
    angularModule
    .controller('ListWordController', function($rootScope, $scope, $interval, utils, defaultWordFactory, getWordService, modifyWordService){
    	$rootScope.afterLoginUrl = '/word/list';
    	
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
        
        var getDefaultStart = function(){
        	return 0;
        }
        var getDefaultLength = function(){
        	return 10;
        }
        $scope.setWordListDefaultConfig = function(){
        	$scope.wordListStart = getDefaultStart();
        	$scope.wordListLength = getDefaultLength();
        }
        
        $scope.wordList = [];
        $scope.setWordListDefaultConfig();
        
        $scope.checkWordBookmark = function(no){
        	if(no == undefined){
        		$rootScope.wordBookmark = -1;
        	}else{
        		$rootScope.wordBookmark = no;
        	}
        }
        
        $scope.setWordList = function(){
        	$rootScope.isLoading = true;
        	getWordService.getWordList(utils.cookieControl.getJwtCookie(), $scope.wordListStart, $scope.wordListLength)
        	.then(function(success){
	        		for(let i in success.data){
	        			$scope.wordList.push(success.data[i]);
	        		}
	        		$scope.wordListStart = $scope.wordListStart + $scope.wordListLength;
	    	})
	    	.catch(function(error){
	    		$scope.alert({content1:'error.message'}, 'danger');
	    	})
        	.finally(function() {
        		$rootScope.isLoading = false;
        	})
        }
        
        $scope.setWordList();
        
        $scope.deleteWord = function(no){
        	event.preventDefault();
        	$scope.confirm('확인 메시지', '선택하신 단어를 삭제 하시겠습니까?', function(){
	        	var word = {
	        		'no': no,
	        		'state': 0
	        	}
	        	
	        	$rootScope.isLoading = true;
	        	modifyWordService.modifyWordState(utils.cookieControl.getJwtCookie(), word)
	        	.then(function(success){
	        		$scope.alert({content1: '삭제가 완료되었습니다.'}, 'success');
	        		
	        		for(let i in $scope.wordList){
	        			if($scope.wordList[i].no == no){
	        				$scope.wordList.splice(i, 1);
	        			}
	        		}
	        		
	        		$scope.setWordList(utils.cookieControl.getJwtCookie(), $scope.wordListStart, 1);
	        	}).catch(function(error){
	        		$scope.alert({content1: '로그인 정보가 없습니다.'}, 'danger');
	        	}).finally(function() {
	        		$rootScope.isLoading = false;
	        	})
        	})
        }
        
        $(window).scroll(function(){
        	var scrolltop = $(window).scrollTop();
			if( scrolltop == $(document).height() - $(window).height() ){
				$rootScope.isLoading = true;
				getWordService.getWordList(utils.cookieControl.getJwtCookie(), $scope.wordListStart, $scope.wordListLength)
	        	.then(function(success){
	        		for(let i in success.data){
	        			$scope.wordList.push(success.data[i]);
	        		}
	        		$scope.wordListStart = $scope.wordListStart + $scope.wordListLength;
		    	})
		    	.catch(function(error){
		    		$scope.alert({content1:'error.message'}, 'danger');
		    	})
				.finally(function() {
					$rootScope.isLoading = false;
				})
			}
		});
    })
}