export function setMemberService(angularModule){
    angularModule
    .factory('defaultMemberFactory', function(){
        return {
        	
        } 
    })
    .service('joinMemberService', function($http, $q){
    	this.join = function(joinMember){
    		var deferred = $q.defer();
            $http({
                method: 'POST',
                url: '/wordchecker-s/member',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
            	data: JSON.stringify($.param(joinMember))
            }).then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    	}
    });
}