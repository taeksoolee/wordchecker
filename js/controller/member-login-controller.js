export function loginMemberController(angularModule){
    angularModule
    .controller('LoginMemberController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
    })
};