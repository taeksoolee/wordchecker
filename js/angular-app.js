import { angularModule } from "./angular-config.js";
import { setRouting } from "./angular-routing.js";
import { setDirective } from "./angular-directive.js";
import { modalController } from "./controller/modal-controller.js";
import { boardController } from "./controller/board-controller.js";
import { addWordController } from "./controller/word-add-controller.js";
import { listWordController } from "./controller/word-list-controller.js";
import { modifyWordController } from "./controller/word-modify-controller.js";
import { joinMemberController } from "./controller/member-join-controller.js";

setRouting(angularModule);
setDirective(angularModule);

modalController(angularModule);
boardController(angularModule);
addWordController(angularModule);
listWordController(angularModule);
modifyWordController(angularModule);
joinMemberController(angularModule);