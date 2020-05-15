export function modalController(angularModule){
    angularModule
    .controller('ModalController', function($scope, $timeout, $interval, defualtModalFactory){
    	$scope.alertList = [];
    	
        /* 경고창 관련 자바스크립트 */
        $scope.alerted = false;
        $scope.alertModal = defualtModalFactory.alert;
        
        $scope.alert = function(alertObj, type){
        	var topNo = 0;$
        	for(let i in $scope.alertList){
        		topNo = $scope.alertList[i].no>topNo?$scope.alertList[i].no:topNo;
        	}
        	alertObj.no = topNo + 1;
        	
        	var alertType = 'alert-'
            switch (type) {
                case 'primary':
                case 'success':
                case 'warning':
                case 'danger':
                	alertType = alertType + type;
                	break;
                default:
                	alertType = alertType + 'primary';
            }
        	alertObj.type = alertType;
            $scope.alertList.push(alertObj);
        }
        
        $scope.closeAlert = function(no){
        	var index = 0;
        	for(let i in $scope.alertList){
        		index = $scope.alertList[i].no==no?i:index;
        	}
        	
        	$scope.alertList.splice(index, 1);
        }
        
        $scope.clearAlertList = function(){
        	for(let i in $scope.alertList){
        		$scope.alertList.pop();
        	}
        }

        /* 확인창 관련 자바스크립트 */
        var $confirmModal = $('#confirmModal');
        $scope.confirmModal = defualtModalFactory.confirm;
        
        $scope.confirm = function(title, content, callback){
            $confirmModal.modal('show');
            $scope.confirmModal.title = title;
            $scope.confirmModal.content = content;
            $scope.confirmModal.callback = function(){
                $confirmModal.modal('hide');
                callback();
            }
        }
        
    });
}