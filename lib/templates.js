'use babel';

import {createElement} from './helpers.js';

// status bar template
let tileTemplate = {
    classes: 'inline-block',
    innerHtml: '<span id="break-interval-timer" class="icon icon-hourglass">0 | --:--:--</span>'
};

export let statusTile = createElement(
    tileTemplate.innerHtml,
    tileTemplate.classes
);

// break time overlay
let quotes = [
    "Whatever the mind of man can conceive and believe, it can achieve – Napoleon Hill",
    "A goal is a dream with a deadline. – Napoleon Hill",
    "If you cannot do great things, do small things in a great way. – Napoleon Hill",
    "Don't wait. The time will never be just right. – Napoleon Hill",
    "Patience, persistence and perspiration make an unbeatable combination for success. – Napoleon Hill",
    "The starting point of all achievement is desire. – Napoleon Hill",
    "It is literally true that you can succeed best and quickest by helping others to succeed. – Napoleon Hill",
    "When your desires are strong enough you will appear to possess superhuman powers to achieve. – Napoleon Hill",
    "Most great people have attained their greatest success just one step beyond their greatest failure. – Napoleon Hill",
    "Action is the real measure of intelligence. – Napoleon Hill"
];

let panelTemplate = {
    classes: 'cover-window',
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
