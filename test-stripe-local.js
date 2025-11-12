/**
 * Servidor local de prueba para funciones de Stripe
 * Ejecuta: node test-stripe-local.js
 * Luego usa jekyll serve normalmente
 * 
 * Este servidor simula la función de Netlify localmente para pruebas
 */

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Cargar variables de entorno desde .env si existe
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      if (key && valueParts.length > 0) {
        const value = valueParts.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = value;
        }
      }
    }
  });
}

const PORT = 3001;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

if (!STRIPE_SECRET_KEY) {
  console.error('❌ Error: STRIPE_SECRET_KEY no está configurada');
  console.log('💡 Crea un archivo .env con: STRIPE_SECRET_KEY=sk_live_...');
  console.log('💡 O ejecuta: export STRIPE_SECRET_KEY=sk_live_...');
  process.exit(1);
}

const stripe = require('stripe')(STRIPE_SECRET_KEY);

const server = http.createServer(async (req, res) => {
  // Configurar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  // Manejar preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Solo permitir POST
  if (req.method !== 'POST') {
    res.writeHead(405);
    res.end(JSON.stringify({ error: 'Method not allowed' }));
    return;
  }

  // Leer el body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    try {
      const { amount, type, numPersons, email, name } = JSON.parse(body);

      // Validar datos
      if (!amount || !type || !numPersons) {
        res.writeHead(400);
        res.end(JSON.stringify({ error: 'Missing required fields' }));
        return;
      }

      // Calcular el precio (en céntimos)
      const amountInCents = Math.round(amount * 100);

      // Determinar el tipo de pago
      const paymentType = type === 'deposit' ? 'señal' : 'pago completo';
      const paymentDescription = type === 'deposit' 
        ? `Señal para Menú de Navidad - ${numPersons} persona(s)`
        : `Pago completo Menú de Navidad - ${numPersons} persona(s)`;

      console.log(`💳 Creando sesión de checkout: ${paymentDescription} - €${amount.toFixed(2)}`);

      // Crear la sesión de checkout
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'Menú de Navidad - L\'Entrepreneur',
                description: paymentDescription,
              },
              unit_amount: amountInCents,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `http://localhost:4000/menu-nadal?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `http://localhost:4000/menu-nadal?canceled=true`,
        customer_email: email || undefined,
        metadata: {
          payment_type: paymentType,
          num_persons: numPersons.toString(),
          customer_name: name || '',
        },
      });

      console.log(`✅ Sesión creada: ${session.id}`);
      console.log(`🔗 URL: ${session.url}`);

      res.writeHead(200);
      res.end(JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      }));
    } catch (error) {
      console.error('❌ Error:', error.message);
      res.writeHead(500);
      res.end(JSON.stringify({ 
        error: 'Error creating checkout session',
        message: error.message 
      }));
    }
  });
});

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 Servidor local de funciones Stripe iniciado');
  console.log(`📍 Escuchando en: http://localhost:${PORT}`);
  console.log(`💡 Ahora puedes ejecutar: bundle exec jekyll serve`);
  console.log(`💡 La función estará disponible en: http://localhost:${PORT}/.netlify/functions/create-checkout-session`);
  console.log('');
});

