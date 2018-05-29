import 'core-js';
import 'document-register-element';
import '../../../dist/vendors/attachShadow.js';

import { SidraServiceElement, events } from '../../js/elements/SidraService.element';

const element: SidraServiceElement = document.querySelector('sidra-service');

element.addEventListener(events.success, (evt: CustomEvent) => {
    document.querySelector('#response').innerHTML = JSON.stringify(evt.detail.json, null, 4);
});