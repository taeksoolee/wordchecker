export function setDirective(angularModule){
    angularModule
    .directive('appHeader', function () {  
        return {
            restrict: 'E',
            templateUrl: 'header.html'
        };
    })
    .directive('appFooter', function () {  
        return {
            restrict: 'E',
            templateUrl: 'footer.html'
        };
    })
    .directive('appAlert', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp.modal/alert.html',
            controller: 'ModalController'
        };
    })
    .directive('appConfirm', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp.modal/confirm.html',
            controller: 'ModalController'
        };
    })
    .directive('wordModify', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp.word/modify.html',
            controller: 'ModifyWordController'
        };
    })
}