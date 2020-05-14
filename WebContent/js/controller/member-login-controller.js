
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
        	$scope.processBool = true;
    		if($scope.loginForm.email == ""){
    			$scope.alert({content1:'아이디를 입력해주세요.'}, 'danger');
    			$scope.processBool = false;
    		}
    		
    		if($scope.loginForm.password == ""){
    			$scope.alert({content1:'비밀번호를 입력해주세요.'}, 'danger');
    			$scope.processBool = false;
    		}
    		
    		if(!$scope.processBool) return;
    		$rootScope.isLoading = true;
	        loginMemberService.login($scope.loginForm, $scope.autoLogin)
	        .then(function(success){
	        	var jwt = success.data.jwt;
	        	if(typeof jwt != 'undefined'){
	        		if($scope.autoLogin){
	        			utils.cookieControl.setJwtCookie(success.data.jwt, (24*60*60*1000));
	        		}else{
	        			utils.cookieControl.setJwtCookie(success.data.jwt, 20);
	        		}
	        		
	        		$rootScope.isLogin = true;
	        		$rootScope.runAlertInterval(function(){
	        			$scope.alert({content1:'로그인에 성공하였습니다!'}, 'primary');
	        			utils.goRouting($scope.afterLoginUrl);
	        			loginMemberService.checkLogin(jwt)
	        	    	.then(function(success){
	        	    		if(success.data.memberNo != undefined){
	        	    			$rootScope.isLogin = true;
	        	    			$rootScope.loginMemberNo = success.data.memberNo;
	        	    			$rootScope.setTokenExpirationPeriod(success.data.time);
	        	    		}
	        	    	}).catch(function(error){})
	        			.finally(function(){
	        				$rootScope.isLoading = false;
	        			});
	        		})
	        	}else {
	        		$scope.alert({content1:'일치하는 회원정보가 존재하지않습니다.'}, 'danger');
	        	}
	     	})
	     	.catch(function(error){
	     		$scope.alert({content1:'error.message'}, 'danger');
	     	})
	        .finally(function() {
	        	$rootScope.isLoading = false;
	        })
        }
    })
}