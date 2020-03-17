/// [timeout]
setTimeout(function iAmCallback() {
  console.log('hello from the future');
}, 1000);
/// [timeout]

/// [timeout-reference]
function iAmACallback() {
  console.log('hello from the future');
}

//                    ↓ note: there is no `()` !
setTimeout(iAmACallback, 1000);
/// [timeout-reference]
