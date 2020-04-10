function iHaveASecret() {
    const secret = 'very secret phrase';
  
    return function tellSecret() {
      console.log(`hey, do not tell anyone, but the secret is : ${secret}`);
    }
  }
  
  const blah = iHaveASecret();
  blah();

  console.log(new iHaveASecret().secret); // unefined
  console.log(iHaveASecret.secret); //
  console.log(iHaveASecret.prototype.secret);
  console.log(new iHaveASecret().prototype.secret);
  



function hello(name) {
console.log(`hello ${name || 'world'}!`);
}

hello('space');
hello.apply(null, ['space']); // Apply -> Array
hello.call(null, 'space'); 

(function(input) {
  console.log('Your input is ' + input);
})(5);

async function sleep(ms) {
return new Promise(res => {
    setTimeout(res, ms);
});
}

(async function() {
  await sleep(2000);
  console.log('woke up!');
})();