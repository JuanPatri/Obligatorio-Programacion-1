/* Autores: Theo Brum 315141 y Juan Pablo Patri 266824 */
window.addEventListener("load", inicio);

// Variables globales
var cantTotalReclamos = 0;
var cantTotalEmpresas = 0;
var linkestadisticas, linkhastaagregar, linkagregarempresa, linklogo, idReclamoAqui, idVerReclamos, idTituloGestion, idlinkhastagregar, idNoCoincidencias;
var MiSistema = new Sistema();
let MiEmpresa = new Empresa();
function inicio() {
  secciones();
  document.getElementById("idBotonAg").addEventListener("click", agregarReclamo1);
  document.getElementById("idAgregarReclamo").addEventListener("click", agregarReclamo);
  document.getElementById("idBotonVolver").addEventListener("click", volver);
  document.getElementById("idBotonAgregar").addEventListener("click", agregarEmpresa);
  document.getElementById("idBotonCreciente").addEventListener("click", botonCreciente);
  document.getElementById("idBotonDecreciente").addEventListener("click", botonDecreciente);
  document.getElementById("idBotonLupa").addEventListener("click", botonBusqueda);
};

function agregarEmpresaTabla() {
  let tablaEmpresa = document.getElementById("idTBody");
  let totalEmpresa = MiSistema.listaEmpresa;
  tablaEmpresa.innerHTML = "";

  if (totalEmpresa.length === 0) {
    tablaEmpresa.innerHTML = "No hay empresas";
  } else {
    for (let nuevaEmpresa of totalEmpresa) {
      let fila = tablaEmpresa.insertRow();
      let celda = fila.insertCell();
      let celda1 = fila.insertCell();
      let celda2 = fila.insertCell();
      let celda3 = fila.insertCell();
      celda.innerHTML = nuevaEmpresa.nombreEmpresa;
      celda1.innerHTML = nuevaEmpresa.direccion;
      celda2.innerHTML = nuevaEmpresa.rubro;
      celda3.innerHTML = MiSistema.ReclamosPorEmpresa(nuevaEmpresa);
    }
  }
}

function empresasRegistradas() {
  let pEmpresas = document.getElementById("idTotalEmpresas");
  let cantTotal = MiSistema.cantTotalEmpresas();
  if (cantTotal === 0) {
    pEmpresas.textContent = "Sin datos";
  } else {
    pEmpresas.textContent = "Total de empresas registradas: " + cantTotal;
  }
}

function cambioPromedioReclamos() {
  let pPromedio = document.getElementById("idPromedioReclamos");
  let cantTotalEmpresas = MiSistema.cantTotalEmpresas();
  let promedio = cantTotalReclamos / cantTotalEmpresas;
  if (cantTotalEmpresas === 0) {
    pPromedio.textContent = "Sin datos";
  } else {
    pPromedio.textContent = "El promedio de las cantidades considerando todos los reclamos de todas las empresas es: " + promedio.toFixed(0);
  }
}

function tablaMayorRubro() {
  let lista = document.getElementById("idRubroMaximo");
  lista.innerHTML = "";
  MiSistema.darRubroMaximo();
  let rubroMaximo = MiSistema.rubroMaximo;
  let nombreRubroMaximo = MiSistema.nombreRubroMaximo;
  if (cantTotalReclamos == 0) {
    let nodo = document.createElement("li");
    let nodoT = document.createTextNode("Sin datos");
    nodo.appendChild(nodoT); // appendChild() se utiliza para agregar un nodo como hijo
    lista.appendChild(nodo); // de otro nodo existente en el árbol de elementos HTML.
  } else {
    for (let rubrox of nombreRubroMaximo) {
      let nodo = document.createElement("li");
      let nodoT = document.createTextNode(rubrox + ": cantidad " + rubroMaximo);
      nodo.appendChild(nodoT);
      lista.appendChild(nodo);
    }
  }
}

function botonCreciente() {
  let tablaEmpresa = document.getElementById("idTBody");
  let filas = Array.from(tablaEmpresa.getElementsByTagName("tr")); // Array.from(): Crear un nuevo array a partir de un objeto iterable o de una estructura de datos similar a un array.
  filas.sort((a, b) => {
    let nombreA = a.cells[0].innerHTML.toLowerCase(); // El [0] es para tomar la primer celda nomas
    let nombreB = b.cells[0].innerHTML.toLowerCase(); // a y b refieren a la primer celda de distintas filas del array
    if (nombreA < nombreB) {
      return -1;
    } else if (nombreA > nombreB) {
      return 1;
    }
    return 0;
  });
  tablaEmpresa.innerHTML = "";
  for (let fila of filas) {
    tablaEmpresa.appendChild(fila);
  };
};

function botonDecreciente() {
  let tablaEmpresa = document.getElementById("idTBody");
  let filas = Array.from(tablaEmpresa.getElementsByTagName("tr"));
  filas.sort((a, b) => {
    let nombreA = a.cells[0].innerHTML.toLowerCase();
    let nombreB = b.cells[0].innerHTML.toLowerCase();
    if (nombreA < nombreB) {
      return 1;
    } else if (nombreA > nombreB) {
      return -1;
    }
    return 0;
  });
  tablaEmpresa.innerHTML = "";
  for (let fila of filas) {
    tablaEmpresa.appendChild(fila);
  };
};
/*
sort(): Compara contenidos celdas td de la primera columna (a.cells[0].innerHTML y b.cells[0].innerHTML)
La función devuelve negativo si "a" debe colocarse antes que b, positivo en el caso contrario, o cero si son =
En botonCreciente(), si nombreA es menor que nombreB, se devuelve -1, lo que indica que a debe ser colocado antes que b en el ordenamiento. Si nombreA es mayor que nombreB, se devuelve 1, indicando que b debe ser colocado antes que a. Si nombreA y nombreB son iguales, se devuelve 0.
En botonDecreciente(), el comportamiento es invertido. Si nombreA es menor que nombreB, se devuelve 1, indicando que b debe ser colocado antes que a. Si nombreA es mayor que nombreB, se devuelve -1, indicando que a debe ser colocado antes que b. Si nombreA y nombreB son iguales, se devuelve 0.
*/

function tablaEmpresasSinReclamo() {
  let lista = document.getElementById("idEmpresasSinReclamo");
  let p = document.getElementById("idEmpRec");
  lista.innerHTML = "";
  let empresasSinReclamos = MiSistema.darEmpresaSinReclamos();
  if (empresasSinReclamos.length === 0) {
    lista.innerHTML = "Sin datos";
  } else {
    for (let empresa of empresasSinReclamos) {
      let nodo = document.createElement("li");
      let nodoT = document.createTextNode(empresa)
      nodo.appendChild(nodoT);
      lista.appendChild(nodo);
    }
  }
}

// Funcion para los links del encabezado, de forma que los lleves y te muestra la seccion indicada
function secciones() {
  // Con esto se agarran los links del encabezado
  var idLinkEstadisticas = document.getElementById("idLinkEstadisticas");
  var idLinkVerReclamos = document.getElementById("idLinkVerReclamos");
  var idLinkAgregarEmpresa = document.getElementById("idLinkAgregarEmpresa");
  var idLinkPrincipal = document.getElementById("idLinkPrincipal");

  // Aqui se agarran los divs en los que esta cada seccion que se va a mostrar u ocultar
  linkestadisticas = document.getElementById("linkestadisticas");
  linkhastaagregar = document.getElementById("linkhastaagregar");
  linkagregarempresa = document.getElementById("linkagregarempresa");
  linklogo = document.getElementById("linklogo");
  idReclamoAqui = document.getElementById("idReclamoAqui");
  idVerReclamos = document.getElementById("idVerReclamos");
  idTituloGestion = document.getElementById("idTituloGestion");
  idlinkhastagregar = document.getElementById("idlinkhastaagregar");
  idNoCoincidencias = document.getElementById("idNoCoincidencias");

  idLinkEstadisticas.addEventListener("click", function (e) {
    e.preventDefault();
    linkestadisticas.style.display = "block";
    linkhastaagregar.style.display = "none";
    linkagregarempresa.style.display = "none";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "none";
    idVerReclamos.style.display = "none";
    idNoCoincidencias.style.display = "none";
    agregarEmpresaTabla();
    tablaMayorRubro();
    tablaEmpresasSinReclamo();
    cambioPromedioReclamos();
  });

  idLinkVerReclamos.addEventListener("click", function (e) {
    if (MiSistema.listaReclamos.length === 0) {
      e.preventDefault();
      alert("No hay reclamos existentes");
      linkestadisticas.style.display = "none";
      linkhastaagregar.style.display = "none";
      idVerReclamos.style.display = "none";
      linkagregarempresa.style.display = "none";
      linklogo.style.display = "block";
      idReclamoAqui.style.display = "block";
      idNoCoincidencias.style.display = "none";
    } else {
      linkestadisticas.style.display = "none";
      linkhastaagregar.style.display = "none";
      idVerReclamos.style.display = "block";
      linkagregarempresa.style.display = "none";
      linklogo.style.display = "block";
      idReclamoAqui.style.display = "none";
      idNoCoincidencias.style.display = "none";
    }
  });

  idLinkAgregarEmpresa.addEventListener("click", function (e) {
    e.preventDefault();
    linkestadisticas.style.display = "none";
    linkhastaagregar.style.display = "none";
    idVerReclamos.style.display = "none";
    linkagregarempresa.style.display = "block";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "none";
    idNoCoincidencias.style.display = "none";
  });

  idLinkPrincipal.addEventListener("click", function (e) {
    e.preventDefault();
    linkestadisticas.style.display = "none";
    linkhastaagregar.style.display = "none";
    idVerReclamos.style.display = "none";
    linkagregarempresa.style.display = "none";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "block";
    idTituloGestion.style.display = "block";
    idNoCoincidencias.style.display = "none";
  });
};

// Funcion que muestra la seccion para agregar un reclamo luego de clickear el boton grande,
// si no existen empresas no es posible ver la seccion y/o agregar un reclamo
function agregarReclamo() {
  if (MiSistema.listaEmpresa.length === 0) {
    alert("Debe ingresar empresas primero");
    linkestadisticas.style.display = "none";
    linkhastaagregar.style.display = "none";
    idVerReclamos.style.display = "none";
    linkagregarempresa.style.display = "none";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "block";
    idNoCoincidencias.style.display = "none";
  } else {
    linkestadisticas.style.display = "none";
    idVerReclamos.style.display = "none";
    linkagregarempresa.style.display = "none";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "block";
    idTituloGestion.style.display = "none";
    linkhastaagregar.style.display = "block";
    idNoCoincidencias.style.display = "none";
  };
};

// Funcion para volver a la seccion principal luego de agregar un reclamo
function volver() {
  linkestadisticas.style.display = "none";
  linkhastaagregar.style.display = "none";
  idVerReclamos.style.display = "none";
  linkagregarempresa.style.display = "none";
  linklogo.style.display = "block";
  idReclamoAqui.style.display = "block";
  idTituloGestion.style.display = "block";
  idNoCoincidencias.style.display = "none";
};

// Funcion para guardar un reclamo en listaReclamos, tambien inicia la funcion cargarReclamo, ademas
// suma 1 al XContadorReclamo por cada reclamo creado y define la variable de contador1 = 1
function agregarReclamo1() {
  MiSistema.XContadorReclamo++;
  let formulario = document.getElementById("idFormReclamo");
  if (formulario.reportValidity()) {
    let nombrePersona = document.getElementById("idNombre").value;
    let empresa = document.getElementById("idEmpresa").value;
    let tituloReclamo = document.getElementById("idCajaReclamo").value;
    let reclamo = document.getElementById("idCajaExtensa").value;
    let contador1 = 1;
    let nuevoReclamo = new Reclamo(nombrePersona, empresa, tituloReclamo, reclamo, contador1);
    MiSistema.guardarReclamo(nuevoReclamo);
    cantTotalReclamos = cantTotalReclamos + 1;
    formulario.reset();
    cargarReclamo();
  };
};

// Funcion para guardar empresas creadas en listaEmpresa, tambien compara que no hayan empresas con el mismo nombre
function agregarEmpresa() {
  let formularioEmpresa = document.getElementById("formEmpresa");
  if (formularioEmpresa.reportValidity()) {
    let nombreEmpresaFormulario = document.getElementById("idCajaNombre").value;
    let direccionEmpresa = document.getElementById("idCajaDireccion").value;
    let rubroEmpresa = document.getElementById("idCajaRubro").value;
    let compararNombre = MiSistema.buscarEmpresaRepetida(nombreEmpresaFormulario);
    if (compararNombre) {
      alert("Ya existe una empresa con ese nombre");
      formularioEmpresa.reset();
    } else {
      let nombreEmpresaFormulario = document.getElementById("idCajaNombre").value;
      let nuevaEmpresa = new Empresa(nombreEmpresaFormulario, direccionEmpresa, rubroEmpresa);
      MiSistema.guardarEmpresa(nuevaEmpresa);
      let selectEmpresas = document.getElementById("idEmpresa");
      let option = document.createElement("option");
      option.textContent = nombreEmpresaFormulario;
      option.value = nombreEmpresaFormulario;
      selectEmpresas.appendChild(option);
      cantTotalEmpresas = cantTotalEmpresas + 1;
      formularioEmpresa.reset();
    }
  }
  empresasRegistradas();
  GenBotEstadisticas();
}

function GenBotEstadisticas() {
  const idBotonesEstadisticas = document.getElementById("idBotonesEstadisticas");
  idBotonesEstadisticas.classList.add("botonesAT");
  let letrasUsadas = [];
  idBotonesEstadisticas.innerHTML = "";

  const formBotGen = document.createElement("form");
  formBotGen.classList.add("botonesAT");

  let botonSeleccionado = null; // Variable para almacenar el botón seleccionado

  for (let i = 0; i < MiSistema.listaEmpresa.length; i++) {
    let letraActual = MiSistema.listaEmpresa[i].nombreEmpresa.charAt(0);
    if (!letrasUsadas.includes(letraActual)) {
      const BotGenEst = document.createElement("button");
      BotGenEst.textContent = (MiSistema.listaEmpresa[i].nombreEmpresa.charAt(0)).toUpperCase();
      const idBotGenEst = "idBotGenEst-" + i;
      BotGenEst.setAttribute("id", idBotGenEst);
      formBotGen.appendChild(BotGenEst);
      idBotonesEstadisticas.appendChild(formBotGen);

      // Agregar evento clic a cada botón
      BotGenEst.addEventListener("click", function (event) {
        event.preventDefault();

        let tituloTabla = document.getElementById("idCaption");
        tituloTabla.textContent = "Empresas que empiezan con " + BotGenEst.textContent;

        // Restablecer estilo del botón previamente seleccionado
        if (botonSeleccionado) {
          botonSeleccionado.classList.remove("botonSeleccionado");
        }

        // Establecer estilo del botón actualmente seleccionado
        BotGenEst.classList.add("botonSeleccionado");
        botonSeleccionado = BotGenEst;

        // document.querySelectorAll(): Selecciona las filas de la tabla con el ID idTablaReclamos
        // La consulta se realiza utilizando el selector CSS "#idTablaReclamos tr"
        // El resultado de la consulta se almacena en la variable filas, que es una lista de nodos de elementos HTML.
        // Ademas restablece el estilo de las filas y las muestra
        let filas = document.querySelectorAll("#idTablaReclamos tr");
        for (let j = 0; j < filas.length; j++) {
          filas[j].style.display = "table-row";
        }

        // Filtrar filas de acuerdo a la letra seleccionada
        let letraActual = MiSistema.listaEmpresa[i].nombreEmpresa.charAt(0);
        for (let j = 0; j < filas.length; j++) {
          let celda = filas[j].getElementsByTagName("td");
          if (celda.length > 0) {
            let celdaContenido = filas[j].getElementsByTagName("td")[0].textContent; // Agarra el contenido de la primera celda de la fila
            let primeraLetra = celdaContenido.charAt(0); // Agarra la primer letra de la primer celda de la fila
            if (primeraLetra.toUpperCase() !== letraActual.toUpperCase()) {
              filas[j].style.display = "none";
            }
          }
        }
      });

      letrasUsadas.push(letraActual);
    }
  }

  const BotAsterisco = document.createElement("button");
  BotAsterisco.textContent = "*";
  const idBotAsterisco = "idBotAsterisco";
  BotAsterisco.setAttribute("id", idBotAsterisco);
  formBotGen.appendChild(BotAsterisco);

  // Agregar evento clic al botón Asterisco
  BotAsterisco.addEventListener("click", function (event) {
    event.preventDefault();
    let tituloTabla = document.getElementById("idCaption");
    tituloTabla.textContent = "Empresas: todas"
    // Restablecer estilo del botón previamente seleccionado
    if (botonSeleccionado) {
      botonSeleccionado.classList.remove("botonSeleccionado");
    }

    // Establecer estilo del botón Asterisco seleccionado
    BotAsterisco.classList.add("botonSeleccionado");
    botonSeleccionado = BotAsterisco;

    // Restablecer estilo de todas las filas de la tabla
    let filas = document.querySelectorAll("#idTablaReclamos tr");
    for (let i = 0; i < filas.length; i++) {
      filas[i].style.display = "table-row";
    }
  });
}

// Funcion para mostrar los reclamos en la seccion de ver reclamos
function cargarReclamo() {
  const idGeneradorReclamos = document.getElementById("idGeneradorReclamos");
  idGeneradorReclamos.classList.add("contador1");

  // Para generar ids unicos para los botones generados y los spans del contador que cambian generados
  var idBotGenerados = Math.random();
  var idPGenerado = Math.random();
  var XcontadorR = MiSistema.XContadorReclamo;

  // Este div es para guardar el reclamo generado y el heading que lo numera de tal forma que se vuelvan uno pero conserven sus respectivos css
  // y luego gracias a esto al final lo agrego al div idGeneradorReclamos y puedo agregarlos en orden de ultimo a primero
  const contenedor = document.createElement("div");
  contenedor.classList.add("contador1");

  const reclamogenerado = document.createElement("div"); // Crea un div para los reclamos generados
  reclamogenerado.classList.add("reclamo2"); // Aplica el CSS de los reclamos

  // Crea el h3 que numera los reclamos y lo agrega al reclamo generado
  const XNumeradorreclamos = document.createElement("h3");
  XNumeradorreclamos.textContent = "Reclamo No. " + XcontadorR;
  XNumeradorreclamos.classList.add("contador1");
  contenedor.appendChild(XNumeradorreclamos);

  // Crea el parrafo para el nombre del que creo el reclamo y lo agrega al reclamo generado
  const XReclamador = document.createElement("p");
  XReclamador.innerHTML = MiSistema.listaReclamos[XcontadorR - 1].nombrePersona + ': <span class="subrayarS">' + MiSistema.listaReclamos[XcontadorR - 1].tituloReclamo + '</span>';
  reclamogenerado.appendChild(XReclamador);

  // Crea el parrafo para el nombre de la empresa sobre la cual se reclama y lo agrega al reclamo generado
  const XEmpresa = document.createElement("p");
  XEmpresa.innerHTML = 'Empresa: <span class="subrayarV">' + MiSistema.listaReclamos[XcontadorR - 1].empresa + '</span>';
  reclamogenerado.appendChild(XEmpresa);

  // Crea el parrafo para la descripcion del reclamo y lo agrega al reclamo generado
  const XDescReclamo = document.createElement("p");
  XDescReclamo.textContent = MiSistema.listaReclamos[XcontadorR - 1].reclamo;
  reclamogenerado.appendChild(XDescReclamo);

  // Crea el boton de a mi tambien me paso y lo agrega al reclamo generado
  const XBoton = document.createElement("button");
  XBoton.textContent = "¡A mí también me pasó!";
  XBoton.setAttribute("id", idBotGenerados);
  reclamogenerado.appendChild(XBoton);

  // Crea el p de contador
  const XContador = document.createElement("span");
  XContador.classList.add("margencontador");
  XContador.setAttribute("id", idPGenerado);
  XContador.textContent = "Contador: " + MiSistema.listaReclamos[XcontadorR - 1].contador1;
  reclamogenerado.appendChild(XContador);

  // Agregar el reclamo generado al div
  contenedor.appendChild(reclamogenerado);
  idGeneradorReclamos.insertAdjacentElement("afterbegin", contenedor);

  // Funcion contador
  document.getElementById(`${idBotGenerados}`).addEventListener("click", function () {
    let Xnumero = document.getElementById(`${idPGenerado}`);
    MiSistema.listaReclamos[XcontadorR - 1].contador1++;
    Xnumero.textContent = MiSistema.listaReclamos[XcontadorR - 1].contador1;
    XContador.textContent = "Contador: " + MiSistema.listaReclamos[XcontadorR - 1].contador1;
    cantTotalReclamos = cantTotalReclamos + 1;
  });
}

function botonBusqueda() {
  const BusquedaLupa = idTextoLupa.value.toLowerCase().trim();
  const Coincidencias = MiSistema.listaReclamos.filter(function (reclamos) {
    const autor = reclamos.nombrePersona.toLowerCase();
    const titulo = reclamos.tituloReclamo.toLowerCase();
    const descripcion = reclamos.reclamo.toLowerCase();
    const nomEmpresa = reclamos.empresa.toLowerCase();
    return autor.includes(BusquedaLupa) || titulo.includes(BusquedaLupa) || descripcion.includes(BusquedaLupa) || nomEmpresa.includes(BusquedaLupa);
  });
  mostrarCoincidencias(Coincidencias, BusquedaLupa);
};

function mostrarCoincidencias(Coincidencias, BusquedaLupa) {
  if (Coincidencias.length == 0) {
    linkestadisticas.style.display = "none";
    linkhastaagregar.style.display = "none";
    idVerReclamos.style.display = "none";
    linkagregarempresa.style.display = "none";
    linklogo.style.display = "block";
    idReclamoAqui.style.display = "none";
    idNoCoincidencias.style.display = "block";
  } else {
    const elementoscoincidencia = document.getElementsByClassName("reclamo2");
    for (let i = 0; i < elementoscoincidencia.length; i++) {
      let xcoincidencia = elementoscoincidencia[i];
      let textocoincidencia = xcoincidencia.innerText.toLowerCase();
      let xheading = xcoincidencia.previousElementSibling; // Agarra el elemento anterior en el DOM a xcoincidencia, que vendria a ser el reclamo numerado, porque los cree por separado

      if (textocoincidencia.includes(BusquedaLupa)) {
        xcoincidencia.style.display = "block";
        xheading.style.display = "block";
      } else {
        xcoincidencia.style.display = "none";
        xheading.style.display = "none";
      };
    };
  };
};