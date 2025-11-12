# Configuración para Desarrollo Local con Jekyll Serve

Esta guía explica cómo configurar el proyecto para usar `jekyll serve` en local mientras las funciones de Netlify se ejecutan en producción.

## Configuración Rápida

### 1. Obtener la URL de tu sitio en Netlify

Tu sitio en Netlify tiene una URL como: `https://tu-sitio.netlify.app`

Puedes encontrarla:
- En el dashboard de Netlify → Tu sitio → Overview → Site details
- O ejecutando: `netlify status` (si tienes Netlify CLI)

### 2. Configurar la URL en `_config.yml`

Edita `_config.yml` y añade tu URL de Netlify:

```yaml
netlify:
  site_url: "https://tu-sitio.netlify.app"
```

**Ejemplo:**
```yaml
netlify:
  site_url: "https://entrepreneur-restaurant.netlify.app"
```

### 3. Usar Jekyll Serve

Ahora puedes usar `jekyll serve` normalmente:

```bash
bundle exec jekyll serve --livereload
```

Cuando estés en `http://localhost:4000`, el código detectará automáticamente que estás en localhost y usará la función desplegada en Netlify.

## Cómo Funciona

- **En localhost** (`jekyll serve`): El código detecta que estás en localhost y llama a la función en tu sitio de Netlify (producción)
- **En Netlify** (producción): El código usa la función localmente (mismo dominio)

## Ventajas

✅ Puedes usar `jekyll serve` como siempre  
✅ No necesitas `netlify dev`  
✅ Las funciones usan la variable de entorno configurada en Netlify  
✅ Funciona igual en producción  

## Notas

- Asegúrate de que la función esté desplegada en Netlify antes de probar
- La variable de entorno `STRIPE_SECRET_KEY` debe estar configurada en Netlify
- Los cambios en las funciones requieren un nuevo deploy a Netlify

## Solución de Problemas

### Error: "No se ha configurado la URL de Netlify"

Añade `netlify.site_url` en `_config.yml` con la URL de tu sitio.

### Error: CORS o la función no responde

Verifica que:
1. La función esté desplegada en Netlify
2. La URL en `_config.yml` sea correcta
3. La variable de entorno `STRIPE_SECRET_KEY` esté configurada en Netlify

