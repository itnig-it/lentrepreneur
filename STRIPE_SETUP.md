# Configuración de Stripe para el Menú de Navidad

Esta guía explica cómo configurar la pasarela de pago Stripe para el menú de Navidad.

## Requisitos Previos

1. Una cuenta de Stripe (https://stripe.com)
2. Acceso al panel de Netlify para configurar variables de entorno

## ⚠️ IMPORTANTE: Seguridad

**NUNCA** subas tu clave secreta de Stripe al repositorio. El archivo `.env` está en `.gitignore` y no se subirá. Si accidentalmente subes una clave, revócala inmediatamente en el dashboard de Stripe.

## Pasos de Configuración

### 1. Obtener las Claves de API de Stripe

1. Inicia sesión en tu cuenta de Stripe
2. Ve a **Developers** > **API keys**
3. Copia tu **Secret key** (clave secreta)
   - Para pruebas: usa la clave de **Test mode**
   - Para producción: usa la clave de **Live mode**

### 2. Configurar Variables de Entorno en Netlify

1. Ve a tu proyecto en Netlify
2. Navega a **Site settings** > **Environment variables**
3. Añade la siguiente variable:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: Tu clave secreta de Stripe (empieza con `sk_`)
   - **Scopes**: Selecciona los entornos donde quieres que esté disponible (Production, Deploy previews, Branch deploys)

### 3. Instalar Dependencias

Las dependencias de Node.js se instalarán automáticamente durante el build. Asegúrate de que `stripe` esté en el `package.json` (ya está incluido).

### 4. Configuración para Desarrollo Local

Para probar las funciones de Netlify localmente:

1. **Instalar Netlify CLI** (si no lo tienes):
   ```bash
   npm install -g netlify-cli
   ```

2. **Crear archivo `.env` en la raíz del proyecto**:
   ```bash
   # En la raíz del proyecto, crea un archivo .env con:
   STRIPE_SECRET_KEY=sk_live_tu_clave_secreta_aqui
   ```
   
   ⚠️ **Este archivo NO se subirá al repositorio** (está en `.gitignore`)

3. **Iniciar Netlify Dev**:
   ```bash
   netlify dev
   ```
   
   Esto iniciará el servidor local con las funciones de Netlify y cargará las variables de entorno desde `.env`.

4. **Probar localmente**:
   - El sitio estará disponible en `http://localhost:8888`
   - Las funciones estarán en `http://localhost:8888/.netlify/functions/create-checkout-session`

### 5. Configurar el Precio del Menú

El precio por persona está configurado en `menu-nadal.html` en la constante `PRICE_PER_PERSON`. Actualmente está configurado a 65€ por persona. Puedes cambiarlo editando esta línea:

```javascript
const PRICE_PER_PERSON = 65; // Precio por persona en euros
```

### 6. Probar la Integración

#### Modo de Prueba (Test Mode)

1. Usa las claves de API de test mode en Netlify
2. Usa las tarjetas de prueba de Stripe:
   - **Tarjeta exitosa**: `4242 4242 4242 4242`
   - **Cualquier fecha futura**: `12/34`
   - **Cualquier CVC**: `123`
   - **Cualquier código postal**: `12345`

#### Modo de Producción

1. Cambia a las claves de API de live mode
2. Los pagos reales se procesarán automáticamente

## Funcionalidades

- **Pago completo**: El cliente paga el 100% del menú
- **Señal (30%)**: El cliente paga un 30% como depósito para confirmar la reserva
- **Cálculo automático**: Los precios se calculan automáticamente según el número de personas
- **Confirmación por email**: Stripe envía automáticamente un email de confirmación al cliente

## Estructura de Archivos

- `netlify/functions/create-checkout-session.js`: Función serverless que crea la sesión de checkout de Stripe
- `menu-nadal.html`: Página del menú con el formulario de pago integrado

## Notas Importantes

- Los pagos se procesan a través de Stripe Checkout, que es seguro y cumple con PCI DSS
- Los datos de tarjeta nunca pasan por tu servidor
- Stripe cobra una comisión por transacción (consulta sus tarifas actuales)
- Los emails de confirmación se envían automáticamente desde Stripe

## Soporte

Si tienes problemas con la configuración:
1. Verifica que la variable de entorno `STRIPE_SECRET_KEY` esté correctamente configurada en Netlify
2. Revisa los logs de Netlify Functions en el dashboard de Netlify
3. Consulta la documentación de Stripe: https://stripe.com/docs

