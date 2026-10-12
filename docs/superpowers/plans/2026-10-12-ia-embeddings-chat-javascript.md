# Campuslands IA: Embeddings, Transformers y Chatbot en JavaScript — Plan de Implementación

> **Para trabajadores agenticos:** SUB-SKILL REQUERIDA: Usar superpowers:executing-plans o ejecución sistemática para implementar este plan tarea por tarea. Cada paso usa sintaxis de checkbox (`- [ ]`).

**Goal:** Construir y desplegar una plataforma web interactiva y gamificada que enseñe a los estudiantes de Campuslands conceptos de Embeddings, Transformers y construcción de un Chatbot en JavaScript paso a paso con ChatGPT.

**Architecture:** Aplicación web de una sola página (SPA en `index.html` + `app.js` + `styles.css`) con simuladores interactivos de vectores y atención en Canvas/SVG, tutorial paso a paso con snippets copiables, playground de chat con doble motor (simulado y API OpenAI), y despliegue a GitHub Pages con gestión de ramas `feature/*` -> `dev` -> `main`.

**Tech Stack:** HTML5, Tailwind CSS (CDN), Vanilla JavaScript (ES6+), Plus Jakarta Sans, JetBrains Mono, GitHub Pages.

**Spec:** [Spec de Diseño](file:///Users/macbookpro/Documents/PROYECTOS/campuslands-ia-embeddings-chat-javascript/docs/superpowers/specs/2026-10-12-ia-embeddings-chat-javascript-design.md)

---

## Restricciones Globales

- JavaScript Vanilla amigable para estudiantes que terminan el módulo básico (cero build tools complejas).
- Estilo y paleta oficial de Campuslands (`#5E3AE2`, `#000087`, `#2CAAFF`, `#F4B422`, `#00AA80`).
- Soporte para ejecución offline / simulada para que ningún estudiante dependa obligatoriamente de una API Key de pago.
- Flujo de ramas Git: trabajo en `feature/ia-interactive-lab`, integración en `dev`, y sincronización final en `main` para GitHub Pages.

---

## Tareas de Implementación

### Tarea 1: Inicialización del Repositorio y Reglas Multi-Agente
- [ ] Inicializar Git en el directorio del proyecto con rama base `main`.
- [ ] Crear rama `dev` y rama `feature/ia-interactive-lab`.
- [ ] Crear archivos de configuración multi-agente: `AGENTS.md`, `CLAUDE.md`, `.gitignore`, `README.md`.
- [ ] Verificar estado de git inicial.

### Tarea 2: Estructura HTML y Diseño Visual Base (Header, Tabs y Estilos Campuslands)
- [ ] Crear `index.html` con importación de fuentes Google Fonts (*Plus Jakarta Sans*, *JetBrains Mono*) y Tailwind CSS con extensión de temas.
- [ ] Diseñar el Header corporativo de Campuslands con selector de módulos, progreso y badges.
- [ ] Maquetar los contenedores de las 6 secciones modulares.

### Tarea 3: Módulos Teóricos e Interactivos (Embeddings 2D y Transformers Attention)
- [ ] Implementar Módulo 1: "La Chispa de la IA" con comparativas conceptuales y diagramas.
- [ ] Implementar Módulo 2: "Embeddings y Espacio Vectorial" con simulador interactivo Canvas/SVG donde los alumnos ven distancias semánticas y álgebra de palabras (`rey - hombre + mujer = reina`).
- [ ] Implementar Módulo 3: "Transformers y Atención" con inspector interactivo de frases y heat-map de atención contextual.

### Tarea 4: Módulo de Taller Paso a Paso (Construye tu Chatbot con JavaScript)
- [ ] Paso 1: Prompt maestro para ChatGPT formateado con botón de copiar y explicación.
- [ ] Paso 2: Estructura HTML del chat con explicación de etiquetas semánticas.
- [ ] Paso 3: Modelo de datos en JavaScript (roles `system`, `user`, `assistant`).
- [ ] Paso 4: Función `enviarMensaje()` con `fetch` y `async/await` documentada línea por línea.
- [ ] Paso 5: Renderizado dinámico en el DOM con buenas prácticas.

### Tarea 5: Playground Integrado y Misiones Prácticas
- [ ] Implementar Chat Playground funcional con interfaz reactiva:
  - Selector de modo: Offline (simulador local inteligente con respuestas contextuales) / Online (OpenAI API Key temporal).
  - Inspector de Payload JSON en tiempo real para visualizar peticiones HTTP.
- [ ] Implementar sección de Misiones y Retos con checklists interactivos.

### Tarea 6: Pruebas, Verificación y Flujo de Ramas Git
- [ ] Verificar funcionamiento en navegador local con `agent-browser` o script de validación.
- [ ] Hacer commit en rama `feature/ia-interactive-lab`.
- [ ] Fusionar rama en `dev` y subir a GitHub con `gh repo create` / `git push`.
- [ ] Fusionar `dev` en `main` y habilitar GitHub Pages.
- [ ] Sincronizar memoria con Graphify y Obsidian (`memoria registrar`).
