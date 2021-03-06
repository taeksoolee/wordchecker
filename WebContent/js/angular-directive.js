export function setDirective(angularModule){
    angularModule
    .directive('appHeader', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/header.html'
        };
    })
    .directive('appFooter', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/footer.html'
        };
    })
    .directive('appAlert', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/modal/alert.html',
            controller: 'ModalController'
        };
    })
    .directive('appConfirm', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/modal/confirm.html',
            controller: 'ModalController'
        };
    })
    .directive('appExplain', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/modal/explain.html',
        };
    })
    .directive('wordModify', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/word/modify.html',
            controller: 'ModifyWordController'
        };
    })
    .directive('boardAdd', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/board/add.html',
            //controller: ''
        };
    })
    .directive('boardFilter', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/board/filter.html',
            controller: 'BoardFilterController'
        };
    })
    .directive('boardModify', function () {  
        return {
            restrict: 'E',
            templateUrl: 'tmp/board/modify.html',
        };
    })
}