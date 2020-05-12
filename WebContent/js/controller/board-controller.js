export function boardController(angularModule){
    angularModule
    .controller('BoardController', function($rootScope, $scope, utils, defaultBoardFactory, boardListService, addBoardService, removeBoardService){
    	$rootScope.afterLoginUrl = '/board';
    	
        utils.navControl.closeNav();
        
        var getDefaultStart = function(){
        	return 0;
        }
        var getDefaultLength = function(){
        	return 5;
        }
        $scope.setBoardListDefaultConfig = function(){
        	$scope.boardListStart = getDefaultStart();
        	$scope.boardListLength = getDefaultLength();
        }
        
        $scope.setBoardListDefaultConfig();
        $scope.boardMemberList = [];
        
        var setBoardMember = function(){
        	boardListService.getBoardMemberList($scope.boardListStart, $scope.boardListLength)
        	.then(function(success){
        		for(let i in success.data){
        			$scope.boardMemberList.push(success.data[i]);
        		}
        		$scope.boardListStart = $scope.boardListStart +  $scope.boardListLength;
            })
            .catch(function(error){console.log(error);});
        }
        
        setBoardMember();
        
        $scope.checkBoardBookmark = function(no){
        	if(no == undefined){
        		$rootScope.boardBookmark = -1;
        	}else{
        		$rootScope.boardBookmark = no;
        	}
        }
        
        
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
        
        $scope.addBoardForm = defaultBoardFactory.getDefaultAddBoard();
        
        $scope.addBoard = function(){
        	addBoardService.addBoard(utils.cookieControl.getJwtCookie(), $scope.addBoardForm)
        	.then(function(success){
        		if(success.message == undefined){
        			$scope.alert({content1:'게시물 등록이 완료되었습니다.'}, 'success');
        			$scope.closeAddBoard();
        			$scope.addBoardForm = defaultBoardFactory.getDefaultAddBoard();
        			boardListService.getBoardMemberList(0, 1)
                	.then(function(success){
                		for(let i in success.data){
                			$scope.boardMemberList.splice(0,0,success.data[i]);
                		}
                		$scope.boardListStart = $scope.boardListStart++;
                    })
                    .catch(function(error){console.log(error);});
        		}else{
        			$scope.alert({content1: success.message}, 'danger');
        		}
            })
            .catch(function(error){
            	console.log(error);
            });
        }
        
        $scope.removeBoard = function(no){
        	var removeBoard = {
    			"no": no,
    			"state": 0
        	} 
        	removeBoardService.removeBoard(utils.cookieControl.getJwtCookie(), removeBoard).
        	then(function(success){
        		$scope.alert({content1:'선택하신 게시물 삭제되었습니다.'}, 'success');
        		for(let i in $scope.boardMemberList){
        			if(no == $scope.boardMemberList[i].board.no){
        				$scope.boardMemberList.splice(i,1);
        			}
        		}
        	})
        	.catch(function(error){})
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
        
        $(window).scroll(function(){
        	var scrolltop = $(window).scrollTop();
			if( scrolltop == $(document).height() - $(window).height() ){
				boardListService.getBoardMemberList($scope.boardListStart, $scope.boardListLength)
	        	.then(function(success){
	        		for(let i in success.data){
	        			$scope.boardMemberList.push(success.data[i]);
	        		}
	        		$scope.boardListStart = $scope.boardListStart +  $scope.boardListLength;
	            })
	            .catch(function(error){console.log(error);});
			}
		});
    });
}