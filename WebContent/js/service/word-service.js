export function setWordService(angularModule){
    angularModule
    .factory('defaultWordFactory', function(){
        return {
            getWordList: function(){
            	return [
                    {
                        no: "",
                        speling: "",
                        meaning: ""
                    }
                ]
            },
            getWord: function(){
            	return {
                    no: "",
                    speling: "",
                    meaning: ""
                }
            }
        } 
    })
    .service('addWordService', function($http, $q, server){
    	this.addWordList = function(word, jwt){
    		var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server.contextPath + '/auth/word',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
                dateType: "text",
            	data: JSON.stringify(word)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    	}
    })
    .service('modifyWordService', function($http, $q, server){
    	this.modifyWordState = function(jwt, word){
    		var deferred = $q.defer();
            $http({
                method: 'PATCH',
                url: server.contextPath + '/auth/word/state',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
                dateType: "text",
            	data: JSON.stringify(word)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	throw new Error();
            });
            return deferred.promise;
    	}
    	
    	this.modifyWord = function(jwt, word){
    		var deferred = $q.defer();
            $http({
                method: 'PATCH',
                url: server.contextPath + '/auth/word',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
                dateType: "text",
            	data: JSON.stringify(word)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	throw new Error();
            });
            return deferred.promise;
    	}
    })
    .service('getWordService', function($http, $q, server){
    	this.getWordList = function(jwt, start, length){
    		var deferred = $q.defer();
            $http({
                method: 'GET',
                url: server.contextPath + '/auth/word?start='+start+'&length='+length,
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	throw new Error(error);
            });
            return deferred.promise;
    	}
    	
		this.getWord = function(jwt, wordNo){
		    var deferred = $q.defer();
		    $http({
		        method: 'GET',
		        url: server.contextPath + '/auth/word/no/'+wordNo,
		        headers: {'Content-Type': 'application/json',
		    		'jwt': jwt}
		    }).then(function successCallback(response) {
		        deferred.resolve(response);
		    }, function errorCallback(error) {
		    	deferred.resolve(error);
		    });
		    return deferred.promise;
		}
		
		
		this.getWordTestList = function(jwt, filter, order){
			var deferred = $q.defer();
		    $http({
		         method: 'POST',
		         url: server.contextPath + '/auth/word/test/'+order,
		         headers: {'Content-Type': 'application/json; charset=utf-8',
		         			'jwt': jwt},
				dateType: "text",
		     	data: JSON.stringify(filter)
		     })
		     .then(function successCallback(response) {
		         deferred.resolve(response);
		     }, function errorCallback(error) {
		     	throw new Error(error);
		     });
		     return deferred.promise;
		}
    });
}