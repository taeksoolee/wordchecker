export function testWordController(angularModule){
    angularModule
    .controller('TestWordController', function($rootScope, $scope, $interval, utils, getWordService){
    	$rootScope.afterLoginUrl = '/word/test';
    	
    	$scope.loginInterval = $interval(function(){
    		if($rootScope.completeLoginCheck){
    			$interval.cancel($scope.loginInterval);
    			if(!$rootScope.isLogin){
    	    		$scope.alert({content1:'로그인 후 이용해주세요.'}, 'danger');
    	    		utils.goRouting($rootScope.loginUrl);
    	    	}
    		}
    	})
    	
        utils.navControl.closeNav();
        
        var now = new Date();
    	var startDate = (now.getYear()+1900) + '-' + (now.getMonth()) + '-' + now.getDate();
    	var endDate = (now.getYear()+1900) + '-' + (now.getMonth()+1) + '-' + now.getDate();
    	
    	$(function() {
    		$('.drp').daterangepicker({
    			"autoUpdateInput": true,
    			"startDate": startDate,
    			"endDate": endDate,
    			"locale": {
    		        "format": "YYYY-MM-DD",
    		        "separator": " > "
    			}
    		}, function(start, end, label) {});
    	});
        
        $scope.onTest = false;
        $scope.pauseTest = false;
        
        $scope.wordTestList = []
        $scope.wordTestAnswerList = []
         
        var getDefualtTestResult = function(){
        	return {
            	exist: false,
            	rightWordNumber: 0,
            	judgeList: []
            }
        }
        $scope.testResult = getDefualtTestResult();
        
        var getDefaultTime = function(){
			return{
				hour: '0',
				minute: '0',
				second: '0'
			}
		}
        
        $scope.time = getDefaultTime();
        
        $scope.goTimeInterval = function(minute){
        	//set time
        	$scope.time.hour = parseInt(minute/60);
        	$scope.time.minute = minute%60;
        	$scope.time.second = 0;
        	
        	$scope.timeInterval = $interval(function(){
        		if($scope.pauseTest == false){
	        		if(($scope.time.second)>0){
	        			$scope.time.second = $scope.time.second-1;
	        		}else{
	        			$scope.time.second = 59;
	        			if(($scope.time.minute)>0){
	        				$scope.time.minute = $scope.time.minute-1;
	        			}else{
	        				$scope.time.minute = 59;
	        				$scope.time.hour = $scope.time.hour-1;
	        			}
	        		}
	        		if($scope.time.hour == 0 && $scope.time.minute == 0 && $scope.time.second == 0){
	        			$scope.testSubmit();
	        		}
        		}
        	}, 1000);
        }
        
        var $testTimer = $('#testTimer');
        $(window).scroll(function(){
        	var y = ((window.pageYOffset<200?0:window.pageYOffset-190))+'px';
        	$testTimer.animate({top: y}, 7);
		});
        
        $scope.onPause = function(){
        	$scope.pauseTest = true;
        }
        
        $scope.offPause = function(){
        	$scope.pauseTest = false;
        }
        
        $scope.limitMinute = 5;
        $scope.testType = 'speling';
        $scope.testOrder = 0;
        $scope.wordTestFilter = {
        		count: 100, 
        		speling: "", 
        		meaning: "", 
        		writeDate: "",
        		startDate: "",
        		endDate: ""
        	}
        
        
        $scope.test = function(){
        	console.log($scope.wordTestFilter);
        	console.log($scope.testOrder);
        	var dates = $scope.wordTestFilter.writeDate.split(' > ');
        	$scope.wordTestFilter.startDate = dates[0];
        	$scope.wordTestFilter.endDate = dates[1];
        	$rootScope.isLoading = true;
        	getWordService.getWordTestList(utils.cookieControl.getJwtCookie(), $scope.wordTestFilter, $scope.testOrder)
	    	.then(function(success){
	    		if(success.data.length == 0){
	    			$scope.alert({content1:'조건에 맞는 단어가 없습니다.'}, 'warning');
	    		}else if(success.data.length == $scope.wordTestFilter.count){
	    			$scope.onTest = true;
	            	$scope.goTimeInterval($scope.limitMinute);
	            	
	            	$scope.wordTestList = []
	                $scope.wordTestAnswerList = []
	    			$scope.wordTestAnswerList = success.data;
		            var copyData = angular.copy(success.data);
		            var reverseType = ($scope.testType=='speling')?'meaning':'speling';
		            
		            for(let i in copyData){
		            	$scope.wordTestList[i] = {};
		            	$scope.wordTestList[i][reverseType] = copyData[i][reverseType];
					}
		            $scope.isSpelingTest = $scope.testType=='speling'?true:false;
		            
		            $('html, body').animate({scrollTop : 0}, 1);
		            
	    		}else{
	    			$scope.alert({content1:'조건단어 수보다 검색된 단어수가 적습니다.(검색 단어수 : '+success.data.length+'개)'}, 'warning');
	    			$('#testCount').focus();
	    			$scope.wordTestFilter.count = success.data.length;
	    		}
			})
			.catch(function(error){
				$scope.alert({content1:'error.message'}, 'danger');
			})
        	.finally(function() {
        		$rootScope.isLoading = false;
        	})
        }
        
        $scope.testSubmit = function(){
        	$interval.cancel($scope.timeInterval);
			$scope.onTest = false;
			$scope.setRight();
			$scope.testResult.exist = true;
        }
        
        $scope.wordTestSubmit = function(){
        	$scope.confirm('확인 메시지', '답안을 제출 하시겠습니까?', function(){
        		$scope.testSubmit();
        	});
        	
        }
        
        
        $scope.setRight = function(){
        	for(let i in $scope.testResult){
        		$scope.testResult.speling = $scope.testResult.speling.toLowerCase();
        	}
        	
        	$scope.testResult = getDefualtTestResult();
			for(let i in $scope.wordTestAnswerList){
				if($scope.wordTestAnswerList[i][$scope.testType] == $scope.wordTestList[i][$scope.testType]){
					$scope.testResult.judgeList.push(true);
					$scope.testResult.rightWordNumber = $scope.testResult.rightWordNumber + 1; 
				}else{
					$scope.testResult.judgeList.push(false);
				}
        	}
        }
        
        $scope.resultReset = function(){
        	event.preventDefault();
        	$scope.testResult = getDefualtTestResult();
        }
    });
}