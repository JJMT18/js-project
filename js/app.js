function cargarCabecero() {
    // Recuperar elementos por ID
    const presupuestoElement = document.getElementById('presupuesto');
    const ingresosElement = document.getElementById('ingresos');
    const egresosElement = document.getElementById('egresos');
    const porcentajeElement = document.getElementById('porcentaje');

    // Modificar el contenido de los elementos
    presupuestoElement.innerHTML = formatoMoneda(presupuesto);
    ingresosElement.innerHTML = formatoMoneda(totalIngresos());
    egresosElement.innerHTML = formatoMoneda(totalEgresos());
    porcentajeElement.innerHTML = formatoPorcentaje(porcentajeEgreso);
}


// Arreglos para manejar ingresos y egresos
let ingresos = [
    new Ingreso('Salario', 20000),
    new Ingreso('Venta auto', 50000)
  ];
  
  const egresos = [
    new Egreso('Renta', 4000),
    new Egreso('Ropa', 800)
  ];
  
  // Clase totalIngresos y totalEgresos
  class totalIngresos {
    static calcularTotalIngresos() {
      let totalIngresos = 0;
      for (const ingreso of ingresos) {
        totalIngresos += ingreso.valor;
      }
      return totalIngresos;
    }
  }
  
  class totalEgresos {
    static calcularTotalEgresos() {
      let totalEgresos = 0;
      for (const egreso of egresos) {
        totalEgresos += egreso.valor;
      }
      return totalEgresos;
    }
  }
  // Función para cargar los ingresos dinámicamente
const cargarIngresos = () => {
    let ingresosHTML = '';
    
    // Recorrer el arreglo de ingresos y generar HTML dinámico para cada elemento
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    
    // Actualizar el contenido del elemento lista-ingresos
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
};

// Función para crear el HTML de un ingreso
const crearIngresoHTML = (ingreso) => {
    return `
        <div class="elemento clearfix" id="ingreso-${ingreso.id}">
            <div class="elemento-descripcion">${ingreso.descripcion}</div>
            <div class="right clearfix">
                <div class="elemento-valor">${formatoMoneda(ingreso.valor)}</div>
                <div class="elemento-eliminar">
                    <button class="elemento-borrar" onclick="eliminarIngreso(${ingreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
};

// Función para eliminar un ingreso
const eliminarIngreso = (id) => {
};

cargarApp();
// Función para cargar los egresos dinámicamente
const cargarEgresos = () => {
    let egresosHTML = '';
    
    // Recorrer el arreglo de egresos y generar HTML dinámico para cada elemento
    for (const egreso of egresos) {
        egresosHTML += crearEgresoHTML(egreso);
    }
    
    // Actualizar el contenido del elemento lista-egresos
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
};

// Función para crear el HTML de un egreso
const crearEgresoHTML = (egreso) => {
    return `
        <div class="elemento clearfix" id="egreso-${egreso.id}">
            <div class="elemento-descripcion">${egreso.descripcion}</div>
            <div class="right clearfix">
                <div class="elemento-valor">${formatoMoneda(egreso.valor)}</div>
                <div class="elemento-eliminar">
                    <button class="elemento-borrar" onclick="eliminarEgreso(${egreso.id})">
                        <ion-icon name="close-circle-outline"></ion-icon>
                    </button>
                </div>
            </div>
        </div>
    `;
};


// Función para cargar la aplicación
const cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos(); // Llamar a la función para cargar egresos dinámicamente
};

cargarApp();

// Función para eliminar un egreso
const eliminarEgreso = (id) => {
    const indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    if (indiceEliminar !== -1) {
        egresos.splice(indiceEliminar, 1);
        cargarCabecero();
        cargarEgresos();
    }
};

// Función para agregar un dato (ingreso o egreso) desde el formulario
const agregarDato = () => {
    const forma = document.getElementById('forma');
    const tipo = forma.querySelector('#tipo').value;
    const descripcion = forma.querySelector('#descripcion').value;
    const valor = forma.querySelector('#valor').value;

    if (descripcion.trim() !== '' && valor.trim() !== '') {
        if (tipo === 'ingreso') {
            ingresos.push(new Ingreso(descripcion, parseFloat(valor)));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo === 'egreso') {
            egresos.push(new Egreso(descripcion, parseFloat(valor)));
            cargarCabecero();
            cargarEgresos();
        }

        
        forma.reset();
    }
};


