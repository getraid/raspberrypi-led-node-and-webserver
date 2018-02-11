 var ws = new WebSocket("ws://192.168.178.42:3000");
// var ws = new WebSocket("ws://localhost:3000");
 var val = [0,0,0];
 
  ws.onopen= function(){
	 setTitle("Connection est.");

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
	// ws.send(input.value);
	 ws.send(JSON.stringify(obj));
	 }
 }
 
 
 document.forms[0].onsubmit=function(){

	 var input1 = document.getElementById('message1');
	 var input2 = document.getElementById('message2');
	 var input3 = document.getElementById('message3');
	
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
	// ws.send(input.value);
	 ws.send(JSON.stringify(obj));
	 }
 };
 
 function setTitle(title){
	var notify = document.getElementById('conninf');
	notify.innerHTML = title;
	// document.querySelector('h1').innerHTML = title; 
 }
 
 function printMessage(message){
	 var p = document.createElement('p');
	 p.innerText = message;
	 document.querySelector('div.messages').appendChild(p);
	 
 }
 
 function notInt()
 {
	 alert("");
	 
 }
 
 //connection close fix
 window.onbeforeunload = function() {
    ws.onclose = function () {}; // disable onclose handler first
    ws.close()
};
 
