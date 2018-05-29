import 'core-js';
import 'document-register-element';
import '../../../dist/vendors/attachShadow.js';
import { events } from '../../js/elements/SidraService.element';
const element = document.querySelector('sidra-service');
element.addEventListener(events.success, (evt) => {
    document.querySelector('#response').innerHTML = JSON.stringify(evt.detail.json, null, 4);
});
//# sourceMappingURL=sidra-service.js.map