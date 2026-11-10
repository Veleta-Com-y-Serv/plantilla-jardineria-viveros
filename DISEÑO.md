# Jardinería y viveros: brief de diseño

Plantilla `jardineria-viveros` creada el 10/11/2026 a partir de `floristeria-regalos` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Garden** de la skill Hallmark (género editorial). De la base solo queda la estructura técnica.
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: empresas de jardinería y paisajismo, jardineros autónomos y viveros o centros de jardinería (sectores
  `jardineria`, `vivero`, `jardinero`, `mantenimiento-jardines`): diseño y construcción de jardines, mantenimiento de
  particulares, comunidades y empresas, podas y talas, césped natural y artificial, riego automático, desbroces, huertos;
  y en el vivero, planta de temporada, árboles y frutales, plantel de huerta, macetas, tierras y abonos. Su cliente quiere
  ver jardines hechos (fotos grandes), qué servicios y qué planta hay ahora, en qué zona trabajan y pedir presupuesto o visita.
  No es una floristería (para eso está `floristeria-regalos`).
- **Qué tiene que conseguir la web**: que **pidan presupuesto o visita** (WhatsApp, teléfono o formulario) y que **vengan al
  vivero**. «Pide presupuesto» en la cabecera y en la portada; la banda de tinta verde con los pasos; en móvil, barra fija con
  «Llamar» y «Presupuesto».
- **Tono**: el de un cuaderno de campo de un vivero: honesto, de temporada, sin prisa. Sí: la etiqueta de cartón de un
  frutal, el jardín fotografiado con luz de día. No: la web de bienestar en salvia y pizarra, ni la plantilla de crema y
  terracota, ni el verde corporativo.

## Tema Hallmark y cómo se ha traducido

Garden (`references/themes/garden.md`, `photo: natural con=6 sat=-6`): papel de avena, tinta verde casi negra, Vollkorn 600
con cifras de estilo antiguo sobre Hanken Grotesk, Newsreader para los pies de foto, filetes finos, lavados de musgo, fotos
de día en su color real y una sola señal verde hoja.

- **Cuatro colores** → `fondo` = papel de avena (`#f7f1df`), `texto` = tinta verde (`#0f2a18`), `acento` = verde hoja
  (`#1f6a19`: botón, foco, barras del calendario, el mes en curso), `primario` = banda de tinta verde (`#13331b`: presupuesto,
  la página de zona y el pie).
- **Derivados** (`src/styles/global.css`): `--papel-2`/`--papel-3` (bandas claras y fondo de las fotos; con `oklch(from …)`
  conservan el matiz del papel), `--tinta-2`, `--apagado`, `--filete`, `--filete-2`, `--musgo` (lavado del acento al 11 %),
  `--barra`, `--acento-legible` (hoja como texto, nunca más clara que L 0,46), `--hoja-palida` (el botón sobre la tinta, como
  pide el tema) y `--sobre-primario`, `--sobre-acento`, `--sobre-hoja-palida` (texto claro u oscuro según el color del
  cliente). Probado con primario azul marino, acento naranja y papel blanco: legible (capturas en la revisión).
- **Material**: cabezas de sección con filete fino de `--filete-2` a todo el ancho; filas con filetes para servicios, planta,
  pasos, valores, pueblos y preguntas; fotos con radio de 4 px, filete interior al 10 % y el tratamiento `natural` por CSS
  (`contrast(1.06) saturate(.94)`); pozo plano en papel 2 sin borde ni sombra; botones en pareja: píldora verde hoja + píldora
  de filete. Movimiento solo de estado (subrayados y el signo de las preguntas).
- **Firma**: «el año en el jardín» (Range del tema, «the season as a ruled strip»): una tabla de filetes con los doce meses y
  una barra verde hoja en los meses de cada tarea (`calendario.tareas`, meses en texto libre que interpreta `mesesDe` de
  `src/data/site.ts`); el mes en curso se marca con una píldora. Y las cifras de estilo antiguo en el año de «Desde».

## Tipografías y licencias

Vollkorn 600 (Friedrich Althausen), Hanken Grotesk 400 y 500 (Hanken Design Co.) y Newsreader 400 (Production Type), todas
**OFL-1.1**, woff2 `latin` de Fontsource en `public/fuentes/` (77 KB en total), `font-display: swap`, respaldo del sistema
de la misma clase y `preload` solo de Vollkorn. Son exactamente las tres caras del tema (Newsreader, la tercera, solo para
pies de foto y notas). Detalle en `public/fuentes/LICENCIAS.md`.

Titulares sin palabras partidas: `overflow-wrap: normal`, `hyphens: manual`. En Vollkorn 600 «Impermeabilizaciones» mide
9,4 em: el `h1` baja a 33,6 px a 375 px y se limita a `10,2cqi` de su columna en escritorio; los `h2` a 31 px en móvil y a
`10,2cqi` de su bloque (5,9cqi en las cabezas partidas).

## Forma y ritmo de bandas

| # | Sección | Papel | Lleva |
|---|---|---|---|
| 1 | `hero` | papel | Stage: texto en 11/24, foto del jardín en 13/24 hasta el borde derecho, pie en Newsreader (en móvil, arriba) |
| 2 | `servicios` | papel | filas con filetes: nombre, línea, precio a la derecha; enlaces a las fichas |
| 3 | `trabajos` | clara | escaparate: el primer jardín a 21:9 a todo el ancho y los demás en 7 + 5 con su etiqueta |
| 4 | `presupuesto` | tinta | frase grande, botones y pasos numerados |
| 5 | `vivero` | papel | foto vertical fija y la planta por grupos en filas con precio |
| 6 | `calendario` | musgo | el año en el jardín (firma) |
| 7 | `sobre` | papel | foto a sangre a la izquierda, «Desde 1994» en cifra grande, declaración y valores |
| 8 | `zonas` | clara | índice de pueblos en dos columnas |
| 9 | `opiniones` | papel | la primera como frase grande |
| 10 | `preguntas` | clara | filas `details` con el titular fijo |
| 11 | `contacto` | papel | vías grandes, horario y formulario en un pozo |
| — | pie | tinta | nombre como mástil, cuatro columnas, barra móvil |

Se alternan bandas guiadas por foto (portada, jardines, vivero, quiénes somos) con bandas que solo hace el material (filas con
filetes, la frase en la tinta, la tabla del año, el índice de pueblos, el pozo).

## Listas propias y páginas

- `servicios.items` {titulo, texto, precio, imagen, imagenes, detalle}, `trabajos.trabajos` {titulo, texto, lugar,
  superficie, imagen}, `vivero.plantas` {nombre, texto, precio, categoria}, `calendario.tareas` {titulo, meses, texto},
  `zonas.items` {titulo, texto}.
- Fichas: cada servicio con `detalle` tiene su página en `/servicios/<slug>/` (`Service`). Zonas: cada pueblo con `texto`,
  en `/zonas/<slug>/` («Jardinería en {zona}»), con los servicios, los jardines cuyo `lugar` nombra la zona y las opiniones.
- Varias páginas recomendadas: Servicios, Jardines hechos (trabajos, opiniones), El vivero (vivero, calendario), Zonas y
  contacto (zonas, preguntas, contacto). Inicio se queda con la portada, el presupuesto y quiénes somos.

## Fotos

11 fotos generadas con IA a partir de `fotos.json` (jardín de casa de piedra en el Bajo Aragón, jardín seco con olivos,
zona verde de una comunidad, huerto en bancales, pasillo del vivero, manos podando un olivo, jardín recién plantado, poda de
un manzano en invierno, tepe recién colocado, aspersor al atardecer, olivo centenario podado). Sin texto, sin logotipos, sin
caras. La herramienta devuelve 1024×1024: se recortan al aspecto y se amplían como mucho ×1,4 (la portada a 1400 px, que
ocupa la mitad de la pantalla: por eso la portada es partida y no una foto a sangre a 1920 px).

## Lo que no se ha podido o choca con Hallmark

- `antetitulo` es contrato: se pinta como letra menuda en caja normal (Hallmark prohíbe el antetítulo).
- `opiniones` lleva ejemplos ficticios en el `site.yaml` de muestra (Hallmark prohíbe inventarlos); la plataforma deja la
  sección desmarcada y vacía al crear una web. Lo mismo para precios y superficies del ejemplo: la plataforma no los copia.
- Los `items` de la portada la plataforma los trata como cifras (no se inventan): por eso no van en el paso «negocio» del guion.
- El sello de Hallmark no queda en la primera línea del CSS servido (Tailwind antepone su cabecera al ir en línea) y `comun.css`
  (común a todas las plantillas) trae colores literales y etiquetas en mayúsculas que aquí se anulan.
- Hallmark pide 450 palabras por página y el `h1` a 84 px; una web de jardinería con servicios, planta, calendario y
  preguntas pasa de 1000 palabras, y el `h1` se queda en unos 60 px en escritorio para que quepa una palabra de 20 letras en su
  columna. Se queda así porque es contenido que el cliente necesita y es contrato de NoExpertise.
- En las cifras de estilo antiguo de Vollkorn el «1» parece una I versal: en los pasos numerados se usan cifras de caja alta;
  el año de «Desde» conserva las de estilo antiguo (es la cifra del tema).
- El color arcilla del tema (`--tint-clay`) no se usa: no se puede derivar de los cuatro colores del cliente sin inventar un quinto.
