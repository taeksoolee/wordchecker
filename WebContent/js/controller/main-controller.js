export function mainController(angularModule){
    angularModule
    .controller('MainController', function($scope, utils){
		utils.navControl.closeNav();
	})
}