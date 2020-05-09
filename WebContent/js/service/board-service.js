export function setBoardService(angularModule){
    angularModule
    .factory('defaultBoardFactory', function(){
        return {
            boardMemberList: [
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
        }
    })
    .service('boardListService', function($http, $q){
        this.getBoard = function(start, length){
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: '/wordchecker-s/board?start='+start+'&length='+length,
                headers: {'Content-Type': 'application/json'}
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	dererred.resolve(error);
            });
            return deferred.promise;
        }
    });
}