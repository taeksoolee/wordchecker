import { angularModule } from "./angular-config.js";
import { setRouting } from "./angular-routing.js";
import { setDirective } from "./angular-directive.js";

import { setDateService } from "./service/date-service.js";
import { setModalService } from "./service/modal-service.js";
import { setMemberService } from "./service/member-service.js";
import { setWordService } from "./service/word-service.js";
import { setBoardService } from "./service/board-service.js";

import { rootController } from "./controller/root-controller.js";
import { mainController } from "./controller/main-controller.js";
import { modalController } from "./controller/modal-controller.js";
import { boardController } from "./controller/board-controller.js";
import { addWordController } from "./controller/word-add-controller.js";
import { listWordController } from "./controller/word-list-controller.js";
import { testWordController } from "./controller/word-test-controller.js";
import { modifyWordController } from "./controller/word-modify-controller.js";
import { joinMemberController } from "./controller/member-join-controller.js";
import { loginMemberController } from "./controller/member-login-controller.js";
import { searchMemberController } from "./controller/member-search-controller.js";
import { modifyMemberController } from "./controller/member-modify-controller.js";

setRouting(angularModule);
setDirective(angularModule);

setDateService(angularModule);
setModalService(angularModule);
setMemberService(angularModule);
setWordService(angularModule);
setBoardService(angularModule);

rootController(angularModule);
mainController(angularModule);
modalController(angularModule);
boardController(angularModule);
addWordController(angularModule);
listWordController(angularModule);
testWordController(angularModule);
modifyWordController(angularModule);
joinMemberController(angularModule);
loginMemberController(angularModule);
searchMemberController(angularModule);
modifyMemberController(angularModule);