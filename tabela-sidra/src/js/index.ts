import { SidraServiceElement } from './elements/SidraService.element';
import { TabelaSidraElement } from './elements/TabelaSidra.element';
import { installCE } from 'document-register-element';

console.log(SidraServiceElement.tagName);
console.log(TabelaSidraElement.tagName);

customElements.define('sidra-service', SidraServiceElement);
customElements.define('tabela-sidra', TabelaSidraElement);