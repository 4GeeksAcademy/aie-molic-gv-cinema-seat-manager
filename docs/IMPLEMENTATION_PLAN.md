# Cinema Seat Manager: plan de implementación

Hoja de ruta académica para implementar personalmente la lógica TypeScript con Copilot como tutor. Este documento no contiene implementaciones ni pseudocódigo completo.

## 1. Objetivo y alcance

Gestionar una sala de 8 filas y 10 butacas por fila: 80 asientos en total.

- Representar las reservas exclusivamente mediante una matriz `number[][]`: `0` significa disponible y `1` significa ocupado.
- Inicializar la sala, mostrarla en consola, reservar con validaciones, contar estados y buscar dos asientos libres contiguos en una misma fila.
- Mantener la salida por consola con `L` para libre, `X` para ocupado y numeración de filas y columnas.
- Comprobar cuatro escenarios: sala vacía, parcialmente ocupada, casi llena y completamente llena.
- Integrar posteriormente la lógica con la interfaz HTML/Tailwind existente, sin sustituir el ejercicio de consola.
- Practicar funciones, tipos, arrays, matrices, condicionales y bucles. No representar asientos mediante objetos o clases ni añadir frameworks o dependencias.

Los README existentes describen la plantilla de TypeScript, no el enunciado específico de Cinema Seat Manager. Los nombres y contratos de este plan son propuestas basadas en los requisitos indicados por el estudiante; si el enunciado original exige otros formatos, habrá que ajustarlos antes de la fase correspondiente.

## 2. Organización de archivos comprobada

| Archivo existente | Responsabilidad actual y uso previsto |
| --- | --- |
| [src/main.ts](../src/main.ts) | Entrada TypeScript. Actualmente solo importa el CSS. Implementar aquí las funciones del ejercicio, seguidas por las comprobaciones de consola y, al final, la conexión con el DOM. |
| [index.html](../index.html) | Interfaz estática con 80 botones de butaca, leyenda, estadísticas y panel de reserva. Ya carga la entrada TypeScript como módulo. |
| [src/style.css](../src/style.css) | Importa Tailwind CSS y define la pantalla, butacas y estilos responsive. Mantener el diseño. |
| [src/vite-env.d.ts](../src/vite-env.d.ts) | Archivo de tipos del entorno Vite; no es el lugar para las funciones del ejercicio. |
| [package.json](../package.json) | Comandos y dependencias existentes; no requiere nuevas dependencias para este plan. |
| [vite.config.ts](../vite.config.ts) | Configuración existente de Vite y su integración con Tailwind. |
| [tsconfig.json](../tsconfig.json) | Configuración de TypeScript existente. |
| [README.es.md](../README.es.md) y [README.md](../README.md) | Documentación de la plantilla. |

Se crea únicamente este documento dentro de la nueva carpeta `docs`. No se propone crear archivos TypeScript adicionales por ahora. Mantener separadas conceptualmente las funciones de la sala, las comprobaciones de consola y la integración web, aunque compartan la misma entrada.

### Comandos existentes

- `npm run typecheck`: comprobar tipos sin arrancar Vite.
- `npm run console`: ejecutar la entrada con `tsx` en la terminal.
- `npm run dev` o `npm run start`: abrir la aplicación con Vite; puerto configurado 5173. En Codespaces, abrirlo desde la pestaña Puertos.
- `npm run build`: comprobar la compilación antes de cerrar una fase cuando resulte necesario.

**Punto previo a resolver al comenzar la fase 1:** la entrada importa CSS directamente. Vite procesa esa importación, pero el ejecutor de consola puede rechazarla. Comprobar `npm run console` y acordar una carga de estilos exclusiva del navegador, conservando la entrada y ambos modos de ejecución. No se modifica ahora ningún archivo para resolverlo. Las futuras operaciones DOM también deberán limitarse al navegador.

### Convenciones propuestas

- Las funciones reciben índices numéricos desde cero: filas `0–7` y columnas `0–9`.
- En consola se presentan filas `A–H` y columnas `1–10`; estas etiquetas visibles no cambian los índices internos.
- La interfaz usa filas `A–H` y columnas `1–10`. Sus atributos `data-row` y `data-column` ya contienen índices desde cero.
- La matriz es la única fuente de verdad de las reservas. La selección visual será temporal y no añadirá otro valor a la matriz.
- Mostrar, contar y buscar no modifican la matriz; reservar sí puede modificarla.
- Las funciones del dominio no deben depender de botones, textos HTML ni del DOM.

## 3. Plan por fases y funciones

Cada checklist empieza pendiente. Completar únicamente la fase solicitada, revisar sus criterios y esperar autorización antes de avanzar.

### Fase 1. Inicializar la matriz

**Nombre sugerido:** `inicializarSala`.

- **Objetivo:** crear una sala nueva de 8 por 10, inicialmente libre.
- **Parámetros:** `filas: number`, `columnas: number`; en el ejercicio se usarán 8 y 10.
- **Retorno:** `number[][]`.
- **Conceptos:** anotaciones de tipos, arrays anidados, bucles, variables y retorno de funciones.
- **Pistas:** ¿qué diferencia hay entre crear filas independientes y reutilizar el mismo array? ¿Qué valor representa una butaca libre?
- **Aceptación:** ocho filas de diez valores; todos son cero; modificar una fila no altera las demás; dos llamadas producen salas independientes. En esta fase basta con las dimensiones válidas del ejercicio.

- [x] Resolver y comprobar la ejecución de consola sin perder los estilos del navegador.
- [x] Escribir personalmente la función y tipar parámetros y retorno.
- [x] Crear la sala de 8 por 10.
- [x] Comprobar dimensiones, valores iniciales e independencia de las filas.
- [x] Ejecutar la comprobación de tipos.

### Fase 2. Mostrar la sala en consola

**Nombre sugerido:** `mostrarSala`.

- **Objetivo:** imprimir el estado de la sala de forma legible, con numeración y símbolos `L` y `X`.
- **Parámetros:** `sala: number[][]`.
- **Retorno:** `void`; su resultado observable es la salida de consola.
- **Conceptos:** bucles anidados, condicionales, strings, conversión de valores y diferencia entre imprimir y devolver.
- **Pistas:** ¿cómo separar la cabecera de columnas de cada fila? ¿Por qué la columna 10 necesita atención al alinear el texto? ¿Qué diferencia hay entre índice y número mostrado?
- **Aceptación:** cabecera con columnas 1–10, ocho filas etiquetadas A–H y diez símbolos por fila; el cero aparece como `L` y el uno como `X`; la matriz no cambia.

- [x] Escribir la función sin depender del DOM.
- [x] Añadir etiquetas de filas y numeración de columnas.
- [x] Comprobar la sala vacía: 80 símbolos `L`.
- [x] Preparar una matriz de ejemplo con algún valor 1 y comprobar su símbolo `X`.
- [x] Revisar legibilidad, especialmente la columna 10, y ausencia de modificaciones en la matriz.

### Fase 3. Reservar por fila y columna

**Nombre sugerido:** `reservarAsiento`.

- **Objetivo:** pasar una butaca libre a ocupada y comunicar si se realizó la reserva.
- **Parámetros:** `sala: number[][]`, `fila: number`, `columna: number`.
- **Retorno:** `boolean`: `true` para reserva realizada y `false` para reserva rechazada.
- **Conceptos:** acceso bidimensional, asignación, parámetros, mutación y retornos booleanos.
- **Pistas:** ¿cuál es el único elemento que debe cambiar? ¿Cómo puede quien llama a la función conocer el resultado sin depender de un mensaje impreso?
- **Aceptación provisional:** con una coordenada existente y libre, devuelve `true`, cambia solo ese cero a uno y la consola muestra una nueva `X`.

En esta fase trabajar únicamente con entradas válidas y libres. La función no se considera terminada ni lista para la interfaz hasta completar las validaciones de la fase 4.

- [ ] Escribir la operación básica con entradas válidas.
- [ ] Comprobar una reserva en la primera y en la última butaca.
- [ ] Verificar que ninguna otra posición cambia.
- [ ] Mostrar la sala antes y después usando `mostrarSala`.
- [ ] Dejar pendiente la robustez frente a entradas inválidas y reservas repetidas.

### Fase 4. Validar existencia y disponibilidad

**Nombre sugerido:** `existeAsiento`.

- **Objetivo:** decidir si una coordenada identifica una butaca real antes de acceder a ella.
- **Parámetros:** `sala: number[][]`, `fila: number`, `columna: number`.
- **Retorno:** `boolean`.
- **Conceptos:** límites de arrays, operadores lógicos, condicionales y validación de números enteros.
- **Pistas:** ¿basta con que un parámetro tenga tipo `number` para que sea un índice válido? ¿Qué debes comprobar antes de consultar una fila?
- **Aceptación:** acepta los extremos válidos y rechaza índices negativos, fuera de rango, fraccionarios, `NaN` e infinitos, sin errores de acceso ni cambios en la sala.

- [ ] Escribir la validación de coordenadas enteras y límites.
- [ ] Comprobar extremos válidos y todos los casos inválidos mencionados.

**Nombre sugerido:** `estaDisponible`.

- **Objetivo:** determinar si la butaca existe y está libre.
- **Parámetros:** `sala: number[][]`, `fila: number`, `columna: number`.
- **Retorno:** `boolean`; una coordenada inválida también devuelve `false`.
- **Conceptos:** composición de funciones, booleanos y acceso seguro a una matriz.
- **Pistas:** ¿qué validación debe ocurrir antes de consultar el estado? ¿Cómo reutilizar la comprobación anterior?
- **Aceptación:** devuelve `true` para un cero válido y `false` para un uno o una coordenada inexistente; nunca modifica la sala.

- [ ] Escribir la función reutilizando la comprobación de existencia.
- [ ] Probar una posición libre, una ocupada y una inexistente.

**Completar `reservarAsiento`:** conservar sus parámetros y retorno de la fase 3; añadir composición de validaciones y rechazo sin mutación.

- [ ] Integrar las comprobaciones antes de modificar la matriz.
- [ ] Reservar dos veces la misma butaca: primera llamada `true`, segunda `false`.
- [ ] Comprobar que una coordenada inválida devuelve `false` sin lanzar errores.
- [ ] Verificar que todos los rechazos dejan la matriz intacta.

### Fase 5. Contar disponibles y ocupados

| Función sugerida | Objetivo | Parámetros | Retorno |
| --- | --- | --- | --- |
| `contarDisponibles` | Contar valores 0. | `sala: number[][]` | `number` |
| `contarOcupados` | Contar valores 1. | `sala: number[][]` | `number` |

Para cada función:

- **Conceptos:** recorrer matrices, acumuladores numéricos, condicionales y retorno de resultados.
- **Pistas:** ¿dónde debe empezar el contador? ¿Qué condición distingue el estado que estás contando? ¿Qué ocurriría si conservaras un contador de una llamada anterior?
- **Aceptación:** resultado entero entre 0 y 80, correcto para el estado contado; llamadas repetidas dan el mismo resultado si no cambia la sala; no modifica la matriz. Los dos resultados suman 80.

- [ ] Escribir y comprobar `contarDisponibles`: 80 en sala vacía y 79 tras una reserva.
- [ ] Escribir y comprobar `contarOcupados`: 0 en sala vacía y 1 tras una reserva.
- [ ] Mostrar ambos resultados en consola.
- [ ] Comprobar que la suma es 80 y que los contadores no acumulan entre llamadas.

### Fase 6. Buscar dos asientos libres contiguos

**Nombre sugerido:** `buscarDosContiguos`.

- **Objetivo:** encontrar una pareja libre dentro de la misma fila, sin reservarla.
- **Parámetros:** `sala: number[][]`.
- **Retorno:** `number[] | null`. Si hay pareja, el array contiene exactamente tres números en el orden: índice de fila, índice de primera columna, índice de segunda columna. Si no hay, devuelve `null`.
- **Conceptos:** bucles anidados, comparación de posiciones vecinas, límites, retorno temprano y unión de tipos con `null`.
- **Pistas:** ¿en qué columna deja de existir un vecino a la derecha? ¿Pueden la última butaca de una fila y la primera de otra formar pareja? ¿Qué sucede si la pareja queda a ambos lados del pasillo visual?
- **Aceptación:** devuelve la primera pareja en orden de filas y columnas ascendente; ambas posiciones contienen cero, pertenecen a la misma fila y sus columnas son consecutivas. Devuelve `null` si no existe pareja; no modifica la sala.

El requisito académico define contigüidad por columnas consecutivas en la misma fila. Por tanto, las columnas visibles 5 y 6 cuentan como contiguas aunque el diseño muestre un pasillo entre ellas. Excluirlas sería un cambio de requisito que debe acordarse expresamente.

- [ ] Acordar y respetar el formato de retorno, sin objetos de asiento.
- [ ] Comprobar la primera pareja de una sala vacía.
- [ ] Comprobar una pareja situada al final de una fila.
- [ ] Rechazar parejas entre filas o con una butaca ocupada.
- [ ] Comprobar una sala con libres aislados, pero sin parejas.
- [ ] Mostrar el resultado o la ausencia de pareja en consola.

### Fase 7. Probar los cuatro escenarios

No hace falta crear otra función: realizar comprobaciones manuales con las anteriores y registrar los resultados. Utilizar una sala independiente para cada escenario, evitando arrastrar reservas entre ellos.

Los estados concretos de esta tabla son propuestas reproducibles, no ejemplos recuperados de un enunciado que no está en el repositorio.

| Escenario | Preparación propuesta | Disponibles / ocupados | Comprobaciones esperadas |
| --- | --- | --- | --- |
| Vacía | Todos los valores son 0. | 80 / 0 | 80 `L`; primera pareja en fila interna 0, columnas 0 y 1; una reserva libre funciona. |
| Parcialmente ocupada | Reservar A1, A2 y B5 en una sala nueva. | 77 / 3 | Tres `X`; reservar A1 de nuevo falla; primera pareja en fila interna 0, columnas 2 y 3. |
| Casi llena | Dejar únicamente H10 libre. | 1 / 79 | Una `L`; no hay pareja; reservar H10 funciona y la sala queda llena. |
| Completamente llena | Todos los valores son 1. | 0 / 80 | 80 `X`; no hay pareja; cualquier reserva existente se rechaza. |

Los recuentos y búsquedas indicados corresponden al estado inicial de cada escenario, antes de su reserva de comprobación.

**Conceptos:** preparación de datos, llamadas a funciones, comparación de resultados esperados, bucles y análisis de casos límite.

**Pistas:** ¿qué evidencia de consola demuestra cada condición? ¿Qué comprobaciones debes repetir después de intentar una reserva? ¿Por qué conviene restablecer la sala entre escenarios?

- [ ] Preparar cada escenario usando matrices y las funciones propias, sin objetos ni clases de asiento.
- [ ] Imprimir sala, recuentos, búsqueda y resultado de reserva para cada caso.
- [ ] Comparar la salida con la tabla y comprobar los cambios posteriores.
- [ ] Añadir una variante casi llena con dos libres contiguos y otra con dos libres separados.
- [ ] Repetir casos de límites y reservas rechazadas, verificando ausencia de mutación.
- [ ] Conservar una forma reproducible de ejecutar las comprobaciones de consola.

### Fase 8. Integrar con HTML/Tailwind

Solo empezar cuando las funciones del dominio y los escenarios de consola estén comprobados. Mantener los 80 botones y el diseño existente; conectar la lógica, no reescribir la interfaz.

#### Puntos de conexión verificados

| Elemento existente | Uso posterior |
| --- | --- |
| `#seat-map` y botones `.seat` | Leer fila y columna mediante `data-row` y `data-column`. IDs como `seat-A-1` identifican cada butaca. |
| `.seat-occupied`, `.seat-selected` | Representar ocupación y selección con las clases CSS existentes. |
| `#total-seats`, `#available-seats`, `#occupied-seats` | Mostrar los recuentos derivados de la matriz. |
| `#selected-seat` | Mostrar la selección con fila A–H y columna 1–10, o «Sin selección». |
| `#confirm-reservation` | Ya está deshabilitado; habilitarlo posteriormente solo para una selección válida y libre. |
| `#find-adjacent-seats` | Solicitar la búsqueda, sin reservar automáticamente. |
| `#reservation-message` | Mostrar resultados y errores; ya cuenta con `role="status"` y `aria-live="polite"`. |

#### Funciones de presentación sugeridas

| Función | Objetivo | Parámetros | Retorno | Conceptos |
| --- | --- | --- | --- | --- |
| `actualizarMapa` | Reflejar ocupación y selección en las butacas existentes. | `sala: number[][]`, `seleccion: number[][]` | `void` | Bucles, atributos DOM, clases CSS y comprobación de elementos nulos. |
| `actualizarEstadisticas` | Sustituir los valores estáticos por recuentos reales. | `sala: number[][]` | `void` | Reutilización de funciones, texto del DOM y conversión a string. |
| `actualizarSeleccion` | Mostrar la selección y sincronizar el botón de confirmación. | `sala: number[][]`, `seleccion: number[][]` | `void` | Condicionales, arrays, validación, texto y propiedad `disabled`. |
| `mostrarMensaje` | Comunicar confirmación, error o ausencia de pareja. | `mensaje: string`, `esError: boolean` | `void` | Strings, booleanos y actualización del área de estado. |

La selección propuesta es un array temporal de coordenadas: cada entrada contiene dos números, fila y columna. Vacío significa sin selección; una coordenada corresponde a elección individual y dos a una pareja encontrada. No representa reservas ni sustituye la matriz de ceros y unos. Buscar solo selecciona una propuesta; confirmar la pareja exige comprobar ambas butacas antes de modificar ninguna.

Pistas y aceptación por función:

- **`actualizarMapa`:** ¿cómo relacionar atributos HTML con índices? Debe mostrar la ocupación real, destacar únicamente selecciones libres, actualizar etiquetas accesibles y deshabilitar butacas ocupadas sin alterar la matriz.
- **`actualizarEstadisticas`:** ¿por qué reutilizar los contadores en vez de mantener cifras independientes? Debe mostrar el total real y los recuentos correctos antes y después de una reserva.
- **`actualizarSeleccion`:** ¿es seleccionar equivalente a reservar? Debe mostrar coordenadas legibles; con selección vacía, inválida u ocupada, la confirmación sigue deshabilitada. No modifica reservas.
- **`mostrarMensaje`:** ¿qué debe saber el usuario tras cada acción? Debe mostrar el texto solicitado, diferenciar éxito y error sin depender solo del color y conservar los atributos de anuncio accesible.

- [ ] Escribir y verificar `actualizarMapa` con sala vacía y parcialmente ocupada.
- [ ] Escribir y verificar `actualizarEstadisticas` reutilizando los contadores.
- [ ] Escribir y verificar `actualizarSeleccion` en todos los estados del botón.
- [ ] Escribir y verificar `mostrarMensaje` para éxito, rechazo y búsqueda sin resultado.
- [ ] Conectar los eventos únicamente en esta fase, convirtiendo atributos DOM a números y validándolos.
- [ ] Confirmar mediante `reservarAsiento`; volver a validar la selección antes de reservar.
- [ ] Para una pareja, evitar reservas parciales y limpiar la selección tras una confirmación correcta.
- [ ] Refrescar mapa, estadísticas y consola después de cada reserva correcta.
- [ ] Comprobar que buscar no modifica la matriz ni reserva por sí solo.
- [ ] Mantener operaciones de DOM y carga de CSS fuera de la ejecución en terminal.
- [ ] Verificar teclado, foco visible, etiquetas accesibles y mensajes.
- [ ] Revisar móvil: mapa con desplazamiento interno y panel debajo; escritorio: panel lateral sin solapamientos.
- [ ] Repetir los escenarios de consola y comprobar tipos antes de cerrar la integración.

## 4. Dependencias entre funciones

| Función o tarea | Requisito previo |
| --- | --- |
| `inicializarSala` | Ninguna función del ejercicio; resolver el modo de consola. |
| `mostrarSala` | Tener una matriz válida, normalmente creada con `inicializarSala`. |
| `reservarAsiento`, versión básica | Matriz inicializada; `mostrarSala` permite observar el cambio. |
| `existeAsiento` | Matriz válida; no requiere reservas. |
| `estaDisponible` | `existeAsiento`. |
| `reservarAsiento`, versión completa | Validación de existencia y disponibilidad terminada. |
| `contarDisponibles`, `contarOcupados` | Matriz válida; no dependen entre sí ni necesitan reservar para funcionar. |
| `buscarDosContiguos` | Matriz válida; puede reutilizar `estaDisponible`. No requiere los contadores. |
| Cuatro escenarios | Inicialización, impresión, reserva validada, recuentos y búsqueda terminados. |
| `actualizarMapa` | Escenarios aprobados y convenciones de coordenadas acordadas. |
| `actualizarEstadisticas` | Ambos contadores terminados. |
| `actualizarSeleccion` | Validaciones terminadas y selección temporal definida. |
| `mostrarMensaje` | Elemento de estado existente; no depende de las funciones del dominio. |
| Eventos de reserva y búsqueda | Funciones del dominio y de presentación comprobadas. |

El orden pedagógico de las fases se mantiene aunque algunas funciones puedan desarrollarse independientemente. No avanzar por anticipado.

## 5. Commits recomendados

Sugerencias únicamente: no ejecutar commits ni push automáticamente. Revisar los archivos incluidos y confirmar solo el trabajo de la fase completada.

| Entrega | Mensaje sugerido |
| --- | --- |
| Este documento | `docs: añadir plan de implementación de Cinema Seat Manager` |
| Fase 1 | `feat: inicializar matriz de 8 filas y 10 columnas` |
| Fase 2 | `feat: mostrar sala numerada en consola con L y X` |
| Fase 3 | `feat: reservar una butaca por fila y columna` |
| Fase 4 | `feat: validar coordenadas y rechazar reservas ocupadas` |
| Fase 5 | `feat: contar butacas disponibles y ocupadas` |
| Fase 6 | `feat: buscar dos butacas libres contiguas` |
| Fase 7 | `test: comprobar cuatro escenarios de ocupación en consola` |
| Fase 8 | `feat: conectar la lógica de reservas con la interfaz existente` |

## 6. Acuerdo de tutoría

- El estudiante indica expresamente qué fase quiere empezar.
- Copilot pregunta por el enfoque, explica conceptos y ofrece pistas graduales sin escribir la solución.
- El estudiante escribe todas las funciones; Copilot revisa el intento y ayuda a interpretar errores concretos.
- Revisar la checklist y criterios de aceptación de la fase actual, sin añadir tareas ajenas.
- No avanzar de fase ni modificar archivos sin la petición correspondiente.
- Mantener consola y matriz como núcleo académico; la interfaz web se integra solo al final.

**Estado actual:** interfaz visual terminada; fases 1 y 2 completadas y fases 3 a 8 pendientes. Este documento no cambia TypeScript, HTML ni CSS.