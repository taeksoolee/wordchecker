export function boardController(angularModule){
    angularModule
    .controller('BoardController', function($scope, server, utils, defaultBoardFactory, boardListService){
        utils.navControl.closeNav();
        $scope.boardMemberList = [];
        
        var setBoardMember = function(){
        	boardListService.getBoard(server.contextPath, 0, 4).then(function(success){
        		console.log(success.data);
        		for(let i in success.data){
        			$scope.boardMemberList.push(success.data[i]);
        		}
            })
            .catch(function(error){console.log(error);});
        } 
        
        setBoardMember();
        
        $scope.openAddBoard = function(){
        	event.preventDefault();
        	$('#black-screen').show();
        	$('#addBoardComponent').show();
        }
        
        $scope.closeAddBoard = function(){
        	event.preventDefault();
        	$('#black-screen').hide();
        	$('#addBoardComponent').hide();
        }
        
        $scope.openModifyBoard = function(){
        	event.preventDefault();
        	$('#black-screen').show();
        	$('#modifyBoardComponent').show();
        }
        
        $scope.closeModifyBoard = function(){
        	event.preventDefault();
        	$('#black-screen').hide();
        	$('#modifyBoardComponent').hide();
        }
        
        $scope.openFilterBoard = function(){
        	event.preventDefault();
        	$('#black-screen').show();
        	$('#filterBoardComponent').show();
        }
        
        $scope.closeFilterBoard = function(){
        	event.preventDefault();
        	$('#black-screen').hide();
        	$('#filterBoardComponent').hide();
        }
        
        window.onscroll = function(){
        	if((document.body.offsetHeight + 96) == (window.innerHeight + window.scrollY)){
        		$scope.setWordList(utils.cookieControl.getJwtCookie(), wordListStart, wordListLength);
        	}
        }
    });
}