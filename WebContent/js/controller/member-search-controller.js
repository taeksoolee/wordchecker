export function searchMemberController(angularModule){
    angularModule
    .controller('SearchMemberController', function($rootScope, $scope, utils, dateSetService, defaultMemberFactory, searchMemberService){
    	if($rootScope.isLogin) utils.goRouting($rootScope.afterLoginUrl);
    	
        utils.navControl.closeNav();
        dateSetService.setDateSelect();
        
        $scope.searchEmailForm = defaultMemberFactory.getSearchEmail();
        $scope.searchPasswordForm = defaultMemberFactory.getSearchPassword();
        
        $scope.birthday = {
        		email: {
        			year: 0,
        			month: 0,
        			day: 0
        		},
        		password: {
        			year: 0,
        			month: 0,
        			day: 0
        		}
        }
        
        $scope.searchEmail = function(){
        	$scope.processBool = true;
        	if($scope.searchEmailForm.nickname == ""){
        		$scope.alert({content1:'별명을 입력해주세요.'}, 'warning');
        		$scope.processBool = false;
        	}
        	if(!($scope.birthday.email.year != 0 && $scope.birthday.email.month != 0 && $scope.birthday.email.day != 0)){
        		$scope.alert({content1:'생년월일을 전부 선택해주세요.'}, 'warning');
        		$scope.processBool = false;
        	}
        	
        	if(!$scope.processBool) return;
        	
        	$scope.searchEmailForm.birthday = $scope.birthday.email.year + '-' + $scope.birthday.email.month + '-' + $scope.birthday.email.day; 
        	
        	$rootScope.isLoading = true;
        	searchMemberService.searchMember($scope.searchEmailForm)
        	.then(function(success){
        		if(success.data.email==""){
        			$scope.alert({content1:'검색된 아이디가 없습니다.'}, 'danger');
        		}else{
        			$scope.alert({content1:'검색된 아이디 : ' + success.data.email}, 'success');
        			$scope.searchPasswordForm.email = success.data.email;
        			$('#email').focus();
        		}
	    	})
	    	.catch(function(error){
	    		$scope.alert({content1:'error.message'}, 'danger');
	    	}).finally(function(){
	    		$rootScope.isLoading = false;
	    	})
        }
        
        $scope.searchPassword = function(){
        	$scope.processBool = true;
        	
        	if($scope.searchPasswordForm.email == ""){
        		$scope.alert({content1:'이메일을 입력해주세요.'}, 'warning');
        		$scope.processBool = false;
        	}
        	if(!($scope.birthday.password.year != 0 && $scope.birthday.password.month != 0 && $scope.birthday.password.day != 0)){
        		$scope.alert({content1:'생년월일을 전부 선택해주세요.'}, 'warning');
        		$scope.processBool = false;
        	}
        	
        	if(!$scope.processBool) return;
        	
        	$scope.searchPasswordForm.birthday = $scope.birthday.password.year + '-' + $scope.birthday.password.month + '-' + $scope.birthday.password.day;
        	
        	$rootScope.isLoading = true;
        	searchMemberService.searchMemberPassword($scope.searchPasswordForm)
        	.then(function(success){
        		console.log(success);
        		if(success.data.result == 1){
        			$scope.alert({content1:'임시 비밀번호를 요청하신 메일로 발송하였습니다.'}, 'success');
        			$scope.searchEmailForm = defaultMemberFactory.getSearchEmail();
        	        $scope.searchPasswordForm = defaultMemberFactory.getSearchPassword();
        	        
        	        $scope.birthday = {
        	        		email: {
        	        			year: 0,
        	        			month: 0,
        	        			day: 0
        	        		},
        	        		password: {
        	        			year: 0,
        	        			month: 0,
        	        			day: 0
        	        		}
        	        }
        		}else{
        			if(success.data.message=="memeberNotFound"){
        				$scope.alert({content1:'일치하는 회원이 존재하지 않습니다.'}, 'danger');
        			}else{
        				$scope.alert({content1:'메일발송에 실패하였습니다.'}, 'warning');
        			}
        		}
	    	})
	    	.catch(function(error){
	    		$scope.alert({content1:'error.message'}, 'danger');
	    	})
        	.finally(function(){
        		$rootScope.isLoading = false;
        	})
        }
    });
}