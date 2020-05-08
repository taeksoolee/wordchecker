import { defaultBoardList } from "../service/board-service.js";

export function boardController(angularModule){
    angularModule
    .controller('BoardController', function($scope, utils){
        utils.navCtrlFuncs.closeNav();
        $scope.boardList = defaultBoardList;
    })
}