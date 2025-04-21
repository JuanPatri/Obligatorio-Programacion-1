/* Autores: Theo Brum 315141 y Juan Pablo Patri 266824 */

class Sistema {
    constructor() {
      this.listaEmpresa = [];
      this.listaReclamos = [];
      this.XContadorReclamo = 0;
      this.rubroMaximo = 0;
      this.nombreRubroMaximo = "";
    }
    guardarEmpresa(unaEmpresa) {
      this.listaEmpresa.push(unaEmpresa);
    }
    guardarReclamo(unReclamo) {
      this.listaReclamos.push(unReclamo);
    }
    darEmpresas() {
      return this.listaEmpresa;
    }
    buscarEmpresaRepetida(nombre) {
      return this.listaEmpresa.find(Empresa => Empresa.nombreEmpresa == nombre);
    }
  
    promedioReclamos() {
      let totalEmpresa = this.listaEmpresa.length;
      let totalReclamos = this.listaReclamos.length;
      let promedio = 0;
      promedio = totalReclamos / totalEmpresa;
      return promedio;
    }
  
    darEmpresaSinReclamos() {
      let empresasSinReclamo = [];
      for (let i = 0; i < this.listaEmpresa.length; i++) {
        let sinReclamos = true;
        for (let j = 0; j < this.listaReclamos.length; j++) {
          if (this.listaEmpresa[i].nombreEmpresa === this.listaReclamos[j].empresa) {
            sinReclamos = false;
          }
        }
        if (sinReclamos) {
          empresasSinReclamo.push(this.listaEmpresa[i].nombreEmpresa + " (" + (this.listaEmpresa[i].direccion) + ") " + "Rubro: " + (this.listaEmpresa[i].rubro));
        }
      }
      return empresasSinReclamo;
    }
  
    cantTotalEmpresas() {
      let totalEmpresas = this.listaEmpresa.length;
      return totalEmpresas;
    }
  
    promedioReclamos() {
      let totalEmpresa = this.listaEmpresa.length;
      let totalReclamos = this.listaReclamos.length;
      let promedio = 0;
      promedio = totalReclamos / totalEmpresa;
      return promedio;
    }
  
    ReclamosPorEmpresa(unaEmpresa) {
      let reclamosPorEmpresa = 0;
  
      for (let unReclamo of this.listaReclamos) {
        let xnombreEmpresa = unReclamo.empresa;
  
        if (xnombreEmpresa === unaEmpresa.nombreEmpresa) {
          reclamosPorEmpresa += unReclamo.contador1;
        }
      }
      return reclamosPorEmpresa;
    }
  
    darRubroMaximo() {
      let maxViajes = 0;
      let maxBanco = 0;
      let maxMueble = 0;
      let maxAuto = 0;
      let maxRest = 0;
      let maxServ = 0;
      let maxGen = 0;
      for (let i = 0; i < this.listaEmpresa.length; i++) {
        let rubro = this.listaEmpresa[i].rubro; // Agarro el rubro de cada empresa recorriendo la listaEmpresa
        let nomEmpresa = this.listaEmpresa[i].nombreEmpresa; // Agarro el nombre de cada empresa recorriendo la listaEmpresa
        for (let unReclamo of this.listaReclamos) {
          let xnombreEmpresa = unReclamo.empresa; // Agarro el nombre de la empresa del reclamo de la listarReclamos
          if (xnombreEmpresa === nomEmpresa) { // Si el nombre de la empresa de la listaEmpresa es igual al nombre de la empresa del reclamo, significa que se creo un reclamo para esa empresa
            if (rubro === "Viajes") {
              maxViajes += unReclamo.contador1;
            } else if (rubro === "Bancos") {
              maxBanco += unReclamo.contador1;
            } else if (rubro === "Muebles") {
              maxMueble += unReclamo.contador1;
            } else if (rubro === "Autos") {
              maxAuto += unReclamo.contador1;
            } else if (rubro === "Restaurantes") {
              maxRest += unReclamo.contador1;
            } else if (rubro === "Servicios") {
              maxServ += unReclamo.contador1;
            } else if (rubro === "General") {
              maxGen += unReclamo.contador1;
            }
          }
        }
      }
      this.rubroMaximo = Math.max(maxViajes, maxBanco, maxMueble, maxAuto, maxRest, maxServ, maxGen); // Revisa cual o cuales son los valores mas grandes de las variables ingresadas y devuelve la mayor
      let nombreRubroMaximo = [];
  
      if (maxViajes === this.rubroMaximo) {
        nombreRubroMaximo.push("Viajes");
      }
      if (maxBanco === this.rubroMaximo) {
        nombreRubroMaximo.push("Bancos");
      }
      if (maxMueble === this.rubroMaximo) {
        nombreRubroMaximo.push("Muebles");
      }
      if (maxAuto === this.rubroMaximo) {
        nombreRubroMaximo.push("Autos");
      }
      if (maxRest === this.rubroMaximo) {
        nombreRubroMaximo.push("Restaurantes");
      }
      if (maxServ === this.rubroMaximo) {
        nombreRubroMaximo.push("Servicio");
      }
      if (maxGen === this.rubroMaximo) {
        nombreRubroMaximo.push("General");
      }
      this.nombreRubroMaximo = nombreRubroMaximo;
    }
  }
  
  class Empresa {
    constructor(nombreEmpresa, direccion, rubro) {
      this.nombreEmpresa = nombreEmpresa;
      this.direccion = direccion;
      this.rubro = rubro;
    }
  }
  
  class Reclamo {
    constructor(nombrePersona, empresa, tituloReclamo, reclamo, contador1) {
      this.nombrePersona = nombrePersona;
      this.empresa = empresa;
      this.tituloReclamo = tituloReclamo;
      this.reclamo = reclamo;
      this.contador1 = contador1;
    }
  }  