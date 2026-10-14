# Entre Vórtice

Landing page corporativa de una Oficina de Transformación Empresarial. La web está diseñada como una one page para presentar la propuesta de valor, explicar la metodología APII, mostrar los perfiles de clientes y facilitar una primera conversación comercial.

## Tecnologías

- HTML5 semántico
- CSS3 moderno con variables y diseño responsive
- JavaScript ligero para navegación, validación del formulario y microinteracciones
- Fuentes de Google Fonts (Inter + Manrope)

## Requisitos

- Navegador moderno
- Servidor local para pruebas (por ejemplo, Python o cualquier servidor estático)

## Instalación

1. Clona o descarga este proyecto.
2. Abre la carpeta del proyecto.
3. Ejecuta un servidor local:

```bash
cd /ruta/al/proyecto
python3 -m http.server 8000
```

4. Abre la URL en tu navegador:

```text
http://localhost:8000
```

## Build de producción

No requiere compilación. El proyecto se entrega como sitio estático listo para desplegar en un host estático.

## Estructura de carpetas

```text
.
├── index.html
├── styles.css
├── script.js
├── README.md
├── .github/
│   └── copilot-instructions.md
└── assets/ (opcional para futuros recursos visuales)
```

## Cómo modificar textos

Los textos principales están en `index.html` dentro de cada sección. Si es necesario actualizar copy, conviene mantener el mismo orden de secciones y el mismo estilo semántico.

## Cómo cambiar colores

El sistema de diseño centraliza los colores en `:root` dentro de `styles.css`.

```css
:root {
  --primary: #d53b35;
  --black: #111111;
  --surface: #ffffff;
  --text: #171717;
}
```

## Cómo sustituir el logotipo

La marca se integra con los archivos oficiales entregados en `assets/`:

- `logo01.png` para la versión principal en fondo claro.
- `logo05.png` para la versión principal en fondo oscuro.
- `isologo.png` y variantes para usos iconográficos o futuros recursos visuales.

Mantén las proporciones originales y evita deformaciones.

## Cómo configurar el formulario

En `script.js` existe el objeto `siteConfig`:

```js
const siteConfig = {
  contactEmail: 'info@entrevortice.com',
  whatsappNumber: '584142136222',
  instagramUrl: 'https://instagram.com/entrevortice',
  domain: 'https://entrevortice.com'
};
```

- El formulario usa este email para crear un `mailto:` con la consulta.
- El enlace de WhatsApp se activa con el número oficial.
- La web incluye el dominio oficial y la URL de Instagram configurados.

## Cómo agregar redes sociales

El footer incluye actualmente los enlaces oficiales confirmados:

- Instagram: `https://instagram.com/entrevortice`
- WhatsApp: `https://wa.me/584142136222`
- Correo: `info@entrevortice.com`

## Cómo configurar el dominio

El sitio está preparado para desplegarse en `https://entrevortice.com` y la metadata SEO ya incluye la URL canónica oficial.

## Cómo desplegar la web

Se puede desplegar en:

- Netlify
- Vercel
- GitHub Pages
- cualquier hosting estático compatible con HTML/CSS/JS

## Configuración legal y de publicación

Antes de la publicación final se recomienda confirmar:

- política de privacidad,
- aviso legal,
- perfiles sociales adicionales si se incorporan más canales,
- y cualquier enlace corporativo que se quiera enlazar desde la web.

La información oficial ya confirmada por el usuario está integrada en la página.
