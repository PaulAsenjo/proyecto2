// Constante con lista de preguntas predeterminadas
const preguntasEncuesta = [
{
textoPregunta: "¿Qué le dejaría Batman a Robin en su testamento?",
opciones: ["Batimóvil", "Traje", "La capa"],
},
{
textoPregunta: "¿Cuál es el apellido más común en Chile?",
opciones: ["Muñoz", "Pérez", "Soto"],
},
{
textoPregunta: "A parte de Chile ¿En qué otro país se comen empanadas?",
opciones: ["Argentina", "Colombia", "España"],
},
{
textoPregunta: "¿Qué se puede comer con las manos y no es mal visto?",
opciones: ["Completo", "Pizza", "Papas Fritas"],
},
{
textoPregunta: "¿Cuántos fantasmas persiguen a Pac-Man al principio de cada partida?",
opciones: ["Cuatro", "Diez", "Veinte"],
},
{
textoPregunta: "¿Qué personaje es más flojo?",
opciones: ["Garfield", "Joaquín Lavín Jr", "Parived"],
},
{
textoPregunta: "¿Qué superpoder te gustaría tener?",
opciones: ["Volar", "Invisibilidad", "Telepatía"],
},
{
textoPregunta: "Si pudieras encerrar a alguien de por vida, ¿a quién sería?",
opciones: ["Hermosilla", "Barriga", "Monsalve"],
},
];

// Función flecha para crear una pregunta.
const crearPregunta = (textoPregunta, opciones) => {
return {
textoPregunta: textoPregunta,
opciones: opciones,
resultados: {},
 };
};

// Función flecha para contener todas las preguntas de la encuesta.
const crearEncuesta = (preguntas) => {
return {
preguntas: preguntas,
 };
};

// Método para normalizar una cadena
function normalizarCadena(cadena) {
  return cadena
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

// Función para agregar un voto
const agregarVoto = (pregunta, opcionSeleccionada) => {
  const opcionNormalizada = normalizarCadena(opcionSeleccionada);
  const opcionesNormalizadas = pregunta.opciones.map(normalizarCadena);

  const indice = opcionesNormalizadas.indexOf(opcionNormalizada);
  if (indice !== -1) {
    const opcionOriginal = pregunta.opciones[indice];
    pregunta.resultados[opcionOriginal] = (pregunta.resultados[opcionOriginal] || 0) + 1;
  } else {
    console.log("La opción seleccionada no es válida.");
    const nuevaOpcion = prompt("Por favor, selecciona una opción válida: " + pregunta.opciones.join(", "));
    agregarVoto(pregunta, nuevaOpcion);
  }
};

// Función para mostrar los resultados de una pregunta
function mostrarResultados(pregunta) {
console.log(`Resultados para la pregunta: "${pregunta.textoPregunta}":`);
for (let opcion of pregunta.opciones) {
console.log(`Opción "${opcion}": ${pregunta.resultados[opcion] || 0} votos`);
}
}

// Función para votar en una pregunta
function votar(pregunta) {
const opcionSeleccionada = prompt(`Pregunta: ${pregunta.textoPregunta}\nSeleccione una opción (${pregunta.opciones.join(", ")}):`);
if (opcionSeleccionada !== null) {
agregarVoto(pregunta, opcionSeleccionada.trim());
} else {
console.log("Votación cancelada.");
}
}

// Función para poder ejecutar la encuesta
function ejecutarPrograma() {
const preguntas = preguntasEncuesta.map((pregunta) =>
crearPregunta(pregunta.textoPregunta, pregunta.opciones)
);

const encuesta = crearEncuesta(preguntas);

let seguirVotando = true;
while (seguirVotando) {
for (let i = 0; i < preguntas.length; i++) {
votar(encuesta.preguntas[i]);
}
seguirVotando = confirm("¿Desea seguir votando?");
}

// Mostrar los resultados finales
console.log("Resultados finales de la encuesta:");
encuesta.preguntas.forEach(mostrarResultados);
}

// Llamar a la función ejecutarPrograma
ejecutarPrograma();