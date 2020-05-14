export function boardFilterController(angularModule){
    angularModule
    .controller('BoardFilterController', function($rootScope, $scope, utils, defaultBoardFactory, boardListService, addBoardService, removeBoardService, boardService, modifyBoardService){
    	 $scope.openFilterBoard = function(){
         	event.preventDefault();
         	$('.black-screen').show();
         	$('#filterBoardComponent').show();
         }
         
         $scope.closeFilterBoard = function(){
         	event.preventDefault();
         	$('.black-screen').hide();
         	$('#filterBoardComponent').hide();
         }
         
         $scope.filterBoard = function(){
         	$scope.boardMemberList = [];
         	$scope.setBoardListDefaultConfig();
         	$scope.setBoardMemberList();
         	$scope.closeFilterBoard();
         }
    	
         var now = new Date();
     	var startDate = (now.getYear()+1900) + '-' + (now.getMonth()) + '-' + now.getDate();
     	var endDate = (now.getYear()+1900) + '-' + (now.getMonth()+1) + '-' + now.getDate();
     	
     	$(function() {
     		$('.drp').daterangepicker({
     			"autoUpdateInput": true,
     			"startDate": startDate,
     			"endDate": endDate,
     			"locale": {
     		        "format": "YYYY-MM-DD",
     		        "separator": " > "
     			}
     		}, function(start, end, label) {});
     	});
    });
}