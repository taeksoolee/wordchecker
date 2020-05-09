export function boardController(angularModule){
    angularModule
    .controller('BoardController', function($scope, utils, defaultBoardFactory, boardListService){
        utils.navCtrlFuncs.closeNav();

        $scope.boardMemberList = defaultBoardFactory.boardMemberList;
        
        boardListService.getBoard(0, 4).then(function(success){
        	$scope.boardMemberList = success.data
        	console.log($scope.boardMemberList);
        })
        .catch(function(error){
        	console.log(error);
        });
    });
}