x = 1000021;
var isPalindrome = function (x) {
    let y = x.toString().split("").reverse()
    x = x.toString().split("")
    let r = true

    for (let i = 0; i < y.length; i++) {
        if (x[i] != y[i]) return false

    }
    return r
};
console.log(isPalindrome(x))