export function rootController(angularModule){
    angularModule
    .controller('RootController', function($rootScope, $scope, $interval, utils, loginMemberService){
    	$rootScope.afterLoginUrl = '/';
    	$rootScope.loginUrl = '/member/login'
    	$rootScope.isLogin = false;
    	$rootScope.autoLogin = false;
    	$rootScope.loginMemberNo = 0;
    	
    	var cookieJwt = utils.cookieControl.getJwtCookie();
    	loginMemberService.checkLogin(cookieJwt)
    	.then(function(success){
    		if(success.data.memberNo != undefined){
    			$rootScope.isLogin = true;
    			$rootScope.loginMemberNo = success.data.memberNo;
    		}
    	}).catch(function(error){});
    	
    	$rootScope.runAlertInterval = function(callback){
	    	var checkAlertListInterval = $interval(function(){
	        	$scope.alertList.pop();
	        	if($scope.alertList.length == 0){
	        		$interval.cancel(checkAlertListInterval);
	        		callback();
	        	}
	        }, 1);
    	}
    	
    	$rootScope.logout = function(){
    		$scope.confirm('확인 메시지', '로그아웃 하시겠습니까?', function(){
    			$rootScope.isLogin = false;
    			utils.cookieControl.deleteJwtCookie();
    			location.reload();
    		})
    	}
    	
    	$rootScope.wordBookmark = -1;
    	$rootScope.boardBookmark = -1;
    	
    	
	})
}