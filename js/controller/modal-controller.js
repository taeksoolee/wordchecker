import { defualtAlert, defualtConfirm } from "../service/modal-service.js";

export function modalController(angularModule){
    angularModule
    .controller('ModalController', function($scope, $timeout, $interval){
        /* 경고창 관련 자바스크립트 */
        $scope.alerted = false;
        $scope.alertModal = defualtAlert;

        $scope.alert = function(alertObj, type, second){
            $scope.alertModal = alertObj;
            $scope.alerted = true;
            var sec = 5;
            if(typeof second != "undefined") var sec = second;
            var classType = "alert-"
            switch (type) {
                case 'primary':
                case 'success':
                case 'warning':
                case 'danger':
                    classType = classType + type;
                    break;
                default:
                    classType = classType + 'primary';
            }
            var $alert = undefined;
            var alertItv = $interval(() => {
                $alert = $('.alert');
                if($alert.length != 0){
                    $alert.addClass(classType)
                    $interval.cancel(alertItv);
                }
            }, 1);

            $timeout(() => {
                $alert.removeClass(classType);
                $scope.alerted = false;
            }, 1000*parseInt(sec), true);
        }

        /* 확인창 관련 자바스크립트 */
        var $confirmModal = $('#confirmModal');
        $scope.confirmModal = defualtConfirm;
        
        $scope.confirm = function(title, content, callback){
            $confirmModal.modal('show');
            $scope.confirmModal.title = title;
            $scope.confirmModal.content = content;
            $scope.confirmModal.callback = function(){
                $confirmModal.modal('hide');
                callback();
            }
        }
    })
}