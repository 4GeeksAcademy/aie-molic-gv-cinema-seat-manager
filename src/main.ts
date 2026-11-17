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

// ---- Fase 8: integración con la interfaz ----
if (typeof document !== "undefined") {
    const mapa = document.querySelector<HTMLElement>("#seat-map");
    const total = document.querySelector<HTMLElement>("#total-seats");
    const disponibles = document.querySelector<HTMLElement>("#available-seats");
    const ocupados = document.querySelector<HTMLElement>("#occupied-seats");
    const barraDisponibilidad = document.querySelector<HTMLElement>("#availability-bar");
    const asientoSeleccionado = document.querySelector<HTMLElement>("#selected-seat");
    const confirmar = document.querySelector<HTMLButtonElement>("#confirm-reservation");
    const buscar = document.querySelector<HTMLButtonElement>("#find-adjacent-seats");
    const mensaje = document.querySelector<HTMLElement>("#reservation-message");

    // La selección es temporal; solo la matriz sala guarda las reservas.
    let seleccion: number[][] = [];

    function nombreAsiento(fila: number, columna: number): string {
        return `${String.fromCharCode(65 + fila)}${columna + 1}`;
    }

    function actualizarMapa(): void {
        mapa?.querySelectorAll<HTMLButtonElement>("button.seat").forEach((boton) => {
            const fila = Number(boton.dataset.row);
            const columna = Number(boton.dataset.column);
            const existe = boton.dataset.row !== undefined && boton.dataset.column !== undefined
                && existeAsiento(sala, fila, columna);
            const libre = existe && estaDisponible(sala, fila, columna);
            const seleccionado = libre && seleccion.some(([filaSeleccionada, columnaSeleccionada]) =>
                filaSeleccionada === fila && columnaSeleccionada === columna);

            boton.classList.toggle("seat-occupied", existe && !libre);
            boton.classList.toggle("seat-selected", seleccionado);
            boton.disabled = !libre;
            boton.setAttribute("aria-pressed", String(seleccionado));
            if (existe) {
                const estado = seleccionado ? "seleccionada" : libre ? "disponible" : "ocupada";
                boton.setAttribute("aria-label", `Fila ${String.fromCharCode(65 + fila)}, butaca ${columna + 1}, ${estado}`);
                boton.textContent = libre ? String(columna + 1) : "×";
            }
        });
    }

    function actualizarEstadisticas(): void {
        const cantidadDisponibles = contarDisponibles(sala);
        const cantidadOcupados = contarOcupados(sala);
        const cantidadTotal = cantidadDisponibles + cantidadOcupados;
        if (total) total.textContent = String(cantidadTotal);
        if (disponibles) disponibles.textContent = String(cantidadDisponibles);
        if (ocupados) ocupados.textContent = String(cantidadOcupados);
        if (barraDisponibilidad) {
            barraDisponibilidad.style.width = `${cantidadTotal === 0 ? 0 : cantidadDisponibles / cantidadTotal * 100}%`;
        }
    }

    function actualizarSeleccion(): void {
        const seleccionValida = seleccion.length > 0 && seleccion.every(([fila, columna]) =>
            estaDisponible(sala, fila, columna));
        if (asientoSeleccionado) {
            asientoSeleccionado.textContent = seleccionValida
                ? seleccion.map(([fila, columna]) => nombreAsiento(fila, columna)).join(", ")
                : "Sin selección";
        }
        if (confirmar) confirmar.disabled = !seleccionValida;
    }

    function mostrarMensaje(texto: string, esError: boolean): void {
        if (!mensaje) return;
        mensaje.textContent = texto ? `${esError ? "Error: " : ""}${texto}` : "";
        mensaje.classList.toggle("text-red-300", esError);
        mensaje.classList.toggle("text-slate-400", !esError);
    }

    function actualizarInterfaz(): void {
        actualizarMapa();
        actualizarEstadisticas();
        actualizarSeleccion();
    }

    mapa?.addEventListener("click", (evento) => {
        const objetivo = evento.target;
        if (!(objetivo instanceof Element)) return;
        const boton = objetivo.closest<HTMLButtonElement>("button.seat");
        if (!boton || !mapa.contains(boton) || boton.dataset.row === undefined || boton.dataset.column === undefined) return;
        const fila = Number(boton.dataset.row);
        const columna = Number(boton.dataset.column);
        if (!estaDisponible(sala, fila, columna)) {
            mostrarMensaje("La butaca no está disponible.", true);
            return;
        }
        const yaSeleccionado = seleccion.length === 1 && seleccion[0][0] === fila && seleccion[0][1] === columna;
        seleccion = yaSeleccionado ? [] : [[fila, columna]];
        mostrarMensaje("", false);
        actualizarInterfaz();
    });

    buscar?.addEventListener("click", () => {
        const pareja = buscarDosContiguos(sala);
        if (!pareja) {
            seleccion = [];
            mostrarMensaje("No hay dos asientos contiguos disponibles.", true);
        } else {
            const [fila, primeraColumna, segundaColumna] = pareja;
            seleccion = [[fila, primeraColumna], [fila, segundaColumna]];
            mostrarMensaje(`Asientos encontrados: ${nombreAsiento(fila, primeraColumna)} y ${nombreAsiento(fila, segundaColumna)}.`, false);
        }
        actualizarInterfaz();
    });

    confirmar?.addEventListener("click", () => {
        // Comprobamos la selección completa antes de reservar para evitar cambios parciales.
        const coordenadasUnicas = new Set(seleccion.map(([fila, columna]) => `${fila},${columna}`));
        if (seleccion.length === 0 || coordenadasUnicas.size !== seleccion.length
            || !seleccion.every(([fila, columna]) => estaDisponible(sala, fila, columna))) {
            seleccion = [];
            mostrarMensaje("La selección ya no está disponible.", true);
            actualizarInterfaz();
            return;
        }
        const nombres = seleccion.map(([fila, columna]) => nombreAsiento(fila, columna)).join(", ");
        seleccion.forEach(([fila, columna]) => reservarAsiento(sala, fila, columna));
        seleccion = [];
        mostrarMensaje(`Reserva confirmada: ${nombres}.`, false);
        actualizarInterfaz();
        mostrarSala(sala);
        buscar?.focus();
    });

    actualizarInterfaz();
}

