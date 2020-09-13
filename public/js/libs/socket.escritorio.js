//Comando para establecer la conexion

var socket = io();

var serchParams = new URLSearchParams(window.location.search);

if(!serchParams.has('escritorio')){
    window.location='index.html';
    throw new Error ('El escritorio es necesario');

}
var escritorio= serchParams.get('escritorio');
var label =$('small');
console.log(escritorio);

$('h1').text('Escritorio '+ escritorio);

$('button').on('click',function(){
socket.emit('atenderTicket',{escritorio:escritorio}, function(resp){

    if(resp === 'No hay tickets'){
        label.text(resp);
        alert(resp);
        return;

    }
    label.text('Ticket ' + resp.numero);
});

});



socket.on('connect',function(){

    console.log('Conectado al servidor');

});

// Escuchar sucesos 
socket.on('disconnect',function(){

    console.log('perdimos connexion con el servidor');

});
