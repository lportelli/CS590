//RPN
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var presedence = {'(':4,')':4,'POW':3,'*':2,'/':2,'%':2,'+':1,'-':1 };
var operators = ['P','*','/','%','+','-'];
var digits = ['0','1','2','3','4','5','6','7','8','9','.',' '];

var evaluatePostFix = function(postfixQ){
   debug = true;
   var eval = [];
   var t,i;
   var temp1, temp2, answer;
   while (postfixQ.length != 0){
     t = postfixQ.shift();
     if (debug) console.log(t);
     if (!isNaN(t)){
       if (debug) console.log('push to eval stack');
       eval.push(t);
     }else if (operators.indexOf(t)>=0){
       temp1 = ''
       i = ''
       while (i != ' '){
         i = eval.pop()
         temp1 = "".concat(i,temp1);
         console.log(temp1,i)
       }
       temp1 = parseInt(temp1);
       temp2 = ''
       i = ''
       while (i != ' '){
         i = eval.pop()
         temp2 = "".concat(i,temp2);
         console.log(temp2,i)
       }
       temp2 = parseInt(temp2);

       switch(t){
         case 'POW': answer = Math.pow(temp1,temp2); break;
         case '*': answer = temp1*temp2; break;
         case '/': answer = temp1/temp2; break;
         case '%': answer = temp1%temp2; break;
         case '+': answer = temp1+temp2; break;
         case '-': answer = temp1-temp2; break;
       }
       if (debug) console.log(temp1,temp2,answer);
       eval.push(answer);
     }
     if (debug) console.log(eval);
     if (debug) console.log(postfixQ);
   }
   console.log('Answer: ', eval[0]);
   return eval[0];

}


var convertInfix= function(infixQ){
  var debug = false
   var opS =[];
   var postfixQ =[];
   var t;
   while (infixQ.length != 0){
     t = infixQ.shift();
     if (debug) console.log(t)
     if (digits.indexOf(t)>-1){
         if (debug) console.log('push number to post');
         postfixQ.push(t);
     }else if (opS.length === 0 || t=='('){
         if (debug) console.log('push operator to stack');
         opS.push(t);
      }else if (t ==')'){
        while (opS[opS.length-1] != '('){
          if (debug) console.log('push top operator to post');
          postfixQ.push(opS.pop());
        }
        opS.pop()
      }else {
        if (debug) console.log('t presidence',presedence[t]);
        if (debug) console.log('top op presidence',presedence[opS[opS.length-1]]);
        while(opS.length != 0 && opS[opS.length-1] != '(' && presedence[t]<presedence[opS[opS.length-1]]){
          console.log('push top operator to post');
         postfixQ.push(opS.pop());
        }
       if (debug) console.log('push next operator to stack');
       opS.push(t);
      }
     if (debug) console.log('operator stack',opS);
     if (debug) console.log('postfix queue',postfixQ);
   }
   while(opS.length != 0){
     postfixQ.push(opS.pop());
     if (debug) console.log('operator stack',opS);
     if (debug) console.log('postfix queue',postfixQ);
   }
   console.log('Postfix:',postfixQ.join(''));
   return postfixQ;
};

var parseInput = function(rawInfix){
  var infixQ= [];
  for(var i=0;i<rawInfix.length;i++){
    if (rawInfix[i]=='P'){
      infixQ.push(rawInfix.slice(i,i+3))
      i += 2
    }
    else if (isNaN(rawInfix[i]) && operators.indexOf(rawInfix[i])>=0){
      infixQ.push(' ',rawInfix[i]);
    }else if (digits.indexOf(rawInfix[i])>=0 || rawInfix[i]=='(' || rawInfix[i]==')') {
      infixQ.push(rawInfix[i]);
    }else{
      console.log('Unexpected character "',rawInfix[i],'" not added to infix expression');
    }
  }
  console.log('Input: ',infixQ.join(''));
  return infixQ;
};

var main =function(){
  rl.question('Enter an infix expression or "quit" to exit the program:',(rawInfix)=> {
    if (rawInfix == 'q'){
      console.log('exiting');
      rl.close();
      return;
    }else{
      infixQ = parseInput(rawInfix);
      postfixQ = convertInfix(infixQ);
      value = evaluatePostFix(postfixQ);
      main();
    }
  });
}

main();
