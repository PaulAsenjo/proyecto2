// Clase Pregunta
class Pregunta {
    constructor(textoPregunta, opciones,) {
      this.textoPregunta = textoPregunta;
      this.opciones = opciones;
      this.resultados = {}; 
    }
  
// Método para agregar un voto
agregarVoto(opcionSeleccionada) {
    let opcionValida = false;
       
    while (!opcionValida) {
      const opcionNormalizada = normalizarCadena(opcionSeleccionada);
      const opcionesNormalizadas = this.opciones.map(opcion => normalizarCadena(opcion));
       
      const indice = opcionesNormalizadas.indexOf(opcionNormalizada);
        if (indice !== -1) {
          const opcionOriginal = this.opciones[indice];
          this.resultados[opcionOriginal] = (this.resultados[opcionOriginal] || 0) + 1;
          opcionValida = true;
          } else {
            console.log("La opción seleccionada no es válida.");
            opcionSeleccionada = prompt("Por favor, selecciona una opción válida: " + this.opciones.join(", "));
          }
        }
      }
  
// Método para mostrar los resultados
  mostrarResultados() {
    console.log(`Resultados para la pregunta: "${this.textoPregunta}":`);
      this.opciones.forEach((opcion) => {
      console.log(`Opción "${opcion}": ${this.resultados[opcion] || 0} votos`);
      });
    }
  }
  
// Método para normalizar una cadena
  function normalizarCadena(cadena) {
    return cadena
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }
  
// Clase Encuesta
  class Encuesta {
    constructor(preguntas) {
    this.preguntas = preguntas;
    }
  
// Método para ejecutar la encuesta
  ejecutar() {
    let seguirVotando = true;
      while (seguirVotando) {
        this.preguntas.forEach((pregunta) => this.votar(pregunta));
        seguirVotando = confirm("¿Desea seguir votando?");
      }
    }
  
// Método para manejar la votación de una pregunta
  votar(pregunta) {
    const opcionSeleccionada = prompt(`Pregunta: ${pregunta.textoPregunta}\nSeleccione una opción (${pregunta.opciones.join(", ")}):`);
      if (opcionSeleccionada !== null && opcionSeleccionada.trim() !== "") {
        pregunta.agregarVoto(opcionSeleccionada);
        pregunta.mostrarResultados();
      } else {
        console.log("Votación cancelada.");
      }
    }
  
// Método para mostrar los resultados finales
  mostrarResultadosFinales() {
    console.log("Resultados finales de la encuesta:");
    this.preguntas.forEach((pregunta) => pregunta.mostrarResultados());
    }
  }
  
// Preguntas predeterminadas
  const textoPregunta = [
    new Pregunta("¿Qué le dejaría Batman a Robin en su testamento?", ["Batimóvil", "Traje", "La capa"]),
    new Pregunta("¿Cuál es el apellido más común en Chile?", ["Muñoz", "Pérez", "Soto"]),
    new Pregunta("A parte de Chile ¿En qué otro país se comen empanadas?", ["Argentina", "Colombia", "España"]),
    new Pregunta("¿Qué se puede comer con las manos y no es mal visto?", ["Completo", "Pizza", "Papas Fritas"]),
    new Pregunta("¿Cuántos fantasmas persiguen a Pac-Man al principio de cada partida?", ["Cuatro", "Diez", "Veinte"]),
    new Pregunta("¿Qué personaje es más flojo?", ["Garfield", "Joaquín Lavín Jr", "Parived"]),
    new Pregunta("¿Qué superpoder te gustaría tener?", ["Volar", "Invisibilidad", "Telepatía"]),
    new Pregunta("Si pudieras encerrar a alguien de por vida, ¿A quién sería?", ["Hermosilla", "Barriga", "Monsalve"]),
];
  
// Inicializar y ejecutar la encuesta
const encuesta = new Encuesta(textoPregunta);
encuesta.ejecutar();