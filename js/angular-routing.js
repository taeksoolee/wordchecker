export function setRouting(angularModule){
    angularModule
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            template: '<h4>메인 템플릿</h4>'
        })
        .when('/board', {
            templateUrl: 'tmp.board/board.html',
            controller: 'BoardController'
        })
        .when('/word/add', {
            templateUrl: 'tmp.word/add.html',
            controller: 'AddWordController'
        })
        .when('/word/list', {
            templateUrl: 'tmp.word/list.html',
            controller: 'ListWordController'
        })
        .when('/word/list', {
            templateUrl: 'tmp.word/list.html',
            controller: 'ListWordController'
        })
        .when('/word/test', {
            //templateUrl: 'tmp.word/list.html',
            //controller: 'ListWordController'
        })
        .when('/member/join', {
            templateUrl: 'tmp.member/join.html',
            controller: 'JoinMemberController'
        })
        .when('/member/login', {
            templateUrl: 'tmp.member/login.html',
            //controller: 'ListWordController'
        })
        .when('/member/search', {
            templateUrl: 'tmp.member/search.html',
            //controller: 'ListWordController'
        })
    })
    .run(function($rootScope){
        $rootScope.$on('$routeChangeStart', function(e, curr, prev){
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function(e, curr, prev){
            $rootScope.isLoading = false;
        });
    })
}