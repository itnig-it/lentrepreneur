# Guía para Pruebas Locales sin Desplegar

Esta guía explica cómo probar la integración de Stripe en local **sin necesidad de desplegar a Netlify**.

## Opción 1: Servidor Local de Prueba (Recomendado)

### Paso 1: Iniciar el servidor local de funciones

En una terminal, ejecuta:

```bash
npm run test:stripe
```

O directamente:

```bash
node test-stripe-local.js
```

Verás algo como:
```
🚀 Servidor local de funciones Stripe iniciado
📍 Escuchando en: http://localhost:3001
💡 Ahora puedes ejecutar: bundle exec jekyll serve
```

### Paso 2: Iniciar Jekyll (en otra terminal)

En otra terminal, ejecuta:

```bash
bundle exec jekyll serve --livereload
```

### Paso 3: Probar

1. Ve a `http://localhost:4000/menu-nadal`
2. Completa el formulario de pago
3. El código detectará automáticamente el servidor local y lo usará
4. Verás los logs en la terminal donde corre `test-stripe-local.js`

## Cómo Funciona

- El código detecta que estás en `localhost:4000`
- Busca el servidor local en `localhost:3001`
- Si lo encuentra, lo usa para crear las sesiones de Stripe
- **Usa tu clave real de Stripe** (desde `.env` o variable de entorno)
- Los pagos son reales (usa tu clave de producción)

## Configuración de la Clave de Stripe

El servidor local necesita tu clave secreta de Stripe. Tienes dos opciones:

### Opción A: Archivo .env (ya configurado)

El archivo `.env` ya existe con tu clave. El servidor la cargará automáticamente.

### Opción B: Variable de entorno

```bash
export STRIPE_SECRET_KEY=sk_live_...
node test-stripe-local.js
```

## Ventajas de esta Solución

✅ **No necesitas desplegar** - Todo funciona localmente  
✅ **Usa tu clave real** - Los pagos son reales (cuidado en pruebas)  
✅ **Logs en tiempo real** - Ves qué está pasando  
✅ **Fácil de depurar** - Puedes añadir console.logs  
✅ **Jekyll serve normal** - No necesitas netlify dev  

## Notas Importantes

⚠️ **Los pagos son REALES** - Usa tarjetas de prueba de Stripe:
- Tarjeta: `4242 4242 4242 4242`
- Fecha: Cualquier fecha futura
- CVC: Cualquier 3 dígitos

⚠️ **El servidor local debe estar corriendo** - Si no, verás un error

## Solución de Problemas

### Error: "STRIPE_SECRET_KEY no está configurada"

Verifica que el archivo `.env` existe y contiene:
```
STRIPE_SECRET_KEY=sk_live_...
```

### Error: "Failed to fetch" o CORS

Asegúrate de que:
1. El servidor local está corriendo en el puerto 3001
2. No hay firewall bloqueando el puerto
3. Estás accediendo desde `localhost:4000` (no 127.0.0.1)

### El servidor no responde

Verifica en la terminal del servidor local que veas los logs cuando haces una petición.

## Cuando Estés Listo para Producción

1. Haz commit y push a GitHub
2. Netlify desplegará automáticamente
3. La función estará disponible en producción
4. El código detectará automáticamente que estás en Netlify y usará la función desplegada

