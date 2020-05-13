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
    	
    	var $drp = $('.drp');
    	var now = new Date();
    	var today = (now.getYear()+1900) + '-' + (now.getMonth()+1) + '-' + now.getDate();
    	
    	
    	$(function() {
    		$('.drp').daterangepicker({
    			autoUpdateInput: true,
    			startDate: '2020-01-01',
    			endDate: today,
    			"locale": {
    		        "format": "YYYY-MM-DD",
    		        "separator": " > "
    			}
    		}, function(start, end, label) {});
    	});
    });
}