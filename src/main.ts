if (typeof document !== "undefined") {
    import("./style.css");
}

// crear una matriz (sala) de 8x10
function inicializarSala(numfilas: number, numcolumnas: number): number[][] {
    const sala: number[][] =[];
    for (let i=0; i<numfilas; i++){
        const fila: number[] = [];
        for (let j=0; j<numcolumnas; j++){
            fila.push(0);
        }
        sala.push(fila);

    }
    return sala;
}

const sala = inicializarSala(8, 10);
// console.log(sala);
// console.log("Filas:", sala.length);
// console.log("Columnas de la primera fila:", sala[0].length);

// crear una función para mostrar la sala en la consola
// los asientos ocupados deben marcarse con X (1 = X)
// y los asientos libres con L (0 = L)
function mostrarSala(sala: number[][]): void {
    let cabecera = "  ";
    for (let columna = 0; columna < (sala[0]?.length ?? 0); columna++) {
        cabecera += String(columna + 1).padStart(3, " "); // alinea los números de columna con un espacio de 3 caracteres
    }
    console.log(cabecera);

    for (let i = 0; i < sala.length; i++) {
        let textoFila = String.fromCharCode(65 + i) + " "; // convierte cada índice de fila en una letra (A, B, C, ...) 65 es el código ASCII de 'A'    
        for (let j = 0; j < sala[i].length; j++) {
            if (sala[i][j] === 1) {
                textoFila += "X".padStart(3, " "); // marca los asientos ocupados con X
            } else {
                textoFila += "L".padStart(3, " "); // marca los asientos libres con L
            }
        }
        console.log(textoFila);
    }
}
mostrarSala(sala);

function existeAsiento(sala: number[][], fila: number, columna: number): boolean {
    // Un índice debe ser entero y estar dentro de los límites de su array.
    // Primero comprobamos la fila para acceder a ella solo si existe.
    return Number.isInteger(fila) && Number.isInteger(columna)
        && fila >= 0 && fila < sala.length
        && columna >= 0 && columna < sala[fila].length;
}

function estaDisponible(sala: number[][], fila: number, columna: number): boolean {
    // La segunda condición solo se evalúa si la coordenada existe.
    return existeAsiento(sala, fila, columna) && sala[fila][columna] === 0;
}

function reservarAsiento(sala: number[][], fila: number, columna: number): boolean {
    // Los índices empiezan en 0: la primera butaca es [0][0].
    if (!estaDisponible(sala, fila, columna)) {
        return false;
    }

    // Solo se modifica la matriz después de validar la disponibilidad.
    sala[fila][columna] = 1;
    return true;
}

function contarDisponibles(sala: number[][]): number {
    let disponibles = 0;
    for (const fila of sala) {
        for (const asiento of fila) {
            if (asiento === 0) {
                disponibles++;
            }
        }
    }
    return disponibles;
}

function contarOcupados(sala: number[][]): number {
    let ocupados = 0;
    for (const fila of sala) {
        for (const asiento of fila) {
            if (asiento === 1) {
                ocupados++;
            }
        }
    }
    return ocupados;
}

function buscarDosContiguos(sala: number[][]): number[] | null {
    for (let fila = 0; fila < sala.length; fila++) {
        // La última columna no tiene vecino a la derecha.
        for (let columna = 0; columna + 1 < sala[fila].length; columna++) {
            if (estaDisponible(sala, fila, columna) && estaDisponible(sala, fila, columna + 1)) {
                // Devolvemos índices, sin reservar las butacas encontradas.
                return [fila, columna, columna + 1];
            }
        }
    }
    return null;
}

const salaPrueba = inicializarSala(8, 10);
console.log("Sala de prueba antes de reservar:");
mostrarSala(salaPrueba);
console.log("Reserva A1:", reservarAsiento(salaPrueba, 0, 0));
console.log("Reserva H10:", reservarAsiento(salaPrueba, 7, 9));
console.log("Sala de prueba después de reservar:");
mostrarSala(salaPrueba);

console.log("Extremos existentes:", existeAsiento(salaPrueba, 0, 0), existeAsiento(salaPrueba, 7, 9));
console.log("Disponible, ocupado e inexistente:",
    estaDisponible(salaPrueba, 0, 1), estaDisponible(salaPrueba, 0, 0), estaDisponible(salaPrueba, 8, 0));

// Cada pareja contiene índices de fila y columna que deben rechazarse.
const estadoAntesDeInvalidos = JSON.stringify(salaPrueba);
const coordenadasInvalidas = [
    [-1, 0], [8, 0], [0, -1], [0, 10],
    [0.5, 0], [0, 0.5], [NaN, 0], [0, NaN],
    [Infinity, 0], [-Infinity, 0], [0, Infinity], [0, -Infinity],
];
console.log("Coordenadas inválidas rechazadas:", coordenadasInvalidas.every(
    ([fila, columna]) => !existeAsiento(salaPrueba, fila, columna)
        && !reservarAsiento(salaPrueba, fila, columna),
));
console.log("Coordenadas inválidas sin cambios:", estadoAntesDeInvalidos === JSON.stringify(salaPrueba));

console.log("Primera reserva A2:", reservarAsiento(salaPrueba, 0, 1));
const estadoAntesDeRechazos = JSON.stringify(salaPrueba);
console.log("Reserva repetida A2:", reservarAsiento(salaPrueba, 0, 1));
console.log("Reserva inválida:", reservarAsiento(salaPrueba, 8, 0));
console.log("Rechazos sin cambios:", estadoAntesDeRechazos === JSON.stringify(salaPrueba));

// Los contadores se comprueban con una sala independiente y una sola reserva.
const salaContadores = inicializarSala(8, 10);
console.log("Sala vacía, disponibles y ocupados:", contarDisponibles(salaContadores), contarOcupados(salaContadores));
reservarAsiento(salaContadores, 0, 0);
const estadoAntesDeContar = JSON.stringify(salaContadores);
console.log("Tras una reserva, disponibles y ocupados:", contarDisponibles(salaContadores), contarOcupados(salaContadores));
console.log("Recuento repetido:", contarDisponibles(salaContadores), contarOcupados(salaContadores));
console.log("Total de asientos:", contarDisponibles(salaContadores) + contarOcupados(salaContadores));
console.log("Contar no modifica la sala:", estadoAntesDeContar === JSON.stringify(salaContadores));

const salaParejaFinal = [[1, 1, 0, 0]];
const estadoAntesDeBuscar = JSON.stringify(salaParejaFinal);
console.log("Pareja en sala vacía:", buscarDosContiguos(sala));
console.log("Pareja al final de la fila:", buscarDosContiguos(salaParejaFinal));
console.log("Pareja junto al pasillo:", buscarDosContiguos([[1, 1, 1, 1, 0, 0, 1, 1, 1, 1]]));
console.log("Libres en filas distintas:", buscarDosContiguos([[1, 0], [0, 1]]));
console.log("Libres aislados:", buscarDosContiguos([[0, 1, 0]]));
console.log("Buscar no modifica la sala:", estadoAntesDeBuscar === JSON.stringify(salaParejaFinal));

// ---- Fase 7: comprobación de los cuatro escenarios ----
// Cada escenario tiene su propia matriz para no compartir reservas.
const escenarios = [
    inicializarSala(8, 10),
    inicializarSala(8, 10),
    inicializarSala(8, 10),
    inicializarSala(8, 10),
];
const nombresEscenarios = ["Vacía", "Parcialmente ocupada", "Casi llena", "Completamente llena"];

reservarAsiento(escenarios[1], 0, 0);
reservarAsiento(escenarios[1], 0, 1);
reservarAsiento(escenarios[1], 1, 4);

// Preparamos las salas casi llena y llena recorriendo todas sus butacas.
for (let fila = 0; fila < 8; fila++) {
    for (let columna = 0; columna < 10; columna++) {
        if (fila !== 7 || columna !== 9) {
            reservarAsiento(escenarios[2], fila, columna);
        }
        reservarAsiento(escenarios[3], fila, columna);
    }
}

const disponiblesEsperados = [80, 77, 1, 0];
const ocupadosEsperados = [0, 3, 79, 80];
const parejasEsperadas = [[0, 0, 1], [0, 2, 3], null, null];
const coordenadasReserva = [[0, 0], [0, 0], [7, 9], [0, 0]];
const reservasEsperadas = [true, false, true, false];

for (let indice = 0; indice < escenarios.length; indice++) {
    const escenario = escenarios[indice];
    const estadoInicial = JSON.stringify(escenario);
    const disponibles = contarDisponibles(escenario);
    const ocupados = contarOcupados(escenario);
    const pareja = buscarDosContiguos(escenario);

    console.log(`\nEscenario: ${nombresEscenarios[indice]}`);
    mostrarSala(escenario);
    console.log("Disponibles / ocupados:", disponibles, ocupados);
    console.log("Primera pareja:", pareja);
    console.assert(disponibles === disponiblesEsperados[indice] && ocupados === ocupadosEsperados[indice], "Recuento inesperado");
    console.assert(JSON.stringify(pareja) === JSON.stringify(parejasEsperadas[indice]), "Pareja inesperada");
    console.assert(JSON.stringify(escenario) === estadoInicial, "Consultar modificó la sala");

    const [fila, columna] = coordenadasReserva[indice];
    const resultado = reservarAsiento(escenario, fila, columna);
    console.log("Resultado de la reserva:", resultado);
    console.assert(resultado === reservasEsperadas[indice], "Resultado de reserva inesperado");
    console.assert(resultado || JSON.stringify(escenario) === estadoInicial, "La reserva rechazada modificó la sala");
    console.log("Sala después de la reserva:");
    mostrarSala(escenario);
    console.log("Disponibles / ocupados después:", contarDisponibles(escenario), contarOcupados(escenario));
    console.assert(contarDisponibles(escenario) === disponibles - Number(resultado), "Disponibles incorrectos después de reservar");
    console.assert(contarOcupados(escenario) === ocupados + Number(resultado), "Ocupados incorrectos después de reservar");

    // Los intentos repetidos y fuera de rango no deben modificar la matriz.
    const estadoAntesDeRechazosEscenario = JSON.stringify(escenario);
    console.assert(!reservarAsiento(escenario, fila, columna), "La reserva repetida debería fallar");
    console.assert(!reservarAsiento(escenario, -1, 0) && !reservarAsiento(escenario, 8, 10), "La coordenada inválida debería fallar");
    console.assert(JSON.stringify(escenario) === estadoAntesDeRechazosEscenario, "Un rechazo modificó la sala");
    console.log("Rechazos sin cambios:", JSON.stringify(escenario) === estadoAntesDeRechazosEscenario);
}

// Dos variantes de sala casi llena: pareja contigua y libres separados.
const casiLlenaContiguos = escenarios[3].map(fila => [...fila]);
casiLlenaContiguos[7][8] = 0;
casiLlenaContiguos[7][9] = 0;
const casiLlenaSeparados = escenarios[3].map(fila => [...fila]);
casiLlenaSeparados[6][9] = 0;
casiLlenaSeparados[7][9] = 0;
console.log("\nCasi llena con pareja:", buscarDosContiguos(casiLlenaContiguos));
console.log("Casi llena con libres separados:", buscarDosContiguos(casiLlenaSeparados));
console.assert(JSON.stringify(buscarDosContiguos(casiLlenaContiguos)) === JSON.stringify([7, 8, 9]), "Pareja final inesperada");
console.assert(buscarDosContiguos(casiLlenaSeparados) === null, "Los asientos separados no forman pareja");

