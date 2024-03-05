//Estimate Time Taken: 20mins~

//Method 1: Using a for loop, this method simply iterates from 1 to n and stores in variable sum that will be returned.
//Advantages: easy to read and understand
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
      sum += i;
    }
    return sum;
};

//Method 2: Using a Recursion. First the method will check if n=1, and returns if it is. Otherwise, it will return the sum of all numbers.
//Advantages: Looks elegant, may perform better for larger methods
var sum_to_n_b = function(n) {
    if (n === 1) return 1;
    return n + sum_to_n_b(n - 1);
};

//Method 3: Utilizing a mathematical formula (n * (n+1)) / 2.
//Advantages: Supposedly the most efficient
var sum_to_n_c = function(n) {
    return (n * (n + 1)) / 2;
};

//Testing and returning the values from each functions.
console.log("Function a: " + sum_to_n_a(5));
console.log("Function b: " + sum_to_n_b(5));
console.log("Function c: " + sum_to_n_c(5));