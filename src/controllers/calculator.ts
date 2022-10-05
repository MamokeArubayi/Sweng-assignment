import {NextFunction, Request, Response} from 'express';

let utilityFunctions = {
    validExpression: (str: string) => {
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
    },
    eval: (str: string) => {
        let index = 0;
        let sumStack = [0];
        let stackIndex = 0;
        let operatorStack = ['+']
        let validNums = ['0','1','2','3','4','5','6','7','8','9'];

        while (index < str.length) {
            let char = str.charAt(index);
            if (char ==='+'){
                operatorStack.push('+');
                index++;
            }
            else if (char ==='-'){
                operatorStack.push('-');
                index++;
            }
            else if (char ==='*'){
                operatorStack.push('*');
                index++;
            }
            else if (char ==='/'){
                operatorStack.push('/');
                index++;
            }
            else if (char ===' '){
                index++;
            }
            else if (validNums.includes(char)){
                let numVals = [];
                while (validNums.includes(char)){
                    numVals.push(char);
                    index++;
                    char = str.charAt(index);
                }
                let num = parseInt(numVals.join(''), 10);

                if (operatorStack[stackIndex] === '+'){
                    sumStack[stackIndex] += num;
                }
                else if (operatorStack[stackIndex] === '-'){
                    sumStack[stackIndex] -= num;
                }
                else if (operatorStack[stackIndex] === '*'){
                    sumStack[stackIndex] *= num;
                }
                else if (operatorStack[stackIndex] === '/'){
                    sumStack[stackIndex] /= num;
                }
                else {
                    sumStack[stackIndex] = num;
                } 
            }
            else if (char === '('){
                stackIndex++;
                sumStack[stackIndex] = 0;
                operatorStack[stackIndex] = '+';
                index++;
            }
            else if (char === ')'){
                let returnNum = sumStack[stackIndex];
                sumStack[stackIndex] = undefined;
                operatorStack[stackIndex] = undefined;
                stackIndex--;
                if (operatorStack[stackIndex] === '-'){
                    sumStack[stackIndex] -= returnNum;
                }
                else if (operatorStack[stackIndex] === '+'){
                    sumStack[stackIndex] += returnNum;
                }
                else if (operatorStack[stackIndex] === '*'){
                    sumStack[stackIndex] *= returnNum;
                }
                else if (operatorStack[stackIndex] === '/'){
                    sumStack[stackIndex] /= returnNum;
                }
                else {
                    sumStack[stackIndex] = sumStack[stackIndex] + returnNum;
                }
                index++;
            }
            else {
                index++;
            }
        }    
        return sumStack[0];   
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
            res.status(400).send({ error: 'Invalid expression' });
        }
    }
    catch (e) {
        return res.status(500).send({error: e.message});
    }
};