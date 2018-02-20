var ip = location.host;
var ws = new WebSocket("ws://"+ip+":3000");

 var val = [0,0,0];
 
  ws.onopen= function(){
	 setTitle("Connected to Server");
 };
 
  ws.onclose = function(){
	 setTitle("Connection closed, trying to reconnect...");
	 window.setTimeout(function(){location.reload()},3000);
 };
 ws.onmessage = function(payload) {
	printMessage(payload.data);
 };
  
 
 function pSend(r,g,b){
	 
	 var input1 = r
	 var input2 = g
	 var input3 = b
	
	val[0] = parseInt(input1.value);
	val[1] = parseInt(input2.value);
	val[2] = parseInt(input3.value);
	
	if(val[0].isNaN ||val[1].isNaN ||val[2].isNaN )
	{
	  notInt();
	}
	else
	{
	 var obj = {"r":val[0],"g":val[1],"b":val[2]};

	 //client-side send
	 ws.send(JSON.stringify(obj));
	 }
 }
 

 
 document.forms[0].onsubmit=function(){

	 var input1 = document.getElementById('message1');
	 var input2 = document.getElementById('message2');
	 var input3 = document.getElementById('message3');
	
pSend(input1,input2 ,input3 );

 };
 
 function setTitle(title){
	var notify = document.getElementById('conninf');
	notify.innerHTML = title;
 }
 
//not necessary;create div in html with class messages to display
 function printMessage(message){
	 var p = document.createElement('p');
	 p.innerText = message;
	 document.querySelector('div.messages').appendChild(p);
	 
 }
 
 
 //connection close fix;necessary to prevent errors - still works without
 window.onbeforeunload = function() {
    ws.onclose = function () {}; // disable onclose handler first
    ws.close()
};
 
 //shortcuts
  function sendBlack()
 {
	 var obj = {"r":0,"g":0,"b":0}; 
	 ws.send(JSON.stringify(obj));
 }
  function sendRed()
 {
	 var obj = {"r":255,"g":0,"b":0}; 
	 ws.send(JSON.stringify(obj));
 }
  function sendGreen()
 {
	 var obj = {"r":0,"g":255,"b":0}; 
	 ws.send(JSON.stringify(obj));
 }
  function sendBlue()
 {
	 var obj = {"r":0,"g":0,"b":255}; 
	 ws.send(JSON.stringify(obj));
 }
   function sendWhite()
 {
	 var obj = {"r":255,"g":255,"b":255}; 
	 ws.send(JSON.stringify(obj));
 }  
 function sendYellow()
 {
	 var obj = {"r":255,"g":255,"b":0}; 
	 ws.send(JSON.stringify(obj));
 }
    function sendBBlue()
 {
	 var obj = {"r":0,"g":255,"b":255}; 
	 ws.send(JSON.stringify(obj));
 }  
   function sendPurple()
 {
	 var obj = {"r":255,"g":0,"b":255}; 
	 ws.send(JSON.stringify(obj));
 }  