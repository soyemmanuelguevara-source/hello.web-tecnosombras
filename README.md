# Brief de Proyecto — TecnoSombras

Este documento es el informe de contexto para el desarrollo del sitio web de **TecnoSombras**. El desarrollador trabajará sobre una plantilla base de HTML ya existente y cuenta además con un prompt inicial para adaptarla al negocio. Este README complementa ese prompt con la información del negocio, el branding y los requisitos visuales que debe cumplir el resultado final.

**Tipo de proyecto:** Landing page.

---

## 1. Información del Negocio

Datos extraídos del material proporcionado en la carpeta `imagenes/`:

| Dato | Detalle |
|---|---|
| Nombre del negocio | TecnoSombras |
| Rubro | Diseño, confección e instalación de malla sombra, pérgolas de madera y estructuras metálicas |
| Servicios | Malla sombra (diseño, confección e instalación) · Pérgolas en madera · Estructuras metálicas |
| Aplicaciones / dónde se instala | Centros comerciales, estacionamientos, garajes, patios, jardines, albercas y áreas al exterior |
| WhatsApp | 833 109 8740 |
| Correo electrónico | tecnosombrastampico@gmail.com |
| Ubicación | Tampico, Tamaulipas, México (inferido del correo y de la lada telefónica 833; no se encontró una dirección física exacta en el material fuente) |
| Horario de atención | No se encontró esta información en el material proporcionado — confirmar con el cliente si se desea mostrar en el sitio |

---

## 2. Branding

Paleta extraída directamente del logo (`imagenes/logo.jpeg`):

| Color | HEX | Uso sugerido |
|---|---|---|
| Azul marino oscuro | `#161D25` | Color base / fondo |
| Rojo corporativo | `#D62328` | Acento principal, CTAs, elementos destacados |
| Dorado sol | `#F0B31C` | Acento secundario, detalles, hover states |
| Gris azulado | `#6B7A8D` | Texto secundario |
| Blanco | `#FFFFFF` | Texto y elementos sobre fondo oscuro |

**Tipografía sugerida:** el logo usa una tipografía sans-serif geométrica y muy bold en "TECNO SOMBRAS". Se recomienda replicar esa fuerza en los títulos con una fuente sans-serif bold/condensada (por ejemplo Montserrat, Poppins o Archivo en pesos Bold/Black) y una fuente sans-serif limpia para el texto de cuerpo (por ejemplo Inter, Work Sans o Roboto).

**Identidad visual:** el logo combina un sol estilizado (calidez, protección solar) con una vela/gallardete rojo en movimiento, sobre fondo azul marino oscuro casi negro. Esta dualidad "sol + sombra / tecnología + protección" debe guiar el tono visual del sitio: técnico, confiable y moderno, no artesanal ni rústico.

---

## 3. Estilo Visual Obligatorio

El sitio debe manejar:

- Estilo **premium, enterprise y corporativo de marca**.
- Nivel **big tech**: elegante y a la vez minimalista.

---

## 4. Efectos y Animaciones Requeridos

- Efectos visuales y animaciones activadas por scroll.
- Pantalla de carga (**preloader**) con spinner + logo del negocio.
- Animación en el título del hero: efecto máquina de escribir, cambio de color en las letras u otro efecto tipográfico dinámico.

---

## 5. Assets Disponibles (`imagenes/`)

- **Logo** (`logo.jpeg`): viene **con fondo** (azul marino). Se debe **remover el fondo** y exportar en PNG transparente antes de usarlo en el sitio.
- **Fotografías reales de proyectos instalados**: pérgolas con malla sombra, pérgolas de madera con estructura metálica, estructuras metálicas modernas, toldos tipo vela, cocheras residenciales e instalaciones comerciales de gran formato. Son material real de la marca y deben priorizarse como contenido visual del sitio.
- **Videos** (`.mp4`): grabaciones de instalaciones reales, disponibles como recurso audiovisual adicional si la plantilla lo permite.
- **Nota:** una de las imágenes de la carpeta trae una marca de agua de otra empresa ("DM MallaSombra Group"). Esa imagen es solo una referencia de tipo de estructura y **no debe usarse** como contenido final del sitio ni atribuirse a TecnoSombras.

---

## 6. Nota para el Desarrollador

Puedes iterar sobre el proyecto con Claude Code, dándole instrucciones las veces que sea necesario hasta lograr el resultado deseado. No hace falta acertar todo desde la primera iteración.

---

## Checklist

- [ ] Remover el fondo del logo (`logo.jpeg`) y exportarlo en PNG transparente
- [ ] Aplicar la paleta de colores de marca (sección 2) en la plantilla base
- [ ] Definir e implementar la tipografía sugerida (headings bold/geométrica + cuerpo limpio)
- [ ] Cargar los datos de contacto reales: WhatsApp (833 109 8740) y correo (tecnosombrastampico@gmail.com)
- [ ] Confirmar con el cliente la dirección física y el horario de atención (no incluidos en el material fuente)
- [ ] Aplicar el estilo visual premium / enterprise / minimalista en toda la plantilla
- [ ] Implementar el preloader con spinner + logo
- [ ] Implementar las animaciones/efectos de scroll
- [ ] Implementar la animación tipográfica del título del hero
- [ ] Incorporar las fotografías y videos reales de proyectos como material visual (excluyendo la imagen con marca de agua de terceros)
- [ ] Validar responsividad (mobile/desktop) y velocidad de carga
- [ ] Iterar con Claude Code hasta cumplir con todos los puntos anteriores
