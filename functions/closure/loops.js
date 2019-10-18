for (var i = 0; i < 10; i++) {
    (function(j) {
        setTimeout(function() {
          console.log("callback #", j, "is fired");
      }, i * 1000);
    })(i);
  }