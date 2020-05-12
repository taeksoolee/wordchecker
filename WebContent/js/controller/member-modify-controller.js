export function modifyMemberController(angularModule){
    angularModule
    .controller('ModifyMemberController', function($rootScope, $scope ,$interval ,utils , dateSetService, defaultMemberFactory, getMemberService){
    	$rootScope.afterLoginUrl = '/member/modify';
    	
    	if(!$rootScope.isLogin){
    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    		utils.goRouting($rootScope.loginUrl);
    	}
    	
   		utils.navControl.closeNav();
   		dateSetService.setDateSelect();
    	
    	$scope.modifyForm = {};
    	$scope.rePassword = "";
    	$scope.birthday = {'year': 0, 'month': 0, 'day': 0};
    	
    	var setDefualtModifyForm = function(){
	    	getMemberService.getMember(utils.cookieControl.getJwtCookie())
	    	.then(function(success){
	    		$scope.modifyForm = success.data;
	    		var dates = success.data.birthday.split('-');
	    		$('.year').val(dates[0]);
	    		$('.month').val(parseInt(dates[1]));
	    		$('.day').val(parseInt(dates[2]));
	    	}).catch(function(error){})
    	}
    	
   		setDefualtModifyForm();
    });
}
