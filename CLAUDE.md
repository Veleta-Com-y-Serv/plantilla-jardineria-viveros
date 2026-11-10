# Plantilla «Jardinería y viveros» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Estilo: **garden** (tema
Garden de la skill Hallmark: papel de avena, tinta verde casi negra, Vollkorn con cifras de estilo antiguo, filetes finos,
lavados de musgo y una sola señal verde hoja). Todo en castellano de España, frases cortas, sin jerga, de tú. Brief de
diseño completo en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (fondo = papel de avena, texto = tinta verde, acento = verde hoja de botones, foco y barras del calendario, primario = banda de tinta verde de «Presupuesto» y del pie). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…). Los demás tonos (`--papel-2`, `--papel-3`, `--tinta-2`, `--apagado`, `--filete`, `--filete-2`, `--musgo`, `--barra`, `--acento-legible`, `--hoja-palida`, `--sobre-primario`, `--sobre-acento`, `--sobre-hoja-palida`) se derivan en `src/styles/global.css` con `color-mix()` y `oklch(from …)`: el texto sobre primario y sobre acento se elige solo (claro u oscuro). No pongas colores literales en componentes.
- **Tipografías**: Vollkorn 600 (titulares, nombres, precios y cifras), Hanken Grotesk 400/500 (texto, letra menuda y botones) y Newsreader 400 (pies de foto y notas, como la etiqueta de un vivero), alojadas en `public/fuentes/` (licencias en `public/fuentes/LICENCIAS.md`). No añadas fuentes ni servicios externos.
- **Aspecto general**: `src/styles/global.css` (bandas `.banda--papel|clara|musgo|tinta`, cabeza de sección con filete fino `.cabeza`, letra menuda `.menuda`, pie de foto `.pie-foto`, botón píldora verde hoja `.btn`, píldora de filete `.btn-sec`, enlace subrayado `.enlace`, foto con el tratamiento del tema `.foto` (radio de 4 px, filete fino), pozo plano `.pozo`, mitades a sangre `.mitades`). Sin sombras, sin degradados.
- **Bandas**: `src/components/ui/Banda.astro` pinta una sección de borde a borde con el contenido en `.contenedor` (90 rem, 16 px de margen en móvil).
- **Imágenes**: fotos en `public/fotos/` (se generan a partir de `fotos.json`); si una foto de `/fotos/` falta, `Imagen.astro` usa `/placeholders/<mismo nombre>.svg` si existe. En `site.yaml`, ruta absoluta (`/fotos/hero.jpg`). Personas: siempre `/placeholders/persona.svg`, nunca caras generadas.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = nombre en Vollkorn.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis). En móvil, barra fija abajo con «Llamar» y «Presupuesto» (WhatsApp, o el apartado de presupuesto, o el contacto).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → portada partida: texto a la izquierda (antetítulo, titular, frase, dos botones, `items` como datos cortos) y la foto de un jardín en siete columnas hasta el borde derecho, con `pie_foto` debajo. En móvil la foto va arriba.
- `servicios` → filas con filetes: nombre en Vollkorn (enlaza a su página si tiene `detalle`), línea y precio a la derecha; `nota` y `cta` debajo.
- `trabajos` → «Jardines hechos»: el primero a todo el ancho (21:9) y los demás de dos en dos (7 y 5 columnas), cada uno con su etiqueta (título, línea, lugar y superficie).
- `presupuesto` → banda de tinta verde: el titular como frase grande, entrada, botones (hoja pálida + filete) y `items` como pasos numerados.
- `vivero` → foto vertical fija al bajar y la planta de ahora agrupada por `categoria` en filas con filetes (nombre, nota, precio).
- `calendario` → «El año en el jardín» (banda de musgo): tabla de filetes con una fila por tarea y los doce meses en columnas; los meses de cada tarea, con una barra verde. Un script mínimo marca el mes en curso. En el móvil, un bloque por tarea con su tira de meses.
- `sobre` → foto a sangre a la izquierda y texto: «Desde» con el año en cifra grande, `declaracion`, párrafos y valores (`items`).
- `zonas` → banda clara partida: titular, texto y botón a la izquierda; los pueblos como índice de filas a la derecha (los que tienen página, enlazados).
- `opiniones` → la primera opinión como frase grande, las demás en columnas. Sin opiniones, no se pinta.
- `preguntas` → filas `details/summary`; sin preguntas no se pinta.
- `contacto` → vías grandes (teléfono, WhatsApp, email, dirección), el horario y el formulario en un pozo.
- `texto` → apartado genérico (`tipo: texto`), con foto a sangre si lleva `imagen`.

## Campos propios de esta plantilla (además del esquema común)
- `hero`: `cta` y `cta_secundario` (sin `cta` el botón llama; sin `cta_secundario`, «Cómo llegar»); `pie_foto` (una frase bajo la foto); `items` = datos cortos (solo `titulo`).
- `servicios.items` [{titulo, texto, precio, imagen, imagenes, detalle}]: `precio` SIEMPRE como cadena (`"desde 35 €/hora"`, `"Consultar"`); vacío = sin precio. `detalle` da página propia; `imagen` e `imagenes` salen solo en esa página. `nota`, `cta`.
- `trabajos.trabajos` [{titulo, texto, lugar, superficie, imagen}]: `lugar` con el nombre del pueblo (así el jardín sale también en la página de esa zona); `superficie` como cadena (`"420 m²"`), opcional. `cta` opcional.
- `presupuesto`: `items` [{titulo, texto}] (pasos), `cta` (sin él, WhatsApp o teléfono), `cta_secundario` (sin él, llamar), `nota`.
- `vivero`: `imagen`, `pie_foto`, `plantas` [{nombre, texto, precio, categoria}] (se agrupan por `categoria` en el orden en que aparecen), `nota`, `cta` (sin él, WhatsApp).
- `calendario.tareas` [{titulo, meses, texto}]: `meses` en texto libre («Noviembre a marzo», «Marzo y octubre», «Marzo a mayo y septiembre a octubre», «Todo el año»); lo que no se entiende no pinta barra, pero el texto sale igual.
- `sobre`: `desde` (año como cadena, `"1994"`; vacío = no sale), `declaracion`, `texto` (párrafos separados por una línea en blanco), `imagen`, `items` [{titulo, texto}].
- `zonas`: `items` [{titulo, texto}], `titulo_pagina` («Jardinería en {zona}»), `texto_pagina` (entrada común de las páginas de zona, con {zona} y {negocio}), `cta`.
- `opiniones.testimonios` [{texto, autor, nota}]: `nota` opcional (de dónde es). Sin estrellas ni notas.

## Reglas para órdenes
1. **Activar o quitar una sección**: cambia `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar secciones**: mueve el bloque dentro de `secciones:` en `site.yaml`. La cabecera es siempre sólida y va por encima: no depende del orden.
3. **Cambiar textos, servicios, jardines, planta, precios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas. Precios siempre entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Para agrupar la planta usa `categoria`; para varios meses, una cadena (`meses`). Máximo 24 elementos por lista.
5. **Nunca inventes** precios, cifras, años, superficies ni opiniones: si el cliente no los da, déjalos vacíos (los componentes lo soportan).
6. **Página nueva**: crea `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'` y `<Base titulo="…" descripcion="…">…</Base>`, con bandas como `src/pages/aviso-legal.astro`; enlázala en `site.yaml → menu`.
7. **Apartado nuevo**: añade `secciones.<id>` en `site.yaml` con `tipo:` = `texto`, `servicios`, `trabajos`, `vivero`, `calendario`… (el diseño que quiera reutilizar). `src/pages/index.astro` lo recoge solo; no lo toques.
8. **No tocar** `src/pages/index.astro`, `src/layouts/Base.astro`, `tailwind.config.mjs` ni `src/styles/comun.css` salvo orden explícita de diseño. Tampoco `src/lib/seo.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts`: son el SEO de base, salen solos de `site.yaml` y el fichero es el mismo en todas las plantillas. `seo.url` y `seo.indexable` los pone la plataforma: no los cambies.
9. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro` (carga diferida), sin JavaScript nuevo salvo necesidad real (solo hay el de la cabecera y el del calendario), bandas a todo el ancho, 16 px de margen lateral del texto, botones de 44 px de alto como mínimo, sin scroll horizontal en móvil, titulares sin palabras partidas (`overflow-wrap: normal`, `hyphens: manual`, tamaños limitados con `cqi` para que quepa una palabra de 20 letras). Imágenes de contenido con `alt` sacado del contenido (`altHero`, `altFicha`, `altGaleria`, `altSeccion` de `src/lib/seo.ts`); las decorativas, `alt=""`.
10. El formulario no tiene servidor: abre el correo (`mailto`) con el email de `site.yaml`. Para envío real, cambia `action` en `src/components/ui/FormularioContacto.astro`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas por elemento y páginas por zona)
- Listas con página propia (espejo de `fichas:` y `zonas:` de template.yaml en `src/data/fichas.ts`): `servicios.items` → `/servicios/<slug>/` y `zonas.items` → `/zonas/<slug>/`.
  **Solo los servicios con `detalle`** (texto largo, párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) y **las zonas con `texto`** tienen página;
  los demás siguen como hasta ahora. Campos opcionales del servicio: `slug` (si falta, sale del nombre; no lo pongas sin motivo)
  e `imagenes` («/fotos/a.jpg; /fotos/b.jpg», galería de la ficha; la foto principal es `imagen` o, si no hay, la primera de `imagenes`).
- Una orden «añade una página para el servicio X» = escribir su `detalle` en site.yaml; «añade una página para Calanda» = escribir el `texto` de esa zona (60-150 palabras, sin cifras que no dé el cliente). Nunca crees a mano páginas en
  `src/pages/servicios/` ni en `src/pages/zonas/`: salen solas de `src/pages/[coleccion]/[slug].astro` y `src/pages/zonas/[slug].astro`.
- No tocar `src/lib/paginas.ts`, `src/lib/slug.ts` ni `src/lib/seo.ts` (comunes a todas las plantillas). Las páginas propias entran solas en
  `sitemap.xml` y `llms.txt`, con su JSON-LD (migas y servicio, con precio si es un importe; en zonas, `areaServed`).

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "vivero; calendario" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Con ella la web pasa a Inicio (hero + lo que no esté en ninguna página) y una página por entrada (`/el-vivero/`…); el menú se hace solo con las páginas (las entradas `/#…` de `menu` no salen) y los enlaces `/#id` del site.yaml se cambian solos por la dirección de su sección. Sin ella, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`; nunca crees páginas a mano para eso.
- No tocar `src/lib/multipagina.ts`, `src/pages/index.astro` ni `src/pages/[...pagina].astro` (comunes a todas las plantillas). En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
