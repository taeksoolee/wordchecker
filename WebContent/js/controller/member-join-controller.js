export function joinMemberController(angularModule){
    angularModule
    .controller('JoinMemberController', function($rootScope, $scope, server, utils, dateSetService, defaultMemberFactory, joinMemberService, searchMemberService){
    	if($rootScope.isLogin) utils.goRouting($rootScope.afterLoginUrl);
    	
        utils.navControl.closeNav();
        dateSetService.setDateSelect();
        
        $scope.joinForm = defaultMemberFactory.getJoinMember();
        $scope.rePassword = "";
        $scope.birthday = {"year": 0, "month": 0, "day": 0};
        
        
        var joinFunc = function(input){
    		$scope.confirm('확인 메시지', '회원가입 하시겠습니까?', function(){
    			$rootScope.isLoading = true;
		    	joinMemberService.join(input)
		    	.then(function(success){
		    		$scope.joinForm = defaultMemberFactory.getJoinMember();
		            $scope.rePassword = "";
		            $scope.birthday = {"year": 0, "month": 0, "day": 0};
		            $rootScope.runAlertInterval(function(){
		            	$scope.alert({content1:'회원가입이 완료되었습니다!'}, 'success');
	            		utils.goRouting('/member/login');
	        		})
		    	})
		    	.catch(function(error){
		    		$scope.alert({content1:'error.message'}, 'danger');
		    	})
		    	.finally(function() {
		    		$rootScope.isLoading = false;
		    	})
    		})
	    };
        
        $scope.join = function(){
        	$scope.processBool = true;
        	
        	var input = $scope.joinForm;
        	input.birthday = utils.getDateformat($scope.birthday.year, $scope.birthday.month, $scope.birthday.day);
        	
        	var isEmptyInput = 0;
        	var emptyMessage = {
        			1: '이메일을 입력해주세요.',
        			2: '비밀번호를 입력해주세요. 하나의 문자 및 숫자를 포함한 8자리 이상 문자열',
        			3: '비밀번호확인을 입력해주세요.',
        			4: '닉네임을 입력해주세요.',
        			5: '생년월일을 모두 선택해주세요'
        	}
        	
        	isEmptyInput = input.birthday == ""?5:isEmptyInput;
        	isEmptyInput = input.nickname == ""?4:isEmptyInput;
        	isEmptyInput = $scope.rePassword == ""?3:isEmptyInput;
        	isEmptyInput = input.password == ""?2:isEmptyInput;
        	isEmptyInput = input.email == ""?1:isEmptyInput;
        	
        	if(isEmptyInput){
        		$scope.alert({content1:emptyMessage[isEmptyInput]}, 'danger');
        		document.getElementById('joinForm').children[isEmptyInput-1].children[1].focus();
        		$scope.processBool = false;
        	}else{
	        	if(!utils.validation.member.email(input.email)){
	        		$scope.alert({content1:'이메일 형식을 확인해주세요.'}, 'danger');
	        		$scope.processBool = false;
	        	}
	        	
	        	if(!utils.validation.member.nickname(input.nickname)){
	        		$scope.alert({content1:'별명 형식을 확인해주세요.'}, 'danger');
	        		$scope.processBool = false;
	        	}
	        	console.log(input.birthday);
	        	if(!utils.validation.member.birthday(input.birthday)){
	        		$scope.alert({content1:'생년월일 형식이 맞지 않습니다.'}, 'danger');
	        		$scope.processBool = false;
	        	}
        	}
    		
        	if(!$scope.processBool) return;
		    
		    if($scope.processBool && input.email!=""){
		    	$rootScope.isLoading = true;
	        	searchMemberService.searchMember({'email': input.email})
	            .then(function(success){
	            	if(success.data.email != ""){
	            		$scope.alert({content1:'중복되는 회원이 존재합니다!'}, 'danger');
	            	}else{
	            		searchMemberService.searchMemberNickname({'nickname': input.nickname})
		            	.then(function(success){
		            		if(success.data.nickname == ""){
			            		if(!utils.validation.member.password(input.password)){
					        		$scope.alert({content1:'비밀번호 형식을 확인해주세요.'}, 'danger');
					        		$scope.processBool = false;
					        	}
					        	if(input.password != $scope.rePassword){
					        		$scope.alert({content1:'확인 비밀번호가 일치하지 않습니다.'}, 'danger');
					        		$scope.processBool = false;
					        	}
					        	if(!$scope.processBool) return;
			            		joinFunc(input);
		            		}else{
		            			$scope.alert({content1:'중복되는 닉네임이 존재합니다!'}, 'danger');
		            		}
		            	}).catch(function(error){});
	            	}
	         	})
	         	.catch(function(error){
	         		$scope.alert({content1:'error.message'}, 'danger');
	         	})
	        	.finally(function(){
	        		$rootScope.isLoading = false;
	        	})
		    }
        }
    });
}