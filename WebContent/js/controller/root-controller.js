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
    	
    	$rootScope.onBlackScreen = false;
    	
    	window.addEventListener('scroll', function(e) {
    		$('#toTop').fadeIn();	  
    		if(window.scrollY == 0){
    			$('#toTop').fadeOut();
    		}
    		
    		$('#toBookmark').fadeIn();	  
    	});
    	
    	$scope.moveToTop = function(){
    		$('html, body').animate({scrollTop : 0}, 400);
    	}
    	
    	$scope.moveToBookmark = function(){
    		var top = 0
    		if($rootScope.wordBookmark != -1){
    			top = $('#'+$rootScope.wordBookmark).offset().top-100;
    		}else if($rootScope.boardBookmark != -1){
    			top = $('#'+$rootScope.boardBookmark).offset().top-100;
    		}
    		$('html, body').animate({scrollTop : top}, 400);
    		
    	}
    	
	})
}