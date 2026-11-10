// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
/** Elemento genérico de lista. En `servicios` lleva además `precio`, `detalle`, `imagen` e `imagenes` (ficha propia). */
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; precio?: string; [campo: string]: unknown }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (de dónde viene: «Google», el pueblo…). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Jardín hecho (trabajos.trabajos). `lugar` enlaza con las páginas de zona; `superficie` es opcional. */
export interface Trabajo { titulo: string; texto: string; lugar: string; superficie: string; imagen: string; [campo: string]: unknown }
/** Planta o producto del vivero (vivero.plantas). `categoria` agrupa; `precio` siempre como cadena. */
export interface Planta { nombre: string; texto: string; precio: string; categoria: string }
/** Tarea del año en el jardín (calendario.tareas). `meses`: «noviembre a febrero», «marzo; abril; octubre»… */
export interface Tarea { titulo: string; meses: string; texto: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace | null;
  cta_secundario?: Enlace | null;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  /** trabajos */
  trabajos: Trabajo[];
  /** vivero */
  plantas: Planta[];
  /** calendario */
  tareas: Tarea[];
  nota?: string;
  /** sobre */
  declaracion?: string;
  desde?: string;
  /** hero */
  pie_foto?: string;
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    // Los items conservan sus campos (detalle, imagenes, slug…): src/lib/paginas.ts los reconoce por identidad.
    items: lista<Crudo>(s.items).filter((i) => texto(i.titulo) || texto(i.texto)).map((i) => ({ ...i, titulo: texto(i.titulo), texto: texto(i.texto) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    trabajos: lista<Crudo>(s.trabajos)
      .filter((t) => texto(t.titulo) || texto(t.imagen))
      .map((t) => ({ ...t, titulo: texto(t.titulo), texto: texto(t.texto), lugar: texto(t.lugar), superficie: texto(t.superficie), imagen: texto(t.imagen) })),
    plantas: lista<Crudo>(s.plantas)
      .filter((p) => texto(p.nombre))
      .map((p) => ({ nombre: texto(p.nombre), texto: texto(p.texto), precio: texto(p.precio), categoria: texto(p.categoria) })),
    tareas: lista<Crudo>(s.tareas)
      .filter((t) => texto(t.titulo))
      .map((t) => ({ titulo: texto(t.titulo), meses: texto(t.meses), texto: texto(t.texto) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi jardinería',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#13331b', acento: '#1f6a19', fondo: '#f7f1df', texto: '#0f2a18', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'HomeAndConstructionBusiness',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? (d.boton_cabecera as Enlace) : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Agrupa una lista por un campo escalar (p. ej. `categoria`), respetando el orden en que aparece cada grupo. */
export function agrupar<T>(items: T[], campo: (x: T) => string | undefined): { grupo: string; items: T[] }[] {
  const grupos: { grupo: string; items: T[] }[] = [];
  for (const it of items) {
    const g = (campo(it) ?? '').trim();
    let destino = grupos.find((x) => x.grupo === g);
    if (!destino) grupos.push((destino = { grupo: g, items: [] }));
    destino.items.push(it);
  }
  return grupos;
}

/** Los doce meses (para el calendario del jardín). */
export const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const sinTildes = (t: string) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const indiceMes = (t: string): number => {
  const p = sinTildes(t).replace(/[^a-z]/g, '');
  if (p.length < 3) return -1;
  const k = p.startsWith('set') ? 'sep' : p.slice(0, 3);
  return MESES.findIndex((m) => m.startsWith(k));
};
/**
 * Meses en los que se hace una tarea, a partir de lo que escribe el cliente: «noviembre a febrero», «de marzo a mayo y
 * octubre», «ene; feb; dic», «todo el año». Devuelve los índices (0 = enero). Lo que no entiende, lo ignora.
 */
export function mesesDe(t: string): number[] {
  const limpio = sinTildes(t);
  if (/todo el ano|cada mes|todos los meses/.test(limpio)) return MESES.map((_, i) => i);
  const meses = new Set<number>();
  for (const trozo of limpio.split(/[;,/]|\s+y\s+|\s+e\s+/)) {
    const rango = trozo.trim().replace(/^(de|desde)\s+/, '').split(/\s+(?:a|hasta|al)\s+|\s*[-–]\s*/);
    const a = indiceMes(rango[0] ?? '');
    if (a < 0) continue;
    const b = rango.length > 1 ? indiceMes(rango[rango.length - 1]) : a;
    if (b < 0) { meses.add(a); continue; }
    for (let i = a; ; i = (i + 1) % 12) { meses.add(i); if (i === b) break; }
  }
  return [...meses].sort((x, y) => x - y);
}

export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Atributos para un enlace que puede salir de la web (abre en otra pestaña). */
export const fuera = (u?: string): Record<string, string> => (externo(u) ? { rel: 'noopener', target: '_blank' } : {});
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
