export function setMemberService(angularModule){
    angularModule
    .factory('defaultMemberFactory', function(getMemberService, utils){
        return {
            getJoinMember: function(){
            	return {
	            	"email":"",
	                "password":"",
	                "nickname":"",
	                "birthday":""
	            }
            },
            getSearchEmail: function(){
            	return {
		        	"nickname":"",
		        	"birthday":""
		        }
            },
            getSearchPassword: function(){
            	return {
	            	"email":"",
	            	"birthday":""
            	}
            },
            getLoginMember: function(){
            	return {
	            	"email": "",
	            	"password": ""
            	}
            }
        }
    })
    .service('searchMemberService', function($http, $q, server){
    	this.searchMember = function(member){
    		var deferred = $q.defer();
        	
        	member.no = (typeof member.no == 'undefined')?'':member.no;
        	member.email = (typeof member.email == 'undefined')?'':member.email;
        	member.nickname = (typeof member.nickname == 'undefined')?'':member.nickname;
        	member.birthday = (typeof member.birthday == 'undefined')?'':member.birthday;
        	
            $http({
                method: 'POST',
                url: server.contextPath + '/member/search/email',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                dateType: "text",
                data: JSON.stringify(member)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            
            return deferred.promise;
    	};
    	
    	this.searchMemberNickname = function(member){
    		var deferred = $q.defer();
    		$http({
                method: 'POST',
                url: server.contextPath + '/member/search/nickname',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                dateType: "text",
                data: JSON.stringify(member)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            
            return deferred.promise;
    	}
    	
    	this.searchMemberPassword = function(member){
    		var deferred = $q.defer();
    		$http({
                method: 'POST',
                url: server.contextPath + '/member/search/password',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                dateType: "text",
                data: JSON.stringify(member)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            
            return deferred.promise;
    	};
    })
    .service('joinMemberService', function($http, $q, server){
    	this.join = function(joinMember){
    		var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server.contextPath + '/member',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                dateType: "text",
            	data: JSON.stringify(joinMember)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    	}
    })
    .service('loginMemberService', function($http, $q, server){
    	this.login = function(loginMember, autoLogin){
    		var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server.contextPath + '/member/login/' + autoLogin,
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                dateType: "text",
            	data: JSON.stringify(loginMember)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    	}
    	
    	this.checkLogin = function(jwt){
    		var deferred = $q.defer();
            $http({
                method: 'POST',
                url: server.contextPath + '/member/check',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    	}
    	
    	this.getRefreshJwt = function(jwt, minute){
    		var deferred = $q.defer();
            $http({
                method: 'GET',
                url: server.contextPath + '/auth/jwt/refresh/'+minute,
                headers: {'Content-Type': 'application/json; charset=utf-8',
                			'jwt': jwt},
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            return deferred.promise;
    		
    	}
    })
    .service('getMemberService', function($http, $q, server){
    	this.getMember = function(jwt){
    		var deferred = $q.defer();
        	
            $http({
                method: 'GET',
                url: server.contextPath + '/auth/member',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                		'jwt': jwt},
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            
            return deferred.promise;
    	}
    })
    .service('modifyMemberService', function($http, $q, server){
    	this.modifyMember = function(jwt, modifyMember){
    		var deferred = $q.defer();
        	
            $http({
                method: 'PATCH',
                url: server.contextPath + '/auth/member',
                headers: {'Content-Type': 'application/json; charset=utf-8',
                		'jwt': jwt},
	    		dateType: "text",
	        	data: JSON.stringify(modifyMember)
            })
            .then(function successCallback(response) {
                deferred.resolve(response);
            }, function errorCallback(error) {
            	deferred.resolve(error);
            });
            
            return deferred.promise;
    	}
    });
}