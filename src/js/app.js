//const ser  = document.querySelector('#servi'),
//const barb = document.querySelector('#barbero'),
//const adic = document.querySelector('#adicional');




function Servicios (ser,barb,adic){
     this.ser  = ser;
     this.barb = barb;
     this.adici = adic;

}

Servicios.prototype.cotizarServicio = function(informacion){
     /* 
          corte de pelo = 5000
          barba         = 3000
          promocion     = 7000
     */

     let cantidad;
    

    switch(this.ser){
          case 'corte de pelo':
               cantidad = 5000;
               break;
          case 'barba':
               cantidad = 3000;
               break;
          case 'combo promocion':
               cantidad = 7000;
               break;
    }

    /*
          adiciones
          limpieza                 =    3000
          limpieza y mascarilla    =    5000
    */

    if ( this.adici === 'limpieza'){
         cantidad += 3000; 
    }else{
         cantidad += 5000;
    }

    return cantidad;


}

function InterFaz() {}
InterFaz.prototype.mostrarMensaje = function(mensaje, adic){
     const div =document.createElement('div');
     if( adic === 'error'){
          div.classList.add('mensaje', 'error');
     }else {
          div.classList.add('mensaje', 'correcto');
     }
     div.innerHTML = `${mensaje}`;
     formulario.insertBefore(div, document.querySelector('.form-group'));

     setTimeout(function(){
          document.querySelector('.mensaje').remove();
     },3000);
}

InterFaz.prototype.mostrarResultado = function(servici, total){
     const resultado = document.getElementById('resultado');
     let ser;
     switch(servici.ser){
          case 'corte de pelo':
               ser = 'corte de pelo'
               break;
          case 'barba':
               ser ='barba';
               break;
          case 'combo promocion':
               ser = 'combo promocion'
               break;
     }
     
     const div = document.createElement('div');
     div.innerHTML = `
          <p class='header'>Tu Resumen: </p>
          <p>Servicio: ${servici.ser} </p>
          <p>Barbero: ${servici.barb} </p>
          <p>Adicionales: ${servici.adici} </p>
          <p>Total: $ ${total} </p> 
     `;
     const spinner = document.querySelector('#cargando img');
     spinner.style.display = 'block';
     setTimeout(function(){
          spinner.style.display = 'none';
          resultado.appendChild(div);
     },2000)
     
}

const formulario = document.getElementById('cotizar-servicio');

formulario.addEventListener('submit', function(e){
     e.preventDefault();

     const serv = document.getElementById('servi');
     const servSeleccionada = serv.options[serv.selectedIndex].value;

     const barb = document.getElementById('barbero');
     const barbSeleccionado = barb.options[barb.selectedIndex].value;

     const adici = document.querySelector('input[name="adic"]:checked').value;

     const interFaz = new InterFaz();
     if (servSeleccionada ==='' || barbSeleccionado ==='' || adici === ''){
          interFaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo', 'error');
     }else{
          const resultados= document.querySelector('#resultado div');
          if(resultados != null){
              resultados.remove() 
          }

          const servici = new Servicios(servSeleccionada, barbSeleccionado , adici)

          const cantidad = servici.cotizarServicio(servici);

          interFaz.mostrarResultado(servici, cantidad);
          interFaz.mostrarMensaje('Cotizando....', 'exito');

     }

});