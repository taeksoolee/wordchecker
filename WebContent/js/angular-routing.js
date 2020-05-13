export function setRouting(angularModule){
    angularModule
    .config(function($routeProvider){
        $routeProvider
        .when('/', {
            templateUrl: 'tmp/main.html',
            controller: 'MainController'
        })
        .when('/board', {
            templateUrl: 'tmp/board/board.html',
            controller: 'BoardController'
        })
        .when('/word/add', {
            templateUrl: 'tmp/word/add.html',
            controller: 'AddWordController'
        })
        .when('/word/list', {
            templateUrl: 'tmp/word/list.html',
            controller: 'ListWordController'
        })
        .when('/word/list', {
            templateUrl: 'tmp/word/list.html',
            controller: 'ListWordController'
        })
        .when('/word/test', {
            templateUrl: 'tmp/word/test.html',
            controller: 'TestWordController'
        })
        .when('/member/join', {
            templateUrl: 'tmp/member/join.html',
            controller: 'JoinMemberController'
        })
        .when('/member/login', {
            templateUrl: 'tmp/member/login.html',
            controller: 'LoginMemberController'
        })
        .when('/member/search', {
            templateUrl: 'tmp/member/search.html',
            controller: 'SearchMemberController'
        })
        .when('/member/modify', {
            templateUrl: 'tmp/member/modify.html',
            controller: 'ModifyMemberController'
        })
        .when('/error', {
            templateUrl: 'tmp/error.html',
        })
        .otherwise({
        	redirectTo: '/error'
        })
    })
    .run(function($rootScope){
        $rootScope.$on('$routeChangeStart', function(e, curr, prev){
        	$rootScope.wordBookmark = -1;
        	$rootScope.boardBookmark = -1;
            $rootScope.isLoading = true;
        });
        $rootScope.$on('$routeChangeSuccess', function(e, curr, prev){
            $rootScope.isLoading = false;
        });
    })
}