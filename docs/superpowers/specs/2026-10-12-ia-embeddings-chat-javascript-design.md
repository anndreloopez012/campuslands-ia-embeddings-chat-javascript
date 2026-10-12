# Spec de Diseño: Laboratorio Interactivo de IA, Embeddings y Chatbot en JavaScript

**Proyecto:** `campuslands-ia-embeddings-chat-javascript`  
**Institución:** Campuslands  
**Audiencia:** Campers (estudiantes en fase de cierre de JavaScript)  
**Fecha:** 2026-10-12  
**Estado:** Aprobado

---

## 1. Visión y Propósito

Crear una aplicación web educativa interactiva, visualmente inspiradora y sin fricción de configuración técnica, que permita a los estudiantes de Campuslands comprender los fundamentos reales de la Inteligencia Artificial moderna:
1. **Embeddings:** Cómo las palabras se convierten en vectores geométricos de significado.
2. **Transformers:** Cómo la atención en paralelo permite predecir la siguiente palabra considerando todo el contexto.
3. **Construcción de un Chatbot:** Guía paso a paso en Vanilla JavaScript apoyándose en ChatGPT como asistente de desarrollo, culminando en un chat interactivo con doble modo (simulado offline y conexión real con OpenAI).

---

## 2. Identidad Visual y Estilo

Siguiendo el *Style Bible Visual* y la *Identidad de Marca* de Campuslands:
- **Violeta Eléctrico:** `#5E3AE2` (acento primario, botones de acción, foco).
- **Azul Profundo:** `#000087` y fondos de estudio `#08172E` / `#090D16`.
- **Celeste Vivo:** `#2CAAFF` (enlaces, indicadores activos, highlights de código).
- **Amarillo Acento:** `#F4B422` (advertencias, badges de tips clave).
- **Verde Aqua / Esmeralda:** `#00AA80` (éxito, estado conectado, validaciones).
- **Tipografías:**
  - `Plus Jakarta Sans` para textos editoriales, títulos y explicaciones.
  - `JetBrains Mono` para código, tokens y arrays de datos.
- **Tono Pedagógico:** Inspirador, directo, con analogías reales de la vida cotidiana y sin jerga matemática abrumadora ("anti-slop").

---

## 3. Arquitectura Técnica

- **Entorno:** Standalone Single Page Application (SPA) en `index.html`.
- **Tecnologías:**
  - HTML5 semántico accesible.
  - Tailwind CSS vía CDN moderna (con personalización de colores de Campuslands).
  - Vanilla JavaScript ES6+ modular (`async/await`, DOM API, `fetch`, manipulación de arrays y eventos).
  - Cero build tools (`npm run build`, `vite`, `webpack`) para permitir apertura directa con doble clic o despliegue instantáneo en **GitHub Pages**.
- **Compatibilidad Offline:** Incluye motor de inferencia simulada local con respuestas contextuales en español para laboratorios sin conexión o estudiantes sin API Key de pago.

---

## 4. Estructura de Módulos

### Módulo 1: La Chispa de la IA (Desmitificando el Hype)
- Contraste conceptual: "¿Magia o Matemáticas?".
- Explicación de cómo un LLM calcula probabilidades de tokens.

### Módulo 2: Embeddings y Simulador 2D
- Definición de embedding como vector numérico `[0.24, -0.81, 0.95, ...]`.
- **Simulador 2D en Canvas/SVG interactivo**:
  - Puntos interactivos (`rey`, `reina`, `hombre`, `mujer`, `código`, `bug`, `camper`, `café`).
  - Cálculo de distancia geométrica al seleccionar cualquier nodo.
  - Demostración de aritmética vectorial: `rey - hombre + mujer ≈ reina`.

### Módulo 3: Transformers y el Mecanismo de Atención
- Comparación: Modelos secuenciales antiguos vs. Transformers en paralelo.
- **Inspector de Atención Interactivo**:
  - Frase: *"El camper configuró el bot en su computadora porque **este** tenía un error en el código"*.
  - Al interactuar con cada palabra, se despliegan líneas y porcentajes de atención visual (heat-map semántico).

### Módulo 4: Taller Práctico — Tu Chatbot en JavaScript Paso a Paso
- **Paso 1: El Prompt Maestro para ChatGPT**: Prompt para pedirle ayuda técnica con restricciones de simplicidad para estudiantes.
- **Paso 2: Estructura HTML**: Maquetación accesible con área de mensajes y barra de envío.
- **Paso 3: Memoria en JS**: Array de objetos con roles `system`, `user` y `assistant`.
- **Paso 4: Envío con `fetch` y `async/await`**: Conexión al endpoint `/v1/chat/completions`.
- **Paso 5: Renderizado en el DOM**: Creación de nodos y estilos de burbujas.

### Módulo 5: Playground en Vivo (Tu Chat en Acción)
- Interfaz de chat funcional en tiempo real.
- Selector de modo: Simulación local / Conexión API OpenAI.
- Panel colapsable: **Inspector del Payload JSON** para ver exactamente la solicitud y respuesta HTTP en vivo.

### Módulo 6: Misiones y Retos para los Campers
- Reto 1: Tutor Yoda de Campuslands (cambio de `system prompt`).
- Reto 2: Botón de reset / limpiar conversación.
- Reto 3: Manejo de errores y estado "escribiendo...".

---

## 5. Criterios de Aceptación y Validación

- [x] Ejecución fluida en navegadores modernos sin errores de consola.
- [x] Diseño 100% responsivo (móvil, tablet y desktop).
- [x] Cumplimiento de accesibilidad y contraste de colores WCAG.
- [x] Repositorio Git estructurado por ramas (`feature/*`, `dev`, `main`).
- [x] Despliegue activo en GitHub Pages.
