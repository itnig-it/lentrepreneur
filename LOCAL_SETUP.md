# Configuración para Desarrollo Local

## Requisitos

- Node.js instalado
- Netlify CLI instalado: `npm install -g netlify-cli`

## Pasos para Desarrollo Local

### 1. Crear archivo `.env`

En la raíz del proyecto, crea un archivo `.env` con tu clave secreta de Stripe:

```bash
STRIPE_SECRET_KEY=sk_live_tu_clave_secreta_aqui
```

⚠️ **IMPORTANTE**: Este archivo está en `.gitignore` y NO se subirá al repositorio.

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar Netlify Dev

```bash
netlify dev
```

Esto iniciará:
- El servidor de Jekyll
- Las funciones de Netlify (con acceso a las variables de entorno)
- El sitio estará disponible en `http://localhost:8888`

### 4. Probar el flujo de pago

1. Ve a `http://localhost:8888/menu-nadal`
2. Completa el formulario de pago
3. Usa una tarjeta de prueba de Stripe:
   - **Tarjeta**: `4242 4242 4242 4242`
   - **Fecha**: Cualquier fecha futura (ej: `12/34`)
   - **CVC**: Cualquier 3 dígitos (ej: `123`)
   - **Código postal**: Cualquier código (ej: `12345`)

### 5. Ver logs

Los logs de las funciones aparecerán en la terminal donde ejecutaste `netlify dev`.

## Notas

- Las funciones de Netlify se ejecutan localmente pero usan tu clave de Stripe real
- Los pagos de prueba funcionarán igual que en producción
- Si necesitas cambiar el precio, edita `PRICE_PER_PERSON` en `menu-nadal.html`

