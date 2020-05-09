export function searchMemberController(angularModule){
    angularModule
    .controller('SearchMemberController', function($scope, utils, dateSetService){
        utils.navCtrlFuncs.closeNav();
        dateSetService.setDateSelect();
        
        
    });
}
