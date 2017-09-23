//RPN
var readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var presedence = {'(':4,')':4,'POW':3,'*':2,'/':2,'%':2,'+':1,'-':1 };
var operators = ['P','O','W','*','/','%','+','-'];
var digits = ['0','1','2','3','4','5','6','7','8','9','.',' '];

var convertInfix= function(infixQ){
  //PEMDAS
   var opS =[];
   var postfixQ =[];
   var t;
   while (infixQ.length != 0){
     t = infixQ.shift();
     console.log(t)
     if (digits.indexOf(t)>-1){
         console.log('push number to post');
         postfixQ.push(t);
     }else if (opS.length === 0 || t=='('){
         console.log('push operator to stack');
         opS.push(t);
      }else if (t ==')'){
        while (opS[opS.length-1] != '('){
          console.log('push top operator to post');
          postfixQ.push(opS.pop());
        }
        opS.pop()
      }else {
        console.log('t presidence',presedence[t]);
        console.log('top op presidence',presedence[opS[opS.length-1]]);
        while(opS.length != 0 && opS[opS.length-1] != '(' && presedence[t]<presedence[opS[opS.length-1]]){
          console.log('push top operator to post');
         postfixQ.push(opS.pop());
        }
       console.log('push next operator to stack');
       opS.push(t);
      }
     console.log('operator stack',opS);
     console.log('postfix queue',postfixQ);
   }
   while(opS.length != 0){
     postfixQ.push(opS.pop());
     console.log('operator stack',opS);
     console.log('postfix queue',postfixQ);
   }
   console.log('final postfix expression',postfixQ.join(''));

};

var main =function(){
  rl.question('Enter an infix expression or "q" to exit the program:',(rawInfix)=> {
    if (rawInfix == 'q'){
      console.log('Exiting');
      rl.close();
      return;
    }else{
      var infixQ= [];
      for(var i=0;i<rawInfix.length;i++){
        if (isNaN(rawInfix[i]) && operators.indexOf(rawInfix[i])>=0){
          infixQ.push(' ',rawInfix[i]);
        }else if (digits.indexOf(rawInfix[i])>=0 || rawInfix[i]=='(' || rawInfix[i]==')') {
          infixQ.push(rawInfix[i]);
        }else{
          console.log('Unexpected character "',rawInfix[i],'" not added to infix expression')
        }
      }

      postfixQ = convertInfix(infixQ);
      main();
    }
      // evaluatePostFix(postfixQ)
  });
}
main();
// rl.close();

//
//
// var evaluatePostFixEx(){
//     Stack<int> eval;
//     Queue<char> postQ;
//     char t;
//     int topNum, nextNum, answer;
//
//     while(postQ is not empty){
//         t = postQ.Front();
//         postQ.DeQueue();
//         if (t is a number token)
//             eval.Push(t)
//         else{
//             topNum = eval.Top();
//             eval.Pop();
//             nextNum = eval.Top();
//             eval.Pop
//         }
//         switch(t) {
//             case '+': answer = nextNum + topNum; break;
//             case '-': answer = nextNum-topNum; break;
//             case '*': answer = nextNum * topNum; break;
//             case '/': answer = nextNum/topNum; break;
//
//         }
//
//         eval.Push(answer)
//     }
//
//     return eval.Top()
// }
