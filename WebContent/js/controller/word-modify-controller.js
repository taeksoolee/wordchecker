export function modifyWordController(angularModule){
    angularModule
    .controller('ModifyWordController', function($scope, utils, defaultWordFactory, getWordService, modifyWordService){
    	
        $scope.modifyWordForm = defaultWordFactory.getWord();
        var originModifyWordForm = {};
        
        $scope.openModifyWord = function(wordNo){
        	event.preventDefault();
        	$rootScope.isLoading = true;
        	getWordService.getWord(utils.cookieControl.getJwtCookie(), wordNo)
        	.then(function(success){
        		$scope.modifyWordForm = success.data;
        		originModifyWordForm = angular.copy(success.data);
        		$('#modifyWordComponent').show();
                $('.black-screen').show();
        	})
        	.catch(function(error){}).finally(function() {
        		$rootScope.isLoading = false;
        	})
        	
            
        }

        $scope.closeModifyWord = function(){
            event.preventDefault();
            $scope.selectedWord = defaultWordFactory.getWord();
            $('#modifyWordComponent').hide();
            $('.black-screen').hide();
        }
        
        $scope.modifyWord = function(){
        	$scope.processBool = true;
        	if(originModifyWordForm.speling==$scope.modifyWordForm.speling 
        			&& originModifyWordForm.meaning==$scope.modifyWordForm.meaning){
        		$scope.alert({content1:'수정된 사항이 없습니다.'}, 'warning');
        		return;
        	}
        	if(!($scope.modifyWordForm.speling!="" && $scope.modifyWordForm.meaning!="")){
    			$scope.alert({content1:'모든 단어를 입력해주세요'}, 'warning');
    			return;
    		}
        	if(!utils.validation.word.speling($scope.modifyWordForm.speling)){
    			$scope.alert({content1:'스펠링은 영문자를 입력해주세요'}, 'warning');
    			$scope.processBool = false;
    		}
    		if(!utils.validation.word.meaning($scope.modifyWordForm.meaning)){
    			$scope.alert({content1:'해석은 한글을 입력해주세요'}, 'warning');
    			$scope.processBool = false;
    		}
    		
    		if(!$scope.processBool) return;
        	
        	
            $scope.confirm('확인 메시지', '선택하신 단어를 수정하시겠습니까?', function(){
            	$rootScope.isLoading = true;
            	modifyWordService.modifyWord(utils.cookieControl.getJwtCookie(), $scope.modifyWordForm)
            	.then(function(success){
            		$scope.alert({content1:'단어 수정을 완료하였습니다.'}, 'success');
            		getWordService.getWord(utils.cookieControl.getJwtCookie(), $scope.modifyWordForm.no)
                	.then(function(success){
                		for(let i in $scope.wordList){
                			if(success.data.no == $scope.wordList[i].no){
                				$scope.wordList.splice(i,1, success.data);
                			}
                		}
                	})
            		
            		$scope.closeModifyWord();
            	})
            	.catch(function(error){}).finally(function() {
            		$rootScope.isLoading = false;
            	})
            }); 
        }
    })
}