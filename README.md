# Plantilla NoExpertise · Jardinería y viveros

Web de cuaderno de campo para empresas de jardinería y paisajismo, jardineros autónomos y viveros: jardines hechos en fotos grandes, servicios con precio, la planta que hay ahora en el vivero, qué se hace en cada época, dónde trabajan y pedir presupuesto o visita.

- Sectores: jardineria, vivero, jardinero, mantenimiento-jardines. Estilo: garden (tema Garden de Hallmark). Plan mínimo: gratis. Orden 830.
- Secciones: hero, servicios, trabajos, presupuesto, vivero, calendario, sobre, zonas, opiniones, preguntas, contacto (y `texto` para apartados nuevos).
- Diseño a ancho completo: portada partida con la foto del jardín hasta el borde, servicios en filas con filetes y precio a la derecha, los jardines hechos como escaparate (el primero a todo el ancho), la banda de tinta verde para pedir presupuesto con los pasos numerados, el vivero con la foto fija y la lista de planta por grupos, «el año en el jardín» como tabla de doce meses con barras verdes, quiénes somos con el año en cifra grande, el índice de pueblos y pie con el nombre como mástil. Vollkorn, Hanken Grotesk y Newsreader alojadas en `public/fuentes/` (OFL). Detalle en `DISEÑO.md`.
- Ejemplo: Guadalope Jardín y Vivero, jardinería y vivero ficticios en Alcañiz (Teruel).
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD (`HomeAndConstructionBusiness`) y preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Páginas propias: cada servicio con `detalle` tiene su página en `/servicios/<slug>/` y cada zona con `texto`, en `/zonas/<slug>/` («Jardinería en Calanda») (`fichas:` y `zonas:` en `template.yaml`, espejo en `src/data/fichas.ts`).
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas` (Servicios, Jardines hechos, El vivero, Zonas y contacto). Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente (13 pasos) en `template.yaml`; reglas para el agente en `CLAUDE.md`; fotos a generar en `fotos.json` (11).

## Campos propios

| Sección | Campos |
|---|---|
| `hero` | `cta`, `cta_secundario`, `pie_foto` (bajo la foto), `items` [{titulo}] (datos cortos bajo los botones) |
| `servicios` | `items` [{titulo, texto, precio, imagen, imagenes, detalle, slug}], `nota`, `cta` |
| `trabajos` | `trabajos` [{titulo, texto, lugar, superficie, imagen}], `cta` |
| `presupuesto` | `items` [{titulo, texto}] (pasos), `cta`, `cta_secundario`, `nota` |
| `vivero` | `imagen`, `pie_foto`, `plantas` [{nombre, texto, precio, categoria}], `nota`, `cta` |
| `calendario` | `tareas` [{titulo, meses, texto}] |
| `sobre` | `desde` (año, cifra grande), `declaracion`, `texto`, `imagen`, `items` [{titulo, texto}] |
| `zonas` | `items` [{titulo, texto}], `titulo_pagina`, `texto_pagina`, `cta` |
| `opiniones` | `testimonios` [{texto, autor, nota}] |
| `preguntas` | `preguntas` [{pregunta, respuesta}] |

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Fuentes con licencia SIL Open Font License 1.1 (`public/fuentes/LICENCIAS.md`). Fotos generadas con IA para esta plantilla (`fotos.json`), sin personas reconocibles.

## Páginas propias

- Campos opcionales de los servicios con ficha: `detalle` (párrafos separados por una línea en blanco), `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»). Zonas: `texto` (60-150 palabras) e `imagen` opcional.
