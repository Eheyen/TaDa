/* =====================================================
   FLORES AMARILLAS 💛
   SCRIPT COMPLETO ACTUALIZADO

   FUNCIONES:
   - Abrir regalo
   - Animación del árbol de flores
   - Corazón formado por flores
   - Pétalos
   - Música
   - Mensajes automáticos
   - Botón Mírame
   - Transición
   - Código 1405
   - Teclado numérico
   - Indicadores del código
   - Validación
   - Carrusel / recuerdos
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTOS PRINCIPALES
    ===================================================== */

    const canvas =
        document.getElementById("canvas");

    const inicio =
        document.getElementById("inicio");

    const escena =
        document.getElementById("escena");

    const abrirRegalo =
        document.getElementById("abrirRegalo");

    const musica =
        document.getElementById("musica");

    const musicaBtn =
        document.getElementById("musicaBtn");

    const mirameBtn =
        document.getElementById("mirameBtn");


    /* =====================================================
       VALIDAR CANVAS
    ===================================================== */

    if (!canvas) {
        console.error(
            "No se encontró el elemento #canvas"
        );
        return;
    }


    const ctx =
        canvas.getContext("2d");


    /* =====================================================
       VARIABLES DEL CANVAS
    ===================================================== */

    let ancho = 0;

    let alto = 0;

    let flores = [];

    let petalos = [];

    let abierto = false;

    let tiempoInicio = 0;


    /* =====================================================
       CONFIGURACIÓN
    ===================================================== */

    const CONFIG = {

        cantidadFlores: 560,

        cantidadPetalos: 55,

        duracionFloracion: 4500,

        codigoCorrecto: "1405",

        tiempoCarrusel: 4500

    };


    /* =====================================================
       AJUSTAR CANVAS
    ===================================================== */

    function ajustarCanvas() {

        ancho =
            window.innerWidth;

        alto =
            window.innerHeight;


        const dpr =
            window.devicePixelRatio || 1;


        canvas.width =
            ancho * dpr;

        canvas.height =
            alto * dpr;


        canvas.style.width =
            ancho + "px";

        canvas.style.height =
            alto + "px";


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );
    }


    ajustarCanvas();


    /* =====================================================
       DATOS DEL ÁRBOL
    ===================================================== */

    function obtenerArbol() {

        const movil =
            ancho <= 900;


        return {

            centroX:
                movil
                    ? ancho * 0.52
                    : ancho * 0.70,

            baseY:
                alto * 0.94,

            altura:
                Math.min(
                    alto * 0.60,
                    520
                ),

            anchoRamas:
                movil
                    ? Math.min(
                        ancho * 0.72,
                        360
                    )
                    : Math.min(
                        ancho * 0.50,
                        440
                    )
        };
    }


    /* =====================================================
       ECUACIÓN DEL CORAZÓN
    ===================================================== */

    function puntoCorazon(t) {

        const x =
            16 *
            Math.pow(
                Math.sin(t),
                3
            );


        const y =
            13 * Math.cos(t)
            -
            5 * Math.cos(2 * t)
            -
            2 * Math.cos(3 * t)
            -
            Math.cos(4 * t);


        return {
            x,
            y
        };
    }


    /* =====================================================
       CREAR SILUETA DEL CORAZÓN
    ===================================================== */

    function crearCorazon(
        centroX,
        centroY,
        escalaX,
        escalaY
    ) {

        const puntos = [];

        const cantidadPuntos = 600;


        for (
            let i = 0;
            i < cantidadPuntos;
            i++
        ) {

            const t =
                (
                    Math.PI * 2 * i
                ) /
                cantidadPuntos;


            const p =
                puntoCorazon(t);


            puntos.push({

                x:
                    centroX +
                    p.x *
                    escalaX,

                y:
                    centroY -
                    p.y *
                    escalaY

            });
        }


        return puntos;
    }


    /* =====================================================
       DETERMINAR SI UN PUNTO ESTÁ DENTRO
       DEL CORAZÓN
    ===================================================== */

    function dentroCorazon(
        x,
        y,
        puntos
    ) {

        let dentro = false;


        for (
            let i = 0,
            j = puntos.length - 1;

            i < puntos.length;

            j = i++
        ) {

            const xi =
                puntos[i].x;

            const yi =
                puntos[i].y;

            const xj =
                puntos[j].x;

            const yj =
                puntos[j].y;


            const intersecta =
                (
                    (yi > y) !==
                    (yj > y)
                )
                &&
                (
                    x <
                    (
                        (xj - xi) *
                        (y - yi)
                    )
                    /
                    (yj - yi)
                    +
                    xi
                );


            if (intersecta) {

                dentro =
                    !dentro;
            }
        }


        return dentro;
    }


    /* =====================================================
       GENERAR FLORES
    ===================================================== */

    function generarFlores() {

        const arbol =
            obtenerArbol();


        const centroY =
            arbol.baseY -
            arbol.altura * 0.65;


        const escala =
            arbol.anchoRamas / 32;


        const puntos =
            crearCorazon(
                arbol.centroX,
                centroY,
                escala,
                escala
            );


        let minX = Infinity;

        let maxX = -Infinity;

        let minY = Infinity;

        let maxY = -Infinity;


        puntos.forEach(p => {

            minX =
                Math.min(
                    minX,
                    p.x
                );

            maxX =
                Math.max(
                    maxX,
                    p.x
                );

            minY =
                Math.min(
                    minY,
                    p.y
                );

            maxY =
                Math.max(
                    maxY,
                    p.y
                );
        });


        const puntaInferior =
            maxY;


        flores = [];


        const separacion =
            ancho <= 600
                ? 8
                : 10;


        for (
            let y = minY;
            y <= maxY;
            y += separacion
        ) {

            for (
                let x = minX;
                x <= maxX;
                x += separacion
            ) {

                const px =
                    x +
                    (
                        Math.random() -
                        0.5
                    ) * 5;


                const py =
                    y +
                    (
                        Math.random() -
                        0.5
                    ) * 5;


                if (
                    dentroCorazon(
                        px,
                        py,
                        puntos
                    )
                ) {

                    const distanciaPunta =
                        Math.abs(
                            py -
                            puntaInferior
                        );


                    let tamano =
                        4 +
                        Math.random() * 2.5;


                    if (
                        distanciaPunta < 22
                    ) {

                        tamano += 1.2;
                    }


                    flores.push({

                        x: px,

                        y: py,

                        tamano,

                        rotacion:
                            Math.random() *
                            Math.PI *
                            2,

                        distancia:
                            Math.hypot(
                                px -
                                arbol.centroX,

                                py -
                                centroY
                            )
                    });
                }
            }
        }


        /* =================================================
           REFUERZO DE LA PUNTA
        ================================================= */

        for (
            let i = 0;
            i < 35;
            i++
        ) {

            const px =
                arbol.centroX +
                (
                    Math.random() -
                    0.5
                ) * 24;


            const py =
                puntaInferior -
                Math.random() * 22;


            if (
                dentroCorazon(
                    px,
                    py,
                    puntos
                )
            ) {

                flores.push({

                    x: px,

                    y: py,

                    tamano:
                        5 +
                        Math.random() * 2.5,

                    rotacion:
                        Math.random() *
                        Math.PI *
                        2,

                    distancia:
                        Math.hypot(
                            px -
                            arbol.centroX,

                            py -
                            centroY
                        )
                });
            }
        }


        /* =================================================
           ORDEN DE FLORACIÓN
        ================================================= */

        flores.sort(
            (a, b) =>
                a.distancia -
                b.distancia
        );


        flores.forEach(
            (flor, indice) => {

                flor.retraso =
                    250 +
                    (
                        indice /
                        flores.length
                    ) *
                    CONFIG.duracionFloracion;
            }
        );
    }


    /* =====================================================
       DIBUJAR ÁRBOL
    ===================================================== */

    function dibujarArbol() {

        const arbol =
            obtenerArbol();


        const h =
            arbol.altura;

        const x =
            arbol.centroX;

        const base =
            arbol.baseY;


        const finalTronco =
            base -
            h * 0.42;


        ctx.save();


        /* =================================================
           TRONCO
        ================================================= */

        ctx.beginPath();


        ctx.moveTo(
            x,
            base
        );


        ctx.bezierCurveTo(

            x - 10,

            base -
            h * 0.15,

            x + 8,

            base -
            h * 0.30,

            x,

            finalTronco
        );


        ctx.strokeStyle =
            "#244d2a";


        ctx.lineWidth =
            9;


        ctx.lineCap =
            "round";


        ctx.stroke();


        /* =================================================
           RAMA IZQUIERDA
        ================================================= */

        const alturaRama =
            h * 0.16;


        const anchoRama =
            arbol.anchoRamas *
            0.42;


        ctx.beginPath();


        ctx.moveTo(
            x,
            finalTronco
        );


        ctx.bezierCurveTo(

            x -
            anchoRama * 0.20,

            finalTronco -
            alturaRama * 0.20,

            x -
            anchoRama * 0.60,

            finalTronco -
            alturaRama * 0.60,

            x -
            anchoRama,

            finalTronco -
            alturaRama
        );


        ctx.strokeStyle =
            "#244d2a";


        ctx.lineWidth =
            4;


        ctx.stroke();


        /* =================================================
           RAMA DERECHA
        ================================================= */

        ctx.beginPath();


        ctx.moveTo(
            x,
            finalTronco
        );


        ctx.bezierCurveTo(

            x +
            anchoRama * 0.20,

            finalTronco -
            alturaRama * 0.20,

            x +
            anchoRama * 0.60,

            finalTronco -
            alturaRama * 0.60,

            x +
            anchoRama,

            finalTronco -
            alturaRama
        );


        ctx.stroke();


        /* =================================================
           RAMITAS
        ================================================= */

        dibujarRamita(

            x -
            anchoRama * 0.45,

            finalTronco -
            alturaRama * 0.45,

            -1

        );


        dibujarRamita(

            x +
            anchoRama * 0.45,

            finalTronco -
            alturaRama * 0.45,

            1

        );


        ctx.restore();
    }


    /* =====================================================
       DIBUJAR RAMITA
    ===================================================== */

    function dibujarRamita(
        x,
        y,
        direccion
    ) {

        ctx.beginPath();


        ctx.moveTo(
            x,
            y
        );


        ctx.quadraticCurveTo(

            x +
            direccion * 25,

            y - 12,

            x +
            direccion * 45,

            y - 25
        );


        ctx.strokeStyle =
            "#315f36";


        ctx.lineWidth =
            2;


        ctx.lineCap =
            "round";


        ctx.stroke();
    }


    /* =====================================================
       DIBUJAR FLOR
    ===================================================== */

    function dibujarFlor(
        flor,
        escala
    ) {

        ctx.save();


        ctx.translate(
            flor.x,
            flor.y
        );


        ctx.rotate(
            flor.rotacion
        );


        ctx.scale(
            escala,
            escala
        );


        const r =
            flor.tamano;


        /* =================================================
           PÉTALOS
        ================================================= */

        for (
            let i = 0;
            i < 7;
            i++
        ) {

            const angulo =
                (
                    Math.PI *
                    2 *
                    i
                ) /
                7;


            ctx.save();


            ctx.rotate(
                angulo
            );


            ctx.beginPath();


            ctx.ellipse(

                0,

                -r * 0.75,

                r * 0.42,

                r * 0.82,

                0,

                0,

                Math.PI * 2

            );


            ctx.fillStyle =
                "#f7c928";


            ctx.fill();


            ctx.restore();
        }


        /* =================================================
           CENTRO
        ================================================= */

        ctx.beginPath();


        ctx.arc(
            0,
            0,
            r * 0.32,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            "#704214";


        ctx.fill();


        ctx.restore();
    }


    /* =====================================================
       GENERAR PÉTALOS
    ===================================================== */

    function generarPetalos() {

        petalos = [];


        for (
            let i = 0;
            i < CONFIG.cantidadPetalos;
            i++
        ) {

            petalos.push({

                x:
                    Math.random() *
                    ancho,

                y:
                    Math.random() *
                    alto,

                velocidad:
                    0.5 +
                    Math.random() * 1.5,

                movimiento:
                    Math.random() *
                    Math.PI * 2,

                tamano:
                    2 +
                    Math.random() * 3,

                rotacion:
                    Math.random() *
                    Math.PI * 2

            });
        }
    }


    /* =====================================================
       DIBUJAR PÉTALOS
    ===================================================== */

    function dibujarPetalos() {

        petalos.forEach(p => {

            p.y +=
                p.velocidad;


            p.movimiento +=
                0.015;


            p.x +=
                Math.sin(
                    p.movimiento
                ) * 0.4;


            if (
                p.y >
                alto + 20
            ) {

                p.y = -20;

                p.x =
                    Math.random() *
                    ancho;
            }


            ctx.save();


            ctx.translate(
                p.x,
                p.y
            );


            ctx.rotate(
                p.rotacion
            );


            ctx.beginPath();


            ctx.ellipse(

                0,

                0,

                p.tamano,

                p.tamano * 1.6,

                0,

                0,

                Math.PI * 2

            );


            ctx.fillStyle =
                "rgba(246,194,35,0.75)";


            ctx.fill();


            ctx.restore();
        });
    }


    /* =====================================================
       ANIMACIÓN PRINCIPAL
    ===================================================== */

    function animar(tiempo) {

        if (!abierto) {
            return;
        }


        if (!tiempoInicio) {

            tiempoInicio =
                tiempo;
        }


        ctx.clearRect(
            0,
            0,
            ancho,
            alto
        );


        /* Árbol */

        dibujarArbol();


        /* Flores */

        const transcurrido =
            tiempo -
            tiempoInicio;


        flores.forEach(
            flor => {

                const progreso =
                    (
                        transcurrido -
                        flor.retraso
                    ) /
                    550;


                if (
                    progreso > 0
                ) {

                    const p =
                        Math.min(
                            1,
                            progreso
                        );


                    const escala =
                        1 -
                        Math.pow(
                            1 - p,
                            3
                        );


                    dibujarFlor(
                        flor,
                        escala
                    );
                }
            }
        );


        /* Pétalos */

        dibujarPetalos();


        requestAnimationFrame(
            animar
        );
    }


    /* =====================================================
       BOTÓN ABRIR REGALO
    ===================================================== */

    if (abrirRegalo) {

        abrirRegalo.addEventListener(
            "click",
            () => {

                abierto = true;


                if (inicio) {

                    inicio.classList.add(
                        "oculto"
                    );
                }


                if (escena) {

                    escena.classList.add(
                        "activa"
                    );
                }


                ajustarCanvas();


                generarFlores();


                generarPetalos();


                tiempoInicio = 0;


                requestAnimationFrame(
                    animar
                );


                /* =================================================
                   MOSTRAR MÍRAME
                ================================================= */

                if (mirameBtn) {

                    setTimeout(
                        () => {

                            mirameBtn.classList.remove(
                                "oculto-btn"
                            );

                            mirameBtn.classList.add(
                                "visible"
                            );

                        },

                        CONFIG.duracionFloracion +
                        1200
                    );
                }


                /* =================================================
                   MÚSICA
                ================================================= */

                if (musica) {

                    musica.volume =
                        0.35;


                    musica.play()
                        .catch(
                            () => {}
                        );
                }

            }
        );
    }


    /* =====================================================
       MÚSICA
    ===================================================== */

    if (musicaBtn) {

        musicaBtn.addEventListener(
            "click",
            () => {

                if (!musica) {
                    return;
                }


                if (
                    musica.paused
                ) {

                    musica.play()
                        .catch(
                            () => {}
                        );


                    musicaBtn.textContent =
                        "🔊";

                } else {

                    musica.pause();


                    musicaBtn.textContent =
                        "🔇";
                }

            }
        );
    }


    /* =====================================================
       MENSAJES
    ===================================================== */

    const mensajes = [

        {
            titulo:
                "Flores amarillas para ti 💛",

            texto:
                "Porque algunas personas hacen que todo florezca un poquito más bonito."
        },

        {
            titulo:
                "Un latido en cada flor 🌻",

            texto:
                "Cada girasol que ves aquí es un latido de mi corazón."
        },

        {
            titulo:
                "Tú iluminas mi vida ☀️",

            texto:
                "Así como el sol ilumina los campos, tú iluminas cada uno de mis días."
        },

        {
            titulo:
                "Eres muy especial ✨",

            texto:
                "Que estas flores te recuerden siempre lo increíble e importante que eres para mí."
        }

    ];


    let indiceMensaje = 0;


    const elementoTitulo =
        document.getElementById(
            "titulo-mensaje"
        );


    const elementoCuerpo =
        document.getElementById(
            "cuerpo-mensaje"
        );


    function cambiarMensaje() {

        if (
            !elementoTitulo ||
            !elementoCuerpo
        ) {
            return;
        }


        elementoTitulo.style.opacity =
            "0";


        elementoCuerpo.style.opacity =
            "0";


        setTimeout(
            () => {

                indiceMensaje =
                    (
                        indiceMensaje + 1
                    )
                    %
                    mensajes.length;


                elementoTitulo.textContent =
                    mensajes[
                        indiceMensaje
                    ].titulo;


                elementoCuerpo.textContent =
                    mensajes[
                        indiceMensaje
                    ].texto;


                elementoTitulo.style.opacity =
                    "1";


                elementoCuerpo.style.opacity =
                    "1";

            },

            500
        );
    }


    setInterval(
        cambiarMensaje,
        4000
    );


    /* =====================================================
       CAMBIO DE TAMAÑO
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            ajustarCanvas();


            if (abierto) {

                generarFlores();

                generarPetalos();
            }

        }
    );


    /* =====================================================
       ACCESO / CÓDIGO
    ===================================================== */

    const mirame =
        document.getElementById(
            "mirameBtn"
        );


    const acceso =
        document.getElementById(
            "accesoSorpresa"
        );


    const recuerdos =
        document.getElementById(
            "recuerdos"
        );


    const codigoInput =
        document.getElementById(
            "codigoInput"
        );


    const entrarBtn =
        document.getElementById(
            "entrarBtn"
        );


    const mensajeCodigo =
        document.getElementById(
            "mensajeCodigo"
        );


    const puntos =
        document.querySelectorAll(
            "#codigoPuntos span"
        );


    const fotos =
        document.querySelectorAll(
            ".foto"
        );


    const indicadores =
        document.querySelectorAll(
            ".indicador"
        );


    const anterior =
        document.getElementById(
            "anteriorFoto"
        );


    const siguiente =
        document.getElementById(
            "siguienteFoto"
        );


    /* =====================================================
       VARIABLES DEL ACCESO
    ===================================================== */

    let fotoActual = 0;

    let temporizadorCarrusel = null;

    let accesoCorrecto = false;


    /* =====================================================
       ACTUALIZAR PUNTOS
    ===================================================== */

    function actualizarPuntos() {

        if (!codigoInput) {
            return;
        }


        const codigo =
            codigoInput.value;


        puntos.forEach(
            (punto, indice) => {

                punto.classList.toggle(
                    "lleno",
                    indice <
                    codigo.length
                );

            }
        );
    }


    /* =====================================================
       CREAR TECLADO NUMÉRICO
       SI NO EXISTE EN EL HTML
    ===================================================== */

    function prepararTeclado() {

        if (!acceso) {
            return;
        }


        let teclado =
            acceso.querySelector(
                ".teclado-numerico"
            );


        if (!teclado) {

            const contenido =
                acceso.querySelector(
                    ".acceso-contenido"
                );


            if (!contenido) {
                return;
            }


            teclado =
                document.createElement(
                    "div"
                );


            teclado.className =
                "teclado-numerico";


            const numeros = [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "borrar",
                "0",
                "confirmar"
            ];


            numeros.forEach(
                numero => {

                    const boton =
                        document.createElement(
                            "button"
                        );


                    boton.type =
                        "button";


                    boton.className =
                        "tecla";


                    if (
                        numero ===
                        "borrar"
                    ) {

                        boton.classList.add(
                            "tecla-borrar"
                        );

                        boton.textContent =
                            "⌫";

                        boton.dataset.accion =
                            "borrar";

                    }

                    else if (
                        numero ===
                        "confirmar"
                    ) {

                        boton.classList.add(
                            "tecla-confirmar"
                        );

                        boton.textContent =
                            "✓";

                        boton.dataset.accion =
                            "confirmar";

                    }

                    else {

                        boton.textContent =
                            numero;

                        boton.dataset.numero =
                            numero;
                    }


                    teclado.appendChild(
                        boton
                    );
                }
            );


            const referencia =
                contenido.querySelector(
                    "#mensajeCodigo"
                );


            if (referencia) {

                contenido.insertBefore(
                    teclado,
                    referencia
                );

            } else {

                contenido.appendChild(
                    teclado
                );
            }
        }
    }


    prepararTeclado();


    /* =====================================================
       MOSTRAR ACCESO
    ===================================================== */

    function mostrarAcceso() {

        if (!acceso) {
            return;
        }


        acceso.classList.add(
            "mostrar"
        );


        setTimeout(
            () => {

                if (codigoInput) {

                    codigoInput.focus();
                }

            },

            500
        );
    }


    /* =====================================================
       BOTÓN MÍRAME
    ===================================================== */

    if (mirame) {

        mirame.addEventListener(
            "click",
            () => {

                if (
                    accesoCorrecto
                ) {
                    return;
                }


                document.body.classList.add(
                    "transicion-mirame"
                );


                mirame.classList.add(
                    "presionado"
                );


                setTimeout(
                    () => {

                        mostrarAcceso();

                    },

                    850
                );

            }
        );
    }


    /* =====================================================
       AGREGAR NÚMERO AL CÓDIGO
    ===================================================== */

    function agregarNumero(
        numero
    ) {

        if (!codigoInput) {
            return;
        }


        if (
            codigoInput.value.length >= 4
        ) {
            return;
        }


        codigoInput.value +=
            numero;


        codigoInput.dispatchEvent(
            new Event(
                "input",
                {
                    bubbles: true
                }
            )
        );
    }


    /* =====================================================
       BORRAR NÚMERO
    ===================================================== */

    function borrarNumero() {

        if (!codigoInput) {
            return;
        }


        codigoInput.value =
            codigoInput.value.slice(
                0,
                -1
            );


        actualizarPuntos();


        if (mensajeCodigo) {

            mensajeCodigo.textContent =
                "";
        }
    }


    /* =====================================================
       EVENTOS DEL TECLADO NUMÉRICO
    ===================================================== */

    document.addEventListener(
        "click",
        evento => {

            const tecla =
                evento.target.closest(
                    ".tecla"
                );


            if (!tecla) {
                return;
            }


            evento.preventDefault();


            tecla.classList.add(
                "presionada"
            );


            setTimeout(
                () => {

                    tecla.classList.remove(
                        "presionada"
                    );

                },

                120
            );


            /* Número */

            if (
                tecla.dataset.numero
            ) {

                agregarNumero(
                    tecla.dataset.numero
                );

                return;
            }


            /* Borrar */

            if (
                tecla.dataset.accion ===
                "borrar"
            ) {

                borrarNumero();

                return;
            }


            /* Confirmar */

            if (
                tecla.dataset.accion ===
                "confirmar"
            ) {

                revisarCodigo();

                return;
            }

        }
    );


/* =====================================================
   ACTUALIZAR INPUT
===================================================== */

if (codigoInput) {

    codigoInput.addEventListener(
        "input",
        () => {

            codigoInput.value =
                codigoInput.value
                    .replace(/\D/g, "")
                    .slice(0, 4);


            actualizarPuntos();


            if (
                mensajeCodigo &&
                codigoInput.value.length < 4
            ) {

                mensajeCodigo.textContent = "";

            }


            /* Validación automática */

            if (
                codigoInput.value.length === 4
            ) {

                setTimeout(
                    () => {

                        revisarCodigo();

                    },
                    180
                );

            }

        }
    );

}

    /* =====================================================
       TECLADO FÍSICO
    ===================================================== */

    document.addEventListener(
        "keydown",
        evento => {

            if (
                !acceso ||
                !acceso.classList.contains(
                    "mostrar"
                )
            ) {
                return;
            }


            if (
                /^[0-9]$/.test(
                    evento.key
                )
            ) {

                evento.preventDefault();

                agregarNumero(
                    evento.key
                );

                return;
            }


            if (
                evento.key ===
                "Backspace"
            ) {

                evento.preventDefault();

                borrarNumero();

                return;
            }


            if (
                evento.key ===
                "Enter"
            ) {

                evento.preventDefault();

                revisarCodigo();
            }

        }
    );


    /* =====================================================
       VALIDAR CÓDIGO
    ===================================================== */

    function revisarCodigo() {

        if (!codigoInput) {
            return;
        }


        const codigo =
            codigoInput.value.trim();


        /* =================================================
           CÓDIGO CORRECTO
        ================================================= */

        if (
            codigo ===
            CONFIG.codigoCorrecto
        ) {

            accesoCorrecto =
                true;


            if (mensajeCodigo) {

                mensajeCodigo.textContent =
                    "Código correcto 💛";


                mensajeCodigo.className =
                    "mensaje-codigo correcto";
            }


            if (entrarBtn) {

                entrarBtn.disabled =
                    true;
            }


            if (acceso) {

                acceso.classList.add(
                    "salir"
                );
            }


            setTimeout(
                () => {

                    if (recuerdos) {

                        recuerdos.classList.add(
                            "mostrar"
                        );
                    }


                    iniciarCarrusel();

                },

                1000
            );


            return;
        }


        /* =================================================
           CÓDIGO INCORRECTO
        ================================================= */

        if (mensajeCodigo) {

            mensajeCodigo.textContent =
                "Código incorrecto 💛";


            mensajeCodigo.className =
                "mensaje-codigo error";
        }


        codigoInput.classList.remove(
            "sacudir"
        );


        void codigoInput.offsetWidth;


        codigoInput.classList.add(
            "sacudir"
        );


        codigoInput.value =
            "";


        actualizarPuntos();
    }
    /* =====================================================
       BOTÓN ENTRAR
    ===================================================== */

    if (entrarBtn) {

        entrarBtn.addEventListener(
            "click",
            revisarCodigo
        );
    }


    /* =====================================================
       CARRUSEL
    ===================================================== */

    function mostrarFoto(
        indice
    ) {

        if (!fotos.length) {
            return;
        }


        fotoActual =
            (
                indice +
                fotos.length
            )
            %
            fotos.length;


        fotos.forEach(
            (foto, i) => {

                foto.classList.remove(
                    "activa",
                    "izquierda",
                    "derecha"
                );


                if (
                    i ===
                    fotoActual
                ) {

                    foto.classList.add(
                        "activa"
                    );
                }


                if (
                    i ===
                    (
                        fotoActual -
                        1 +
                        fotos.length
                    )
                    %
                    fotos.length
                ) {

                    foto.classList.add(
                        "izquierda"
                    );
                }


                if (
                    i ===
                    (
                        fotoActual +
                        1
                    )
                    %
                    fotos.length
                ) {

                    foto.classList.add(
                        "derecha"
                    );
                }

            }
        );


        indicadores.forEach(
            (indicador, i) => {

                indicador.classList.toggle(
                    "activo",
                    i ===
                    fotoActual
                );
            }
        );
    }


    /* =====================================================
       SIGUIENTE FOTO
    ===================================================== */

    function siguienteFoto() {

        mostrarFoto(
            fotoActual + 1
        );
    }


    /* =====================================================
       FOTO ANTERIOR
    ===================================================== */

    function anteriorFoto() {

        mostrarFoto(
            fotoActual - 1
        );
    }


    /* =====================================================
       INICIAR CARRUSEL
    ===================================================== */

    function iniciarCarrusel() {

        mostrarFoto(0);


        clearInterval(
            temporizadorCarrusel
        );


        temporizadorCarrusel =
            setInterval(
                siguienteFoto,
                CONFIG.tiempoCarrusel
            );
    }


    /* =====================================================
       BOTÓN SIGUIENTE
    ===================================================== */

    if (siguiente) {

        siguiente.addEventListener(
            "click",
            () => {

                siguienteFoto();

                reiniciarCarrusel();

            }
        );
    }


    /* =====================================================
       BOTÓN ANTERIOR
    ===================================================== */

    if (anterior) {

        anterior.addEventListener(
            "click",
            () => {

                anteriorFoto();

                reiniciarCarrusel();

            }
        );
    }


    /* =====================================================
       REINICIAR CARRUSEL
    ===================================================== */

    function reiniciarCarrusel() {

        clearInterval(
            temporizadorCarrusel
        );


        temporizadorCarrusel =
            setInterval(
                siguienteFoto,
                CONFIG.tiempoCarrusel
            );
    }


    /* =====================================================
       INDICADORES
    ===================================================== */

    indicadores.forEach(
        indicador => {

            indicador.addEventListener(
                "click",
                () => {

                    const indice =
                        Number(
                            indicador.dataset.index
                        );


                    mostrarFoto(
                        indice
                    );


                    reiniciarCarrusel();

                }
            );
        }
    );


    /* =====================================================
       INICIALIZAR CARRUSEL
    ===================================================== */

    mostrarFoto(0);


    /* =====================================================


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    actualizarPuntos();


    console.log(
        "Flores amarillas 💛 - JS cargado correctamente."
    );

});