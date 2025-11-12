# Solución de Problemas - Integración Stripe

## Error: "Unexpected token '<'"

Este error ocurre cuando la función de Netlify no está disponible o devuelve HTML en lugar de JSON.

### Soluciones:

#### 1. Si estás en desarrollo local:

**Problema**: Estás usando `jekyll serve` en lugar de `netlify dev`.

**Solución**:
```bash
# Detén el servidor de Jekyll si está corriendo
# Luego ejecuta:
netlify dev
```

Esto iniciará tanto Jekyll como las funciones de Netlify.

#### 2. Si estás en producción (Netlify):

**Problema**: La función no está desplegada o la variable de entorno no está configurada.

**Soluciones**:
1. Verifica que la función esté en `netlify/functions/create-checkout-session.js`
2. Verifica que `netlify.toml` tenga `functions = "netlify/functions"`
3. Verifica que `STRIPE_SECRET_KEY` esté configurada en Netlify:
   - Ve a Netlify Dashboard → Site settings → Environment variables
   - Asegúrate de que `STRIPE_SECRET_KEY` esté configurada
4. Redespliega el sitio después de hacer cambios

#### 3. Verificar que la función funciona:

**En desarrollo local**:
```bash
# Inicia netlify dev
netlify dev

# En otra terminal, prueba la función:
curl -X POST http://localhost:8888/.netlify/functions/create-checkout-session \
  -H "Content-Type: application/json" \
  -d '{"amount": 65, "type": "full", "numPersons": 1, "email": "test@test.com", "name": "Test"}'
```

Deberías recibir un JSON con `sessionId` y `url`.

**En producción**:
Reemplaza `localhost:8888` con tu dominio de Netlify.

## Error: "La clave de Stripe no está configurada"

**Solución**:
1. Verifica que el archivo `.env` existe en la raíz del proyecto (solo para desarrollo local)
2. Verifica que contiene: `STRIPE_SECRET_KEY=sk_live_...`
3. Si estás en producción, verifica en Netlify Dashboard que la variable esté configurada

## La función devuelve 404

**Causas posibles**:
1. La función no está en la ruta correcta: `netlify/functions/create-checkout-session.js`
2. El archivo no tiene la extensión `.js`
3. La función no exporta `handler` correctamente

**Verificación**:
```bash
# Verifica que el archivo existe
ls -la netlify/functions/create-checkout-session.js

# Verifica el contenido (debe tener exports.handler)
head -5 netlify/functions/create-checkout-session.js
```

## La función no encuentra el módulo 'stripe'

**Solución**:
```bash
# Instala las dependencias
npm install

# Verifica que stripe esté en package.json
grep stripe package.json
```

## Otros problemas comunes

### El precio no se calcula correctamente

Edita `PRICE_PER_PERSON` en `menu-nadal.html` (línea ~325):
```javascript
const PRICE_PER_PERSON = 65; // Cambia este valor
```

### Los mensajes de error no se muestran

Abre la consola del navegador (F12) para ver los errores detallados.

### El pago se procesa pero no redirige

Verifica que las URLs de éxito/cancelación en la función sean correctas. Deben apuntar a tu dominio.

