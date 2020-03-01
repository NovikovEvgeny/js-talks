
console.outputBuffer = '';
console.oldLog = console.log;
console.clearBuff = function() {
  this.outputBuffer = '';
};
console.log = function(...values) {
  console.oldLog(values);
  values = values.map((v) => typeof v === 'undefined' ? 'undefined' : JSON.stringify(v));
  this.outputBuffer += values.join(' ') + '\n';
};
console.getBuffer = function() {
  let bufferToReturn = this.outputBuffer;
  this.outputBuffer = '';
  return bufferToReturn;
};

const modalHTML = `
<!-- The Modal -->
<div id="myModal" class="modal">

  <!-- Modal content -->
  <div class="modal-content">
    <div class="modal-header">
      <span class="close">&times;</span>
      <h2>Code Runner</h2>
    </div>
    <div class="modal-body">
      <p><b>Output of</b></p>
      <div class="modal-code">
        <p class="modal-gray" id="modal-code-snippet"></p>
      </div>
      <p><b>is</b></p>
      <div class="modal-code">
        <p class="modal-gray" id="modal-code-execution-output">result</p>
      </div>
    </div>
    <div class="modal-footer">
      (c) JS Talks
    </div>
  </div>
</div>
`;

function docsifyrunCode(hook, vm) {
  document.body.innerHTML += modalHTML;
  const modal = document.getElementById("myModal");
  const span = document.getElementsByClassName("close")[0];
  span.onclick = function() {
    modal.style.display = "none";
    document.getElementById("modal-code-snippet").innerHTML = '';
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      document.getElementById("modal-code-snippet").innerHTML = '';
    }
  };

  hook.doneEach(function() {
    const targetElms = Array.apply(null, document.querySelectorAll('pre[data-lang]'));

    targetElms.forEach(elm => {
      elm.insertAdjacentHTML('afterbegin', '<button class="docsify-run-code-button">Run in browser</button>');
    });
  });

  hook.mounted(function() {
    const listenerHost = document.querySelector('.content');

    listenerHost.addEventListener('click', function(evt) {
      const isRunCodeButton = evt.target.classList.contains('docsify-run-code-button');
      if (isRunCodeButton) {
        const buttonElm = evt.target.tagName === 'BUTTON' ? evt.target : evt.target.parentNode;
        const preElm = buttonElm.parentNode;
        const codeElm = preElm.querySelector('code');

        try {
          eval(codeElm.innerText.replace(/global\./g, '(typeof global !== "undefined" ? global : window).'));
        } catch (e) {
          console.outputBuffer += e;
        }

        const snippetInsideModal = preElm.cloneNode(true);
        const runCodeBth = snippetInsideModal.firstChild;
        const copyCodeBth = snippetInsideModal.lastChild;
        snippetInsideModal.removeChild(runCodeBth);
        snippetInsideModal.removeChild(copyCodeBth);
        document.getElementById("modal-code-snippet").appendChild(snippetInsideModal);
        document.getElementById("modal-code-execution-output").innerText = console.getBuffer();
        modal.style.display = "block";
      }
    });
  });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyrunCode].concat(window.$docsify.plugins || []);
