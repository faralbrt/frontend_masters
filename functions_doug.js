'use strict';

function add(first, second) {
  return first + second;
}

function sub(first, second) {
  return first - second;
}

function mul(first, second) {
  return first * second;
}

function identityf(value) {
  return function() {
    return value;
  };
}

function addf(first) {
  return function(second) {
    return add(first, second);
  };
}

function liftf(functionName) {
  return function(first) {
    return function(second) {
      return functionName(first, second);
    };
  };
}

// console.log(liftf(add)(3)(3))

function curry(binary, first) {
  return function(second) {
    return binary(first, second);
  };
}

var inc = addf(1);
    inc = liftf(add)(1);
    inc = curry(add, 1);

function twice(binary) {
  return function(number) {
    return binary(number, number);
  };
}

var doubl  = twice(add);
var square = twice(mul);

function reverse(binary) {
  return function(a, b) {
    return binary(b, a);
  };
}

function composeu(a, b) {
  return function(number) {
    return b(a(number));
  };
}

// console.log(composeu(doubl, square)(5));

function composeb(f, g) {
  return function(a, b, c) {
    return g(f(a, b), c);
  };
}
// console.log(composeb(add, mul)(2, 3, 7));

function limit(binary, numOfTimes) {
  var timesCalled = 0;
  return function(a, b) {
    if (timesCalled === numOfTimes) {
      return undefined;
    }
    else {
      timesCalled += 1;
      return binary(a, b);
    }
  };
}

// var add_ltd = limit(add, 1);
// console.log(add_ltd(3, 5));
// console.log(add_ltd(3, 5));

function from(number) {
  return function () {
    var next = number;
    number += 1;
    return next;
  };
}

function to(f, limit) {
  return function () {
    var next = f();
    if (next < limit) {
      return next;
    }
    return undefined;
  };
}

function fromTo(start, end) {
  return to(from(start), end);
}

function element(array, gen) {
  if (gen === undefined) {
    gen = fromTo(0, array.length);
  }
  return function () {
    var index = gen();
    if (index !== undefined) {
      return array[index];
    }
  };
}

var array = [];

function collect(gen, array) {
  return function () {
    var result = gen();
    if (result !== undefined) {
      array.push(result);
    }
    return result;
  };
}

function filter(gen, predicate) {
  return function () {
    while (predicate(value) !== true) {
      var value = gen();
      if (value === undefined) {
        return undefined;
      }
    }
    return value;
  };
}

function concat(f, g) {
  return function() {
    var first = f();
    if (first !== undefined) {
      return first;
    }
    else {
      return g();
    }
  };
}

function gensymf(symbol) {
  var gen = from(1);
  return function () {
    return symbol + gen()
  };
}
// var gensymfh = gensymf("H");
function fibonaccif(a, b) {
  var timesCalled = 0;
  return function () {
    var next;
    timesCalled += 1;
    if (timesCalled === 1) {
      return a;
    }
    else if (timesCalled === 2) {
      return b;
    }
    else {
      next = a + b;
      a = b;
      b = next;
      return next;
    }
  };
}
var fib = fibonaccif(0, 1);

function counter(start) {
  return {
    up: function () {
      return start += 1;
    },
    down: function () {
      return start -= 1;
    }
  };
}

function invocable(binary) {
  return {
    invoke: function (first, second) {
      if (binary !== undefined) {
        return binary(first, second);
      }
    },
    revoke: function () {
      binary = undefined;
    }
  };
}
debugger;
