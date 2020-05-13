export function setBoardService(angularModule){
    angularModule
    .factory('defaultBoardFactory', function(){
        return {
            getDefaultBoardMemberList: function(){
            	return [
                	{
                		board: {
    	                    "no": "",
    	                    "writer": "",
    	                    "date": "",
    	                    "title": "",
    	                    "content": ""
    	                },
    	                member: {
    	                	"no": "",
    	                	"email": "",
    	                	"nickname": "",
    	                	"birthday": "",
    	                	"lastLogin": "",
    	                	"joinDate": ""
    	                }
                	}
                ]
            },
            getDefaultBoardMemberFilter: function(){
            	return {
            		"content": "",
            		"title": "",
            		"writeDate": "",
            		"startDate": "",
            		"endDate": "",
            		"nickname": ""
            	}
            },
            getDefaultAddBoard: function(){
            	return {
                    "title": "",
                    "content": ""
            	}
            }
        }
    })
    .service('boardListService', function($http, $q, server){
        this.getBoardMemberList = function(start, length, filter){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: server.contextPath + '/board?start='+start+'&length='+length+'&content='+filter.content+'&title='+filter.title+'&startDate='+filter.startDate+'&endDate='+filter.endDate+'&nickname='+filter.nickname,
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
        }
    })
    .service('boardService', function($http, $q, server){
        this.getBoard = function(jwt, boardNo){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: server.contextPath + '/auth/board/no/'+boardNo,
                headers: {'Content-Type': 'application/json',
            		'jwt': jwt}
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
        }
    })
    .service('addBoardService', function($http, $q, server){
        this.addBoard = function(jwt, board){
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server.contextPath + '/auth/board',
                headers: {'Content-Type': 'application/json',
                		'jwt': jwt},
        		dateType: "text",
            	data: JSON.stringify(board)
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
        }
    })
    .service('removeBoardService', function($http, $q, server){
        this.removeBoard = function(jwt, board){
            var deferred = $q.defer();
            $http({
                method: 'PATCH',
                url: server.contextPath + '/auth/board/state',
                headers: {'Content-Type': 'application/json',
                		'jwt': jwt},
        		dateType: "text",
            	data: JSON.stringify(board)
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
        }
    })
    .service('modifyBoardService', function($http, $q, server){
        this.modifyBoard = function(jwt, board){
            var deferred = $q.defer();
            $http({
                method: 'PATCH',
                url: server.contextPath + '/auth/board/',
                headers: {'Content-Type': 'application/json',
                		'jwt': jwt},
        		dateType: "text",
            	data: JSON.stringify(board)
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
        }
    });
}