
export function loginMemberController(angularModule){
    angularModule
    .controller('LoginMemberController', function($rootScope, $scope, $interval, utils, defaultMemberFactory, loginMemberService){
    	if($rootScope.isLogin) utils.goRouting($rootScope.afterLoginUrl); 
    	
    	utils.navControl.closeNav();
        $scope.loginForm = defaultMemberFactory.getLoginMember();
        
        var $autoLogin = $('#autoLogin');
        $autoLogin.prop('indeterminate', true);
        $autoLogin.click().click();
        
        
        $scope.checkAutoLogin = function(){
        	if($autoLogin.prop('checked') == true)
        		$scope.alert({content1:'공용 환경에서 사용은 권장하지 않습니다.'}, 'warning');
        }
        
        $scope.login = function(){
        	console.log($scope.autoLogin);
        	$rootScope.isLoading = true;
        	$scope.processBool = true;
        	try{
        		if($scope.loginForm.email == ""){
        			$scope.alert({content1:'아이디를 입력해주세요.'}, 'danger');
        			$scope.processBool = false;
        		}
        		
        		if($scope.loginForm.password == ""){
        			$scope.alert({content1:'비밀번호를 입력해주세요.'}, 'danger');
        			$scope.processBool = false;
        		}
        		
        		if(!$scope.processBool) return;
        		
		        loginMemberService.login($scope.loginForm)
		        .then(function(success){
		        	var jwt = success.data.jwt;
		        	if(typeof jwt != 'undefined'){
		        		utils.cookieControl.setJwtCookie(success.data.jwt, 1);
		        		$rootScope.isLogin = true;
		        		$rootScope.runAlertInterval(function(){
		        			$scope.alert({content1:'로그인에 성공하였습니다!'}, 'primary');
		        			utils.goRouting($scope.afterLoginUrl);
		        			loginMemberService.checkLogin(jwt)
		        	    	.then(function(success){
		        	    		if(success.data.memberNo != undefined){
		        	    			$rootScope.isLogin = true;
		        	    			$rootScope.loginMemberNo = success.data.memberNo;
		        	    		}
		        	    	}).catch(function(error){});
		        		})
		        	}else {
		        		$scope.alert({content1:'일치하는 회원정보가 존재하지않습니다.'}, 'danger');
		        	}
		     	})
		     	.catch(function(error){
		     		$scope.alert({content1:'error.message'}, 'danger');
		     	})
        	}finally{
        		$rootScope.isLoading = false;
        	}
        }
    })
}