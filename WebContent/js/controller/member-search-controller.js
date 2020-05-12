export function searchMemberController(angularModule){
    angularModule
    .controller('SearchMemberController', function($rootScope, $scope, utils, dateSetService, defaultMemberFactory, searchMemberService){
    	if($rootScope.isLogin) utils.goRouting($rootScope.afterLoginUrl);
    	
        utils.navControl.closeNav();
        dateSetService.setDateSelect();
        
        $scope.searchEmail = defaultMemberFactory.searchEmail;
        $scope.searchPassword = defaultMemberFactory.searchPassword;
        
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
        
        searchMemberService.searchMember({email: '9119k@naver.com'})
        .then(function(success){
    		console.log(success.data);
    	})
    	.catch(function(error){
    		$scope.alert({content1:'error.message'}, 'danger');
    	})
    });
}
