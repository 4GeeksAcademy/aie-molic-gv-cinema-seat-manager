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

const salaPrueba = inicializarSala(8, 10);
salaPrueba[0][0] = 1;
salaPrueba[7][9] = 1;
mostrarSala(salaPrueba);