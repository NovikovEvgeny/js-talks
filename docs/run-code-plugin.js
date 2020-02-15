// Plugin
// =============================================================================

let buffer = '';
console.oldLog = console.log;
console.clearBuff = function() {
  buffer = '';
};
console.log = function(value) {
  console.oldLog(value);
  buffer += value + '\n';
};
console.getBuffer = function() {
  let bufferToReturn = buffer;
  buffer = '';
  return bufferToReturn;
};

function docsifyrunCode(hook, vm) {
  hook.doneEach(function() {
    const targetElms = Array.apply(null, document.querySelectorAll('pre[data-lang]'));

    const template = [
      '<button class="docsify-run-code-button">',
      'Run in browser',
      '</button>'
    ].join('');

    targetElms.forEach(elm => {
      elm.insertAdjacentHTML('afterbegin', template);
    });
  });

  hook.mounted(function() {
    const listenerHost = document.querySelector('.content');

    listenerHost.addEventListener('click', function(evt) {
      const isrunCodeButton = evt.target.classList.contains('docsify-run-code-button');
      if (isrunCodeButton) {
        const buttonElm = evt.target.tagName === 'BUTTON' ? evt.target : evt.target.parentNode;
        const preElm = buttonElm.parentNode;
        const codeElm = preElm.querySelector('code');
        try {
          eval(codeElm.innerText);
        } catch (e) {
          buffer += e;
        }
        alert(`output of ${codeElm.innerText} is ${console.getBuffer()}`);
      }
    });
  });
}

// Deprecation warning for v1.x: stylesheet
if (document.querySelector('link[href*="docsify-copy-code"]')) {
  // eslint-disable-next-line
  console.warn('[Deprecation] Link to external docsify-copy-code stylesheet is no longer necessary.');
}

// Deprecation warning for v1.x: init()
window.DocsifyrunCodePlugin = {
  init: function() {
    return function(hook, vm) {
      hook.ready(function() {
        // eslint-disable-next-line
        console.warn('[Deprecation] Manually initializing docsify-copy-code using window.DocsifyrunCodePlugin.init() is no longer necessary.');
      });
    };
  }
};

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyrunCode].concat(window.$docsify.plugins || []);
