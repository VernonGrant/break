'use babel';

import {createElement} from './helpers.js';

let tileTemplate = {
    classes: 'inline-block',
    innerHtml: '<span id="break-interval-timer" class="icon icon-hourglass">0 | --:--:--</span>'
};

export let statusTile = createElement(
    tileTemplate.innerHtml,
    tileTemplate.classes
);

let panelTemplate = {
    classes: '',
    innerHtml: `
<div id="break-cover-window">
<div id="break-panel">
  <div class="text-center">
    <h4 class="actual-heading">
      Time to take a <span class="text-danger">break;</span>
    </h4>
    <p id="break-quote" class="break-quote"></p>
    <div class="block">
      <progress id="break-progress" class="inline-block" max="100" value="0"></progress>
    </div>
  </div>
</div>
</div>
`
};

export let topPanelTemplate = createElement(
    panelTemplate.innerHtml,
    panelTemplate.classes
);
