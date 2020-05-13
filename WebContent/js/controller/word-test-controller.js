export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($rootScope, $scope, utils){
    	$rootScope.afterLoginUrl = '/word/test';
    	
    	if(!$rootScope.isLogin){
    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    		utils.goRouting($rootScope.loginUrl);
    	}
    	
        utils.navControl.closeNav();
        
        $scope.onTest = false;
        
        
        $scope.test = function(){
        	
        }
        
    });
}