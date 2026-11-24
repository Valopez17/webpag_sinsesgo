# Sin Sesgo — Sitio web

Sitio web de **Sin Sesgo Consulting SC**, consultora de investigación electoral y opinión pública (México).
Este repositorio contiene la homepage de alta fidelidad y el sistema visual que servirá para las páginas interiores.

> Estado: **prototipo para revisión creativa**. Todo lo marcado `[entre corchetes]` está pendiente de confirmar con la consultora. No se inventaron clientes, cifras, resultados, certificaciones, equipo ni datos de contacto.

## Estructura

```
sin-sesgo/
├── index.html                  # Homepage
├── assets/
│   ├── css/styles.css          # Tokens, componentes, secciones y animaciones
│   ├── js/main.js              # Animaciones de entrada, menú, acordeón, línea de tiempo, formulario, hero
│   └── img/
│       ├── logo-original.png   # Logotipo entregado por el cliente (fuente, no modificar)
│       ├── logo-ink.png        # Logotipo completo, fondo transparente, color tinta #17212B
│       ├── logo-ivory.png      # Logotipo completo, fondo transparente, color marfil #F3F0E9
│       ├── wordmark-ink.png    # Solo "SIN SESGO" (reserva para versiones compactas)
│       ├── wordmark-ivory.png
│       ├── favicon.png         # La "O" de anillos del logotipo
│       ├── photos/             # Fotografías del hero, la franja "En territorio" y la sección "Por qué"
│       └── team/               # Retratos en blanco y negro del equipo (originales, sin retoque)
├── docs/
│   └── brief-original.md       # Brief creativo original
└── README.md
```

Páginas previstas (aún no construidas): `servicios.html`, `nosotros.html`, `metodologia.html`, `contacto.html`. Por ahora son anclas dentro de la homepage.

## Cómo verlo

HTML, CSS y JavaScript sin dependencias ni paso de compilación. Abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Las tipografías se cargan desde Google Fonts, así que se necesita conexión para verlas.

## Sistema visual

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#17212B` | Texto, fondos oscuros |
| `--ivory` | `#F3F0E9` | Fondo base |
| `--blue` | `#C4D7E4` | Sección de método, acentos sobre oscuro |
| `--coral` | `#F16C4C` | Acción y cierre comercial |
| `--coral-d` | `#B83A1E` | Coral para texto sobre marfil (contraste AA) |

**Tipografía:** Instrument Serif (titulares de sección y numerales), Manrope (texto, botones, etiquetas) e Inter Tight (titular del hero).

**Idea de marca:** *sesgo* significa inclinación. Los kickers llevan una pequeña línea inclinada −12° y el logotipo aporta la línea horizontal y la "O" de anillos concéntricos.

**Componentes reutilizables:** botón (`.btn`, variantes `.primary` y `.solid`), kicker, acordeón de servicios (`.svc`), pasos de método (`.r`), puntos clave (`.pts`), franja fotográfica (`.band`), formulario, placeholder (`.ph`).

**Servicios (confirmados):** Encuestas preelectorales, Encuestas de entrada, Encuestas de salida y Conteos rápidos. Para agregar uno se duplica un bloque `.svc` en `index.html`. Las encuestas de entrada y de salida son servicios distintos.

## Logotipo

El header cambia de versión según el scroll: sobre la fotografía del hero usa `logo-ivory.png`; al pasar el hero, el header se vuelve sólido y usa `logo-ink.png`. El footer usa `logo-ivory.png`.

Las versiones en tinta y marfil se generaron a partir de `logo-original.png` (negro sobre blanco) convirtiendo la luminancia en transparencia. Así el logotipo ya no aparece como un recuadro blanco sobre la fotografía. Pendiente: vectorizar el logotipo (SVG) para mayor nitidez.

## Animaciones de entrada

- **Hero (al cargar):** la fotografía aparece, el header baja, las cuatro líneas del titular suben en secuencia y al final entran el texto y el botón.
- **Secciones (al hacer scroll):** los titulares suben palabra por palabra desde una máscara; los bloques de texto y las tarjetas suben con un fundido; las listas (servicios, pasos, puntos clave, footer) entran en cascada; el "20" sube desde abajo; la regla de 21 marcas se enciende una a una.
- Se activan con `IntersectionObserver`, una sola vez por elemento.
- **Accesibilidad:** con `prefers-reduced-motion: reduce` no se aplica ninguna animación de entrada y todo aparece en su estado final. Sin JavaScript también se ve completo. Los titulares conservan su texto completo para lectores de pantalla (`aria-label`). La secuencia de fotografías del hero tiene botón de pausa.

## Proceso de construcción

1. **v0.1 — Primera propuesta.** Homepage con las siete secciones del brief, paleta y tipografías propuestas y acordeón de servicios.
2. **v0.2 — Refinamiento de dirección de arte.** Auditoría crítica (identidad, tipografía, composición, ritmo, recursos gráficos, titulares y CTAs): idea del "nivel", titulares escalonados, ritmo de fondos (marfil, tinta, marfil, azul, marfil, coral, tinta), el "20" gigante en cursiva, títulos fijos (*sticky*) en servicios y método, botones con relleno animado.
3. **v0.3 — Versión fotográfica.** Hero con secuencia de fotografías y palabra rotativa en el titular, header transparente sobre el hero, franja "En territorio" y fotografía en la sección "Por qué Sin Sesgo", y logotipo real del cliente.
4. **v0.4 — Logo corregido, animaciones, CTA y repositorio** *(esta versión)*:
   - El logotipo se veía como un recuadro blanco porque el PNG original tenía fondo blanco opaco. Se reemplazó por versiones transparentes en tinta y marfil, y se agregó el favicon.
   - Se añadieron las animaciones de entrada descritas arriba.
   - El CTA principal del hero cambió de "Conoce nuestros servicios" a **"Habla con un investigador"** y ahora lleva a la sección de contacto.
   - Las imágenes incrustadas en el HTML (base64) pasaron a archivos en `assets/img/photos/`; el archivo único se separó en `index.html`, `assets/css` y `assets/js`.
   - Se eliminó código sin uso de versiones anteriores (campo de puntos del hero, símbolo del logotipo provisional).

## Sección "Nuestro equipo"

Franja compacta `#equipo` (≈ 480 px de alto en desktop) entre "Por qué Sin Sesgo" y el cierre comercial: fondo blanco, título y texto centrados, y cinco cuadros de 140 px en una sola fila. Los dos primeros son retratos en blanco y negro (`assets/img/team/`, usados tal como se entregaron; solo se recortan con CSS a cuadrado): **Verónica Arredondo** (`retrato-02.png`) y **Valeria Falcón** (`retrato-01.png`), con el nombre de pila en tipografía manuscrita (Caveat) y el nombre completo en gris debajo. Los otros tres son cuadros negros vacíos (`.slot`) reservados para futuros integrantes: para activar uno, se sustituye el `<div class="ph-img"></div>` por una `<img>` y se añade su `<p class="first">`.

En móvil la retícula pasa a 3 columnas. Hover discreto (acercamiento lento de la foto) y entrada con el sistema de animaciones existente.

Pendiente: cargos (no se muestran hasta confirmarse) y la página "Conoce al equipo", que por ahora enlaza a la misma sección.

## Pendientes de contenido

- Nombres, cargos y perfiles del equipo.
- Correo, teléfono y dirección; aviso de privacidad y redes sociales.
- **Fotografías:** confirmar origen y licencia de las imágenes actuales y sustituirlas por fotografía documental propia si se desea. La fotografía de "Por qué Sin Sesgo" (`plaza-caminando.png`) se usa tal como se entregó, sin retoque ni cambio de color.
- Revisar el titular rotativo del hero ("México", "la Gen Z", "los compradores") contra el posicionamiento electoral de la marca.
- Conexión real del formulario (hoy solo valida y muestra un mensaje).

## Siguientes pasos sugeridos

1. Página interior de **Servicios**, con el mismo acordeón y componentes.
2. Páginas de **Nosotros**, **Metodología** y **Contacto**.
3. Extraer header y footer a plantillas compartidas cuando existan varias páginas.
4. Auditoría de rendimiento y accesibilidad con el contenido final.

## Historial reciente

- **v0.6:** nueva fotografía en "Por qué Sin Sesgo" (personas caminando por una plaza, vista cenital) y se elimina su pie de foto provisional.
- **v0.5:** CTA del hero cambia a "Hablemos"; se elimina la línea de tiempo de la sección de trayectoria; servicios ampliados a cuatro con descripciones confirmadas; textos de los cuatro pasos de método y de "Equipo" sin placeholders; nombres completos bajo los retratos; se desactiva el rebote de *overscroll* (`overscroll-behavior: none`) para evitar la línea blanca arriba y abajo.
