export function joinMemberController(angularModule){
    angularModule
    .controller('JoinMemberController', function($scope, utils, dateSetService, joinMemberService){
        utils.navCtrlFuncs.closeNav();
        dateSetService.setDateSelect();
        // 초기화
        $scope.joinForm = {
            "email":"",
            "password":"",
            "nickname":"",
            "birthday":""
        };
        $scope.rePassword = "";
        $scope.birthday = {"year": -1, "month": -1, "day": -1};
        
        
        
        
        
        
        
        
        var getBirthday = function(year, month, day){
        	if(typeof year == undefined || typeof month == undefined || typeof day == undefined) return "";
        	return year + '-' + month + '-' + day;
        }
        
        $scope.join = function(){
        	
        	$scope.joinForm.birthday = getBirthday($scope.birthday.year, $scope.birthday.month, $scope.birthday.day);
        	joinMemberService.join($scope.joinForm)
        	.then(function(success){
        		console.log(success);
        	})
        	.catch(function(error){
        		console.log(error);
        	})
        }
    });
}