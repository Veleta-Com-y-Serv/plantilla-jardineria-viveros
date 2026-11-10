// Páginas propias de esta plantilla (NoExpertise): espejo de `fichas:` y `zonas:` de template.yaml.
// Cada servicio con `detalle` tiene su página en /servicios/<slug>/ (src/pages/[coleccion]/[slug].astro) y cada zona
// con `texto`, la suya en /zonas/<slug>/ (src/pages/zonas/[slug].astro).
import type { DefFicha, DefZonas } from '../lib/paginas';

export const FICHAS: DefFicha[] = [
  { lista: 'servicios', campo: 'items', ruta: 'servicios', nombre: 'Servicio', tipo: 'Service' },
];

export const ZONAS: DefZonas | null = { ruta: 'zonas' };
