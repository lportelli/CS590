//RPN
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var presedence = {'(':4,')':4,'POW':3,'*':2,'/':2,'%':2,'+':1,'-':1 };
var operators = ['POW','*','/','%','+','-'];
var digits = ['0','1','2','3','4','5','6','7','8','9','.',' '];
var evaluatePostFix = function(postfixQ){
   var eval = [];
   var t,i;
   var temp1, temp2, answer;
   while (postfixQ.length != 0){
     t = postfixQ.shift();
     if (!isNaN(t)){
       eval.push(t);
     }else if (operators.indexOf(t)>=0){
       temp2 = eval.pop()
       temp1 = eval.pop()
       switch(t){
         case 'POW': answer = Math.pow(temp1,temp2); break;
         case '*': answer = temp1*temp2; break;
         case '/': answer = temp1/temp2; break;
         case '%': answer = temp1%temp2; break;
         case '+': answer = temp1+temp2; break;
         case '-': answer = temp1-temp2; break;
       }
       eval.push(answer);
     }
   }
   console.log('Answer: ', eval[0]);
   return eval[0];
}


var convertInfix= function(infixQ){
   var opS =[];
   var postfixQ =[];
   var t;
   while (infixQ.length != 0){
     t = infixQ.shift();
     if (!isNaN(t)){
         postfixQ.push(t);
     }else if (opS.length == 0 || t=='('){
         opS.push(t);
      }else if (t ==')'){
        while (opS[opS.length-1] != '('){
          postfixQ.push(opS.pop());
        }
        opS.pop()
      }else {
        while(opS.length != 0 && opS[opS.length-1] != '(' && presedence[t]<=presedence[opS[opS.length-1]]){
         postfixQ.push(opS.pop());
        }
       opS.push(t);
      }
   }
   while(opS.length != 0){
     postfixQ.push(opS.pop());
   }
   console.log('Postfix:',postfixQ.join(' '));
   return postfixQ;
};

var parseInput = function(rawInfix){
  var infixQ= [];
  var num;
  for(var i=0;i<rawInfix.length;i++){
    if (rawInfix.slice(i,i+3)=='POW'){
      infixQ.push(rawInfix.slice(i,i+3));
      i += 2;
    }
    else if (operators.indexOf(rawInfix[i])>=0|| rawInfix[i]=='(' || rawInfix[i]==')'){
      infixQ.push(rawInfix[i]);
    }else if (!isNaN(rawInfix[i])&&rawInfix!=' '){
      num = rawInfix[i];
      for (var j=i+1;j<rawInfix.length;j++){
        if (!isNaN(rawInfix[j]) || rawInfix[j] =='.'){
          num="".concat(num,rawInfix[j]);
        }else{
          break;
        }
        i=j;
      }
      infixQ.push(Number(num));
    }else{
      console.log('Unexpected character "',rawInfix[i],'" not added to infix expression');
    }
  }
  console.log('Input: ',infixQ.join(''));
  return infixQ;
};

var main =function(){
  rl.question('Enter an infix expression or "quit" to exit the program:',(rawInfix)=> {
    if (rawInfix == 'quit'){
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
