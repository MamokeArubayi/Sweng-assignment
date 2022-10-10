import {NextFunction, Request, Response} from 'express';

let utilityFunctions = {
    
    validExpression: (str: string) => {
        try{

        
        // string can contain numbers, operators, and spaces
        // determine if string is a valid expression
        // return true or false

        // split string into array of characters
        let arr = str.split('');
        // check if first character is a number
        if (isNaN(parseInt(arr[0]))) {
            return false;
        }
        // check if last character is a number
        if (isNaN(parseInt(arr[arr.length - 1]))) {
            return false;
        }
        
        for (let i = 0; i < arr.length; i++) {
            // check if string contains any characters other than numbers, operators, and spaces
            if (isNaN(parseInt(arr[i])) && arr[i] !== '+' && arr[i] !== '-' && arr[i] !== '*' && arr[i] !== '/' && arr[i] !== ' ') {
                return false;
            }
            // check if string contains two operators in a row
            if (isNaN(parseInt(arr[i])) && isNaN(parseInt(arr[i + 1]))) {
                return false;
            }
            // check if string contains two numbers in a row
            if (!isNaN(parseInt(arr[i])) && !isNaN(parseInt(arr[i + 1]))) {
                return false;
            }
            if (arr[i] === ' ' && arr[i + 1] === ' ') {
                return false;
            }

        }
        // check if string contains an operator at the beginning or end
        if (arr[0] === '+' || arr[0] === '-' || arr[0] === '*' || arr[0] === '/' || arr[arr.length - 1] === '+' || arr[arr.length - 1] === '-' || arr[arr.length - 1] === '*' || arr[arr.length - 1] === '/') {
            return false;
        }
        // check if string contains a space at the beginning or end
        if (arr[0] === ' ' || arr[arr.length - 1] === ' ') {
            return false;
        }
        // if all checks pass, return true
        return true;
    } catch (err) {
        return false;
    }
    },
    eval: (str: string) => {
        // Assumes that the expression is valid
        // Parses the expression and returns the result
        // return a number

        // split string into array of characters
        let arr = str.split('');
        // create array to hold numbers
        let numbers = [];
        // create array to hold operators
        let operators = [];
        // create variable to hold current number
        let currentNumber = '';
        // loop through array of characters
        for (let i = 0; i < arr.length; i++) {
            // if character is a number, add to current number
            if (!isNaN(parseInt(arr[i]))) {
                currentNumber += arr[i];
            }
            // if character is an operator, add current number to numbers array and add operator to operators array
            if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/') {
                numbers.push(parseInt(currentNumber));
                operators.push(arr[i]);
                currentNumber = '';
            }
        }
        // add last number to numbers array
        numbers.push(parseInt(currentNumber));
        // loop through operators array
        for (let i = 0; i < operators.length; i++) {
            // if operator is multiplication or division, evaluate the expression and replace the two numbers with the result
            if (operators[i] === '*' || operators[i] === '/') {
                let result = 0;
                if (operators[i] === '*') {
                    result = numbers[i] * numbers[i + 1];
                }
                if (operators[i] === '/') {
                    result = numbers[i] / numbers[i + 1];
                }
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
                i--;
            }
        }
        // loop through operators array
        for (let i = 0; i < operators.length; i++) {
            // if operator is addition or subtraction, evaluate the expression and replace the two numbers with the result
            if (operators[i] === '+' || operators[i] === '-') {
                let result = 0;
                if (operators[i] === '+') {
                    result = numbers[i] + numbers[i + 1];
                }
                if (operators[i] === '-') {
                    result = numbers[i] - numbers[i + 1];
                }
                numbers.splice(i, 2, result);
                operators.splice(i, 1);
                i--;
            }
        }
        // return the result
        return numbers[0];
    }

}

export let calculate = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        // get expression from request body
        let expression = req.body.expression;
        // check if expression is valid
        if (utilityFunctions.validExpression(expression)) {
            // if valid, evaluate expression
            let result = eval(expression);
            // return result
            res.status(200).send({ result: result });
        } else {
            // if invalid, return error
            res.status(404).send({ error: 'Invalid expression' });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).send({error: e.message});
    }
};