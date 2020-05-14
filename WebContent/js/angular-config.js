import { validation } from './regex.js';

var server = {contextPath: '/wordchecker-server'};

export const angularModule 
	= angular.module('wordCheckerApp', ['ngRoute', 'ngAnimate'])
	.constant('server', server)
	.filter('time', function(){
		return function(input){
			return (input>9)?input:'0'+input;
		}
	})
	.filter('nullString', function(){
		return function(input){
			return (input==undefined)?"-":input;
		}
	})
	.provider('utils', function(){
		this.$get = function(){
			return {
				'navControl':{
	                openNav: function(){
	                    $('#navbarSupportedContent').addClass('show');
	                },
	                closeNav: function(){
	                    $('#navbarSupportedContent').removeClass('show');
	                }
				},
				'validation': {
					member: {
						email: validation.validateEmail,
						password: validation.validatePassword,
						nickname: validation.validateNickname,
						birthday: validation.validateBirthday,
						form: function(member){
							if(validation.validateEmail(member.email)) return false;
							else if(validation.validatePassword(member.password)) return false;
							else if(validation.validateNickname(member.nickname)) return false;
							else if(validation.validateBirthday(member.birthday)) return false;
							
							return true;
						}
					},
					word: {
						speling: validation.validateSpeling,
						meaning: validation.validateMeaning,
						form: function(word){
							if(validation.validateSpeling(word.speling)) return false;
							else if(validation.validateMeaning(word.meaning)) return false;
							
							return true;
						}
					},
					board: {
						title: validation.validateTitle,
						content: validation.validateContent,
						form: function(board){
							if(validation.validateTitle(board.title)) return false;
							else if(validation.validateContent(board.contetnt)) return false;
							
							return true;
						}
					}
				},
				'getDateformat': function(year, month, day){
		        	if(!(typeof year != undefined && typeof month != undefined && typeof day != undefined 
		        			&& year != 0 && month != 0 && day != 0)) return "";
		        	return year + '-' + month + '-' + day;
		        },
		        'goRouting': function(routeUrl){
		    		location.href = location.href.split('?')[0].split('#')[0]+'#' + routeUrl
		        },
		        'cookieControl':{
					'setJwtCookie': function(value, minute) {
			            var date = new Date();
			            date.setTime(date.getTime() + (minute*60*60*1000));
			            document.cookie = 'jwt=' + value + ';expires=' + date.toUTCString() + ';path=/';
			        },
			        'getJwtCookie': function() {
			            var value = document.cookie.match('(^|;) ?jwt=([^;]*)(;|$)');
			            return value? value[2] : null;
			        },
			        'deleteJwtCookie': function() {
			            var date = new Date();
			            document.cookie = "jwt= " + "; expires=" + date.toUTCString() + "; path=/";
			        }
		        },
			}
		}
	})