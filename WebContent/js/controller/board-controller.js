export function boardController(angularModule){
    angularModule
    .controller('BoardController', function($rootScope, $scope, utils, defaultBoardFactory, boardListService, addBoardService, removeBoardService, boardService, modifyBoardService){
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
        
        $scope.boardMemberFilter = defaultBoardFactory.getDefaultBoardMemberFilter();
        $scope.setBoardListDefaultConfig();
        $scope.boardMemberList = [];
        $scope.setBoardWriteDate = function(){
        	var dates = $scope.boardMemberFilter.writeDate.split(' > ');
         	$scope.boardMemberFilter.startDate = dates[0];
         	$scope.boardMemberFilter.endDate = dates[1];
        }
        
        
        
        $scope.setBoardMemberList = function(){
        	$scope.setBoardWriteDate();
        	boardListService.getBoardMemberList($scope.boardListStart, $scope.boardListLength, $scope.boardMemberFilter)
        	.then(function(success){
        		for(let i in success.data){
        			$scope.boardMemberList.push(success.data[i]);
        		}
        		$scope.boardListStart = $scope.boardListStart +  $scope.boardListLength;
            })
            .catch(function(error){console.log(error);});
        }
        
        $scope.setBoardMemberList();
        
        $scope.checkBoardBookmark = function(no){
        	if(no == undefined){
        		$rootScope.boardBookmark = -1;
        	}else{
        		$rootScope.boardBookmark = no;
        	}
        }
        
        
        $scope.openAddBoard = function(){
        	event.preventDefault();
        	$('.black-screen').show();
        	$('#addBoardComponent').show();
        }
        
        $scope.closeAddBoard = function(){
        	event.preventDefault();
        	$('.black-screen').hide();
        	$('#addBoardComponent').hide();
        	$scope.addBoardForm = defaultBoardFactory.getDefaultAddBoard();
        }
        
        $scope.addBoardForm = defaultBoardFactory.getDefaultAddBoard();
        
        $scope.addBoard = function(){
        	if(!($scope.addBoardForm.title != "" && $scope.addBoardForm.content != "")){
        		$scope.alert({content1:'제목 또는 내용을 입력하세요.'}, 'warning');
        		return;
        	}
        	
        	$scope.setBoardWriteDate();
        	$scope.confirm('확인 메시지', '게시글을 등록하시겠습니까?', function(){
	        	addBoardService.addBoard(utils.cookieControl.getJwtCookie(), $scope.addBoardForm)
	        	.then(function(success){
	        		if(success.message == undefined){
	        			$scope.alert({content1:'게시물 등록이 완료되었습니다.'}, 'success');
	        			$scope.closeAddBoard();
	        			$scope.addBoardForm = defaultBoardFactory.getDefaultAddBoard();
	        			boardListService.getBoardMemberList(0, 1, $scope.boardMemberFilter)
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
        	});
        }
        
        $scope.removeBoard = function(no){
        	$scope.confirm('확인 메시지', '선택하신 게시글을 삭제하시겠습니까?', function(){
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
        	})
        }
        
        $scope.modifyBoardForm = defaultBoardFactory.getDefaultAddBoard();
        $scope.openModifyBoard = function(no){
        	event.preventDefault();
        	$scope.setBoardWriteDate();
        	boardService.getBoard(utils.cookieControl.getJwtCookie(), no)
        	.then(function(success){
        		$scope.modifyBoardForm.no = success.data.no;
        		$scope.modifyBoardForm.title = success.data.title;
        		$scope.modifyBoardForm.content = success.data.content;
            	$('.black-screen').show();
            	$('#modifyBoardComponent').show();
        	})
        	.catch(function(){})
        }
        
        $scope.closeModifyBoard = function(){
        	event.preventDefault();
        	$('.black-screen').hide();
        	$('#modifyBoardComponent').hide();
        	$scope.modifyBoardForm = defaultBoardFactory.getDefaultAddBoard();
        }
        
        $scope.modifyBoard = function(){
        	$scope.setBoardWriteDate();
        	modifyBoardService.modifyBoard(utils.cookieControl.getJwtCookie(), $scope.modifyBoardForm)
        	.then(function(success){
        		$scope.alert({content1:'게시물 수정되었습니다.'}, 'success');
        		boardService.getBoard(utils.cookieControl.getJwtCookie(), $scope.modifyBoardForm.no)
            	.then(function(success){
            		for(let i in $scope.boardMemberList){
            			if(success.data.no == $scope.boardMemberList[i].board.no){
            				$scope.boardMemberList.splice(i,1, {
            					board: success.data,
            					member: $scope.boardMemberList[i].member
            				});
            			}
            		}
            		$scope.closeModifyBoard();
            	})
            	.catch(function(){})
        	})
        	.catch(function(error){})
        }
        
        $(window).scroll(function(){
        	var scrolltop = $(window).scrollTop();
			if( scrolltop == $(document).height() - $(window).height() ){
				boardListService.getBoardMemberList($scope.boardListStart, $scope.boardListLength, $scope.boardMemberFilter)
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