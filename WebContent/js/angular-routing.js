export function setRouting(angularModule){
    angularModule
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'MainController'
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
            templateUrl: 'tmp.word/test.html',
            controller: 'TestWordController'
        })
        .when('/member/join', {
            templateUrl: 'tmp.member/join.html',
            controller: 'JoinMemberController'
        })
        .when('/member/login', {
            templateUrl: 'tmp.member/login.html',
            controller: 'LoginMemberController'
        })
        .when('/member/search', {
            templateUrl: 'tmp.member/search.html',
            controller: 'SearchMemberController'
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