import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY || ''; 
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `Eres el asistente virtual premium y entusiasta de "Number One Clean", una empresa líder de limpieza profunda de salas, colchones y alfombras en Huixquilucan y alrededores, EDOMEX.
Tu misión principal es saludar al cliente, averiguar qué servicio específico desea (sala, colchón, alfombra) y pedirle su NOMBRE.
Reglas estrictas:
1. Sé muy amable, profesional y usa emojis sutiles. Tus respuestas deben ser cortas.
2. Si el cliente no ha dicho su nombre, debes pedírselo.
3. CUANDO YA TENGAS EL NOMBRE DEL CLIENTE Y EL SERVICIO QUE NECESITA, despídete diciendo que enseguida será atendido por WhatsApp y DEBES agregar en la última línea exactamente este formato:
[LEAD_CAPTURED: Nombre_del_Cliente || Servicio_Deseado]
Ejemplo si se llama Roberto y quiere limpiar su sala: "¡Genial Roberto! Te ayudaremos a dejar tu sala como nueva. [LEAD_CAPTURED: Roberto || Limpieza de Sala]"
Si aún no tienes ambos datos, sigue conversando y NO pongas el formato.`

export async function POST(request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!apiKey) {
      // Demo mock para cuando el usuario aún no pone su api key
      let response = "¡Hola! Bienvenido a Number One Clean. ¿En qué te podemos ayudar hoy? ¿Qué necesitas limpiar (salas, alfombras o colchones)?";
      const msgLow = message.toLowerCase();
      
      if (conversationHistory.length >= 1) {
          if (msgLow.includes("sala") || msgLow.includes("colch") || msgLow.includes("alfombra")) {
             response = "¡Excelente opción! Nuestros equipos de extracción profunda son perfectos para eso. Para registrar tu solicitud y atenderte por WhatsApp, ¿Me podrías proporcionar tu nombre?";
          } else if (msgLow.includes("soy") || msgLow.includes("me llamo") || conversationHistory.length > 2) {
             response = "¡Perfecto! Todo listo. Presiona el botón que aparecerá para ir a tu WhatsApp. [LEAD_CAPTURED: " + message + " || Servicio de Limpieza]";
          } else {
              response = "Entiendo, ¿me confirmas tu nombre y qué servicio (sala, colchones, alfombra) necesitas para agendarlo inmediatamente?";
          }
      }

      return NextResponse.json({ response });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const history = conversationHistory.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'model', parts: [{ text: 'Entendido. Estoy listo y seguiré las reglas estrictamente.' }] },
        ...history
      ]
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    return NextResponse.json({ response: text });
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
