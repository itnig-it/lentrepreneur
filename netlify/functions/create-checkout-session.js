const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Headers CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  // Manejar preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Solo permitir POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { amount, type, numPersons, email, name } = JSON.parse(event.body);

    // Validar que STRIPE_SECRET_KEY esté configurada
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY no está configurada');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Configuración del servidor incompleta',
          message: 'La clave de Stripe no está configurada'
        })
      };
    }

    // Validar datos
    if (!amount || !type || !numPersons) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Calcular el precio (en céntimos)
    const amountInCents = Math.round(amount * 100);

    // Determinar el tipo de pago
    const paymentType = type === 'deposit' ? 'señal' : 'pago completo';
    const paymentDescription = type === 'deposit' 
      ? `Señal para Menú de Navidad - ${numPersons} persona(s)`
      : `Pago completo Menú de Navidad - ${numPersons} persona(s)`;

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
      success_url: `${event.headers.origin || event.headers.referer}/menu-nadal?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${event.headers.origin || event.headers.referer}/menu-nadal?canceled=true`,
      customer_email: email || undefined,
      metadata: {
        payment_type: paymentType,
        num_persons: numPersons.toString(),
        customer_name: name || '',
      },
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        sessionId: session.id,
        url: session.url 
      })
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Error creating checkout session',
        message: error.message 
      })
    };
  }
};

