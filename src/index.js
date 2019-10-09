function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let arrOfExpr = [];
    let arr1 = expr.split(" ");
    let arr2 = expr.split("");


    if (expr[0] == ' ') {
        arrOfExpr = arrOfExpr.concat(arr1);
        arrOfExpr.pop();
        arrOfExpr.shift();
    } else {
        arrOfExpr = arrOfExpr.concat(arr2);
    }


    for (let i = 0; i < arrOfExpr.length; i++) {

        if (arrOfExpr[i] == false) {
            arrOfExpr.splice(i, 1);
        }
    }


    let stack1 = [];
    let countStack1 = 0;

    let stack2 = [];
    let countStack2 = 0;

    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    let brakets = ['(', ')'];

    for (let i = 0; i < arrOfExpr.length; i++) {
        if (isNaN(+arrOfExpr[i])) {

            if (arrOfExpr[i] == brakets[0]) {
                stack2.push(arrOfExpr[i]);
                continue;
            }

            if (arrOfExpr[i] == brakets[1]) {
                let stack2New = stack2.slice(stack2.lastIndexOf(brakets[0]) + 1, stack2.length);
                stack2New = stack2New.reverse();
                stack1 = stack1.concat(stack2New);
                stack2 = stack2.splice(0, stack2.lastIndexOf(brakets[0]));
                stack2 = stack2.reverse();
                continue;
            }

            if (priority[arrOfExpr[i]] < priority[stack2[stack2.length - 1]] || priority[arrOfExpr[i]] == priority[stack2[stack2.length - 1]]) {
                stack1.push(stack2[stack2.length - 1]);
                stack2.pop();
                stack2.push(arrOfExpr[i]);

                if (priority[stack2[stack2.length - 1]] == priority[stack2[stack2.length - 2]] || priority[stack2[stack2.length - 1]] < priority[stack2[stack2.length - 2]]) {
                    stack1.push(stack2[stack2.length - 2]);
                    stack2.splice(stack2.length - 2, 1);
                }

            } else {
                stack2.push(arrOfExpr[i]);
                countStack2++;
            }

        } else {
            stack1.push(+arrOfExpr[i]);
            countStack1++;
        }
    }

    stack2 = stack2.reverse();
    stack1 = stack1.concat(stack2);



    let operators = {
        '+': (x, y) => x + y,
        '-': (x, y) => x - y,
        '*': (x, y) => x * y,
        '/': (x, y) => x / y
    };

    let str = stack1.join(' ');

    let count = (str) => {
        let stack = [];

        str.split(' ').forEach(item => {
            if (item in operators) { 
                let [y, x] = [stack.pop(), stack.pop()] 
                stack.push(operators[item](x, y)); 
            } else {
                stack.push(parseFloat(item)); 
            }
        })

        return stack.pop();
    }
    result = +count(str);


    return result;


}

module.exports = {
    expressionCalculator
}