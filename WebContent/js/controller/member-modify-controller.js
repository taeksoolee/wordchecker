export function modifyMemberController(angularModule){
    angularModule
    .controller('ModifyMemberController', function($rootScope, $scope ,$interval ,utils , dateSetService, defaultMemberFactory, getMemberService, searchMemberService, modifyMemberService){
    	$rootScope.afterLoginUrl = '/member/modify';
    	
    	if(!$rootScope.isLogin){
    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    		utils.goRouting($rootScope.loginUrl);
    	}
    	
   		utils.navControl.closeNav();
   		dateSetService.setDateSelect();
    	
   		var tempModifyMemberForm = {};
    	$scope.modifyMemberForm = {};
    	$scope.rePassword = "";
    	$scope.birthday = {'year': 0, 'month': 0, 'day': 0};
    	
    	var setDefualtModifyMemberForm = function(){
    		$rootScope.isLoading = true;
	    	getMemberService.getMember(utils.cookieControl.getJwtCookie())
	    	.then(function(success){
	    		$scope.modifyMemberForm = success.data;
	    		tempModifyMemberForm = angular.copy(success.data);
	    		var dates = success.data.birthday.split('-');
	    		$('.year').val(dates[0]);
	    		$('.month').val(parseInt(dates[1]));
	    		$('.day').val(parseInt(dates[2]));
	    		
	    	}).catch(function(error){}).finally(function(){$rootScope.isLoading = false;})
    	}
    	
   		setDefualtModifyMemberForm();
   		
   		var modifyMemberFunc = function(input){
   			$rootScope.isLoading = true;
   			$scope.confirm('확인 메시지', '회원정보를 수정 하시겠습니까?', function(){
		    	modifyMemberService.modifyMember(utils.cookieControl.getJwtCookie(), input)
		    	.then(function(success){
		    		setDefualtModifyMemberForm();
		            $scope.rePassword = "";
		            $scope.birthday = {"year": 0, "month": 0, "day": 0};
	            	$scope.alert({content1:'회원정보가 수정되었습니다!'}, 'success');
		    	})
		    	.catch(function(error){
		    		$scope.alert({content1:'error.message'}, 'danger');
		    	})
		    	.finally(function(){
		    		$rootScope.isLoading = false;
		    	})
    		})
   		}
   		
   		$scope.modifyMember = function(){
   			
        	$scope.processBool = true;
        	
    		$scope.isChange = false;
    		$scope.isChange = $('.year').val()==$scope.birthday.year?true:$scope.isChange;
    		$scope.isChange = $('.month').val()==$scope.birthday.month?true:$scope.isChange;
    		$scope.isChange = $('.day').val()==$scope.birthday.day?true:$scope.isChange;
    		$scope.isChange = $scope.modifyMemberForm.nickname!=tempModifyMemberForm.nickname?true:$scope.isChange;
    		$scope.isChange = $scope.modifyMemberForm.email!=tempModifyMemberForm.email?true:$scope.isChange;
    		$scope.isChange = $scope.rePassword!=""?true:$scope.isChange;
    		$scope.isChange = ($scope.modifyMemberForm.password!=null&&$scope.modifyMemberForm.password!="")?true:$scope.isChange;
    				
    		if(!$scope.isChange){
    			$scope.alert({content1:'변경된 사항이 없습니다.'}, 'warning');
    			return;
    		}
    		
        	var input = $scope.modifyMemberForm;
        	input.birthday = utils.getDateformat($('.year').val(), $('.month').val(), $('.day').val());
        	
        	var isEmptyInput = 0;
        	var emptyMessage = {
        			1: '이메일을 입력해주세요.',
        			4: '닉네임을 입력해주세요.',
        			5: '생년월일을 모두 선택해주세요'
        	}
        	
        	isEmptyInput = input.birthday == ""?5:isEmptyInput;
        	isEmptyInput = input.nickname == ""?4:isEmptyInput;
        	isEmptyInput = input.email == ""?1:isEmptyInput;
        	
        	if(isEmptyInput){
        		$scope.alert({content1:emptyMessage[isEmptyInput]}, 'danger');
        		document.getElementById('modifyForm').children[isEmptyInput-1].children[1].focus();
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
	        	if(!utils.validation.member.birthday(input.birthday)){
	        		$scope.alert({content1:'생년월일 형식이 맞지 않습니다.'}, 'danger');
	        		$scope.processBool = false;
	        	}
        	}
    		
        	if(!$scope.processBool) return;
        	
        	$rootScope.isLoading = true;
		    if($scope.processBool && input.email!=""){
	        	searchMemberService.searchMemberNickname({'nickname': input.nickname})
	            .then(function(success){
	            	console.log(input.nickname);
	            	console.log(success.data.nickname);
	            	if(tempModifyMemberForm.nickname != success.data.nickname && success.data.nickname != ""){
            			$scope.alert({content1:'중복되는 닉네임이 존재합니다!'}, 'danger');
            			$scope.processBool = false;
            		}
	            	
            		if(input.password != null && !utils.validation.member.password(input.password)){
		        		$scope.alert({content1:'비밀번호 형식을 확인해주세요.'}, 'danger');
		        		$scope.processBool = false;
		        	}
		        	if(input.password != null && $scope.repassword != '' && input.password != $scope.rePassword){
		        		$scope.alert({content1:'확인 비밀번호가 일치하지 않습니다.'}, 'danger');
		        		$scope.processBool = false;
		        	}
		        	if(!$scope.processBool) return;
            		modifyMemberFunc(input);
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