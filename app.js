/**
 * Campuslands IA Academy · Laboratorio Interactivo
 * Embeddings, Transformers y Chatbot en JavaScript
 * app.js - Lógica interactiva completa
 */

// ==========================================
// 1. GESTIÓN DE NAVEGACIÓN Y PESTAÑAS (TABS)
// ==========================================
let currentTab = 1;
const totalTabs = 6;

function updateTabUI() {
  // Actualizar indicador textual
  const indicator = document.getElementById("tab-indicator");
  if (indicator) indicator.textContent = `${currentTab}/${totalTabs}`;

  // Actualizar barra de progreso superior
  const progressFill = document.getElementById("progress-bar-fill");
  if (progressFill) {
    const percentage = (currentTab / totalTabs) * 100;
    progressFill.style.width = `${percentage}%`;
  }

  // Ocultar todas las secciones y mostrar la activa
  for (let i = 1; i <= totalTabs; i++) {
    const section = document.getElementById(`module-${i}`);
    if (section) {
      if (i === currentTab) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    }
  }

  // Actualizar estilos de los botones del menú de navegación
  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((btn) => {
    const tabNum = parseInt(btn.getAttribute("data-tab"));
    if (tabNum === currentTab) {
      btn.className = "tab-btn active px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap bg-[#5E3AE2] text-white shadow-lg shadow-purple-500/20";
    } else {
      btn.className = "tab-btn px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-2 whitespace-nowrap text-slate-400 hover:text-white hover:bg-[#0D1E38]";
    }
  });

  // Si cambiamos a la pestaña de embeddings, renderizar nodos
  if (currentTab === 2) {
    setTimeout(renderEmbeddingNodes, 50);
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchTab(tabIndex) {
  if (tabIndex >= 1 && tabIndex <= totalTabs) {
    currentTab = tabIndex;
    updateTabUI();
  }
}

// Navegación por botones anterior/siguiente
document.getElementById("btn-prev-tab")?.addEventListener("click", () => {
  if (currentTab > 1) switchTab(currentTab - 1);
});

document.getElementById("btn-next-tab")?.addEventListener("click", () => {
  if (currentTab < totalTabs) switchTab(currentTab + 1);
});

// Atajos de teclado: Flecha Izquierda y Derecha para cambiar de módulo
window.addEventListener("keydown", (e) => {
  // Evitar cambiar pestaña si el usuario está escribiendo en un input
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "ArrowLeft" && currentTab > 1) {
    switchTab(currentTab - 1);
  } else if (e.key === "ArrowRight" && currentTab < totalTabs) {
    switchTab(currentTab + 1);
  }
});


// ==========================================
// 2. SIMULADOR 2D DE EMBEDDINGS
// ==========================================
const embeddingWords = [
  // Categoría: Realeza y Personas (Semántica clásica de Word2Vec)
  { id: "rey", label: "Rey 👑", x: 22, y: 22, category: "royalty", color: "#F4B422" },
  { id: "hombre", label: "Hombre 👨", x: 20, y: 55, category: "royalty", color: "#F4B422" },
  { id: "mujer", label: "Mujer 👩", x: 50, y: 55, category: "royalty", color: "#F4B422" },
  { id: "reina", label: "Reina 👸", x: 52, y: 22, category: "royalty", color: "#F4B422" },

  // Categoría: Tech & Campuslands
  { id: "camper", label: "Camper 🚀", x: 78, y: 35, category: "tech", color: "#2CAAFF" },
  { id: "codigo", label: "Código 💻", x: 88, y: 65, category: "tech", color: "#2CAAFF" },
  { id: "bug", label: "Bug 🐛", x: 70, y: 78, category: "tech", color: "#2CAAFF" },
  { id: "cafe", label: "Café ☕", x: 82, y: 15, category: "tech", color: "#2CAAFF" },

  // Categoría: Animales
  { id: "perro", label: "Perro 🐶", x: 30, y: 82, category: "animal", color: "#00AA80" },
  { id: "gato", label: "Gato 🐱", x: 42, y: 86, category: "animal", color: "#00AA80" },
  { id: "lobo", label: "Lobo 🐺", x: 18, y: 88, category: "animal", color: "#00AA80" }
];

let selectedEmbeddingId = "rey";

function renderEmbeddingNodes() {
  const container = document.getElementById("embedding-nodes-container");
  if (!container) return;
  container.innerHTML = "";

  embeddingWords.forEach((word) => {
    const node = document.createElement("div");
    const isSelected = word.id === selectedEmbeddingId;
    node.id = `node-${word.id}`;
    node.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 border flex items-center gap-1.5 ${
      isSelected
        ? "bg-[#5E3AE2] text-white border-white scale-110 shadow-lg shadow-purple-500/50 z-30 ring-2 ring-[#2CAAFF]"
        : "bg-[#08172E]/90 hover:bg-[#0D1E38] text-slate-200 border-[#1E355B] hover:scale-105 z-20"
    }`;
    node.style.left = `${word.x}%`;
    node.style.top = `${word.y}%`;
    node.innerHTML = `
      <span class="w-2 h-2 rounded-full" style="background-color: ${word.color}"></span>
      <span>${word.label}</span>
    `;

    node.addEventListener("click", () => selectEmbeddingWord(word.id));
    container.appendChild(node);
  });

  drawEmbeddingLines();
  updateEmbeddingInspector();
}

function selectEmbeddingWord(wordId) {
  selectedEmbeddingId = wordId;
  renderEmbeddingNodes();
}

function calculateDistance(w1, w2) {
  const dx = (w1.x - w2.x) / 50; // Normalizado
  const dy = (w1.y - w2.y) / 50;
  return Math.sqrt(dx * dx + dy * dy);
}

function drawEmbeddingLines() {
  const svg = document.getElementById("embedding-svg-lines");
  if (!svg) return;
  svg.innerHTML = "";

  const origin = embeddingWords.find((w) => w.id === selectedEmbeddingId);
  if (!origin) return;

  embeddingWords.forEach((target) => {
    if (target.id === origin.id) return;
    const dist = calculateDistance(origin, target);
    // Solo dibujar líneas visibles si la distancia no es enorme
    const opacity = Math.max(0.1, 1 - dist * 0.45);
    const strokeColor = dist < 0.8 ? "#2CAAFF" : "#1E355B";

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", `${origin.x}%`);
    line.setAttribute("y1", `${origin.y}%`);
    line.setAttribute("x2", `${target.x}%`);
    line.setAttribute("y2", `${target.y}%`);
    line.setAttribute("stroke", strokeColor);
    line.setAttribute("stroke-width", dist < 0.8 ? "2" : "1");
    line.setAttribute("stroke-opacity", opacity.toString());
    line.setAttribute("stroke-dasharray", dist < 0.8 ? "none" : "4 4");
    svg.appendChild(line);
  });
}

function updateEmbeddingInspector() {
  const word = embeddingWords.find((w) => w.id === selectedEmbeddingId);
  if (!word) return;

  const title = document.getElementById("selected-word-title");
  const badge = document.getElementById("selected-word-badge");
  const val = document.getElementById("selected-vector-val");
  const list = document.getElementById("distances-list");

  if (title) title.textContent = word.label;
  if (badge) badge.textContent = `Categoría: ${word.category.toUpperCase()}`;

  // Coordenadas normalizadas [-1.00 a 1.00]
  const normX = ((word.x - 50) / 50).toFixed(2);
  const normY = ((-1 * (word.y - 50)) / 50).toFixed(2);
  if (val) val.textContent = `[ ${normX} , ${normY} ]`;

  // Calcular distancias ordenadas de menor a mayor
  const distances = embeddingWords
    .filter((w) => w.id !== word.id)
    .map((w) => {
      const d = calculateDistance(word, w);
      // Similitud Coseno aproximada
      const similarity = Math.max(0, 100 - d * 45).toFixed(1);
      return { ...w, distance: d.toFixed(2), similarity };
    })
    .sort((a, b) => b.similarity - a.similarity);

  if (list) {
    list.innerHTML = "";
    distances.forEach((item) => {
      const row = document.createElement("div");
      row.className = "flex items-center justify-between p-2 rounded-lg bg-[#050D1A] border border-[#1E355B]/60";
      row.innerHTML = `
        <span class="font-bold text-slate-200">${item.label}</span>
        <div class="flex items-center gap-2">
          <span class="text-[10px] text-slate-400">Dist: ${item.distance}</span>
          <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
            item.similarity > 70
              ? "bg-[#00AA80]/20 text-[#00AA80]"
              : item.similarity > 40
              ? "bg-[#2CAAFF]/20 text-[#2CAAFF]"
              : "bg-slate-800 text-slate-400"
          }">${item.similarity}% Similitud</span>
        </div>
      `;
      list.appendChild(row);
    });
  }
}

// Botón de demostración Rey - Hombre + Mujer = Reina
document.getElementById("btn-demo-vector")?.addEventListener("click", () => {
  const formulaBox = document.getElementById("formula-box");
  if (formulaBox) formulaBox.classList.remove("hidden");

  // Secuencia animada de selección
  selectEmbeddingWord("rey");
  setTimeout(() => {
    selectEmbeddingWord("hombre");
    setTimeout(() => {
      selectEmbeddingWord("mujer");
      setTimeout(() => {
        selectEmbeddingWord("reina");
      }, 700);
    }, 700);
  }, 700);
});

document.getElementById("btn-reset-embeddings")?.addEventListener("click", () => {
  const formulaBox = document.getElementById("formula-box");
  if (formulaBox) formulaBox.classList.add("hidden");
  selectEmbeddingWord("rey");
});


// ==========================================
// 3. INSPECTOR DE ATENCIÓN (TRANSFORMERS)
// ==========================================
const attentionSentence = [
  { token: "El", id: 0 },
  { token: "camper", id: 1 },
  { token: "configuró", id: 2 },
  { token: "el", id: 3 },
  { token: "chatbot", id: 4 },
  { token: "en", id: 5 },
  { token: "su", id: 6 },
  { token: "computadora", id: 7 },
  { token: "porque", id: 8 },
  { token: "este", id: 9 },
  { token: "tenía", id: 10 },
  { token: "un", id: 11 },
  { token: "error", id: 12 }
];

// Pesos de atención precalculados para ilustrar desambiguación contextual
const attentionWeights = {
  9: { // "este"
    focusWord: "este",
    explanation: "Cuando el Transformer procesa 'este', la atención resuelve el pronombre: detecta que se refiere a 'chatbot' (sujeto con error) y no a la 'computadora' ni al 'camper'.",
    weights: [
      { target: "chatbot", weight: 72, color: "#2CAAFF" },
      { target: "error", weight: 18, color: "#F4B422" },
      { target: "configuró", weight: 7, color: "#5E3AE2" },
      { target: "computadora", weight: 3, color: "#64748b" }
    ]
  },
  2: { // "configuró"
    focusWord: "configuró",
    explanation: "El verbo 'configuró' presta atención inmediata al sujeto que ejecuta la acción ('camper') y al objeto directo ('chatbot').",
    weights: [
      { target: "camper", weight: 58, color: "#2CAAFF" },
      { target: "chatbot", weight: 32, color: "#5E3AE2" },
      { target: "computadora", weight: 10, color: "#64748b" }
    ]
  },
  12: { // "error"
    focusWord: "error",
    explanation: "La palabra 'error' conecta fuertemente con el estado 'tenía' y el objeto que lo contiene ('chatbot').",
    weights: [
      { target: "chatbot", weight: 64, color: "#F4B422" },
      { target: "tenía", weight: 26, color: "#2CAAFF" },
      { target: "este", weight: 10, color: "#5E3AE2" }
    ]
  },
  1: { // "camper"
    focusWord: "camper",
    explanation: "El sustantivo principal 'camper' conecta con la acción que realiza ('configuró') y su posesivo ('su').",
    weights: [
      { target: "configuró", weight: 68, color: "#2CAAFF" },
      { target: "su", weight: 22, color: "#5E3AE2" },
      { target: "chatbot", weight: 10, color: "#64748b" }
    ]
  }
};

let activeAttentionTokenId = 9; // "este" por defecto

function renderAttentionSentence() {
  const container = document.getElementById("attention-sentence-container");
  if (!container) return;
  container.innerHTML = "";

  const currentConfig = attentionWeights[activeAttentionTokenId] || attentionWeights[9];

  attentionSentence.forEach((item) => {
    const isFocus = item.id === activeAttentionTokenId;
    const related = currentConfig.weights.find((w) => w.target.toLowerCase() === item.token.toLowerCase());

    const span = document.createElement("button");
    span.id = `token-${item.id}`;
    
    let baseClass = "px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all duration-300 border ";
    if (isFocus) {
      baseClass += "bg-[#5E3AE2] text-white border-white scale-110 shadow-lg shadow-purple-500/50 ring-2 ring-[#2CAAFF]";
    } else if (related) {
      baseClass += "bg-[#2CAAFF]/20 text-[#2CAAFF] border-[#2CAAFF] scale-105";
    } else {
      baseClass += "bg-[#08172E] text-slate-300 border-[#1E355B] hover:border-slate-500";
    }

    span.className = baseClass;
    span.textContent = item.token;
    span.addEventListener("click", () => {
      if (attentionWeights[item.id]) {
        activeAttentionTokenId = item.id;
        renderAttentionSentence();
        updateAttentionInspector();
      }
    });

    container.appendChild(span);
  });
}

function updateAttentionInspector() {
  const config = attentionWeights[activeAttentionTokenId] || attentionWeights[9];
  const badge = document.getElementById("attention-focus-badge");
  const explanation = document.getElementById("attention-explanation-text");
  const barsContainer = document.getElementById("attention-bars");

  if (badge) badge.textContent = `"${config.focusWord}"`;
  if (explanation) explanation.textContent = config.explanation;

  if (barsContainer) {
    barsContainer.innerHTML = "";
    config.weights.forEach((w) => {
      const barWrapper = document.createElement("div");
      barWrapper.className = "space-y-1";
      barWrapper.innerHTML = `
        <div class="flex justify-between text-[11px]">
          <span class="text-slate-300 font-bold">Token "${w.target}":</span>
          <span class="font-bold text-[#2CAAFF]">${w.weight}% atención</span>
        </div>
        <div class="w-full h-2 bg-[#050D1A] rounded-full overflow-hidden border border-[#1E355B]">
          <div class="h-full rounded-full transition-all duration-500" style="width: ${w.weight}%; background-color: ${w.color}"></div>
        </div>
      `;
      barsContainer.appendChild(barWrapper);
    });
  }
}


// ==========================================
// 4. PASOS DEL TALLER (MÓDULO 4)
// ==========================================
function showStep(stepNum) {
  // Ocultar todos los paneles de pasos
  for (let i = 1; i <= 5; i++) {
    const panel = document.getElementById(`step-content-${i}`);
    if (panel) {
      if (i === stepNum) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    }
  }

  // Actualizar botones de navegación de pasos
  const buttons = document.querySelectorAll(".step-nav-btn");
  buttons.forEach((btn) => {
    const s = parseInt(btn.getAttribute("data-step"));
    if (s === stepNum) {
      btn.className = "step-nav-btn active p-3 rounded-xl border border-[#5E3AE2] bg-[#5E3AE2] text-white text-xs font-bold transition flex flex-col items-center gap-1 shadow-md shadow-purple-500/20";
    } else {
      btn.className = "step-nav-btn p-3 rounded-xl border border-[#1E355B] bg-[#0D1E38] text-slate-400 text-xs font-bold transition flex flex-col items-center gap-1 hover:text-white";
    }
  });
}


// ==========================================
// 5. PLAYGROUND EN VIVO Y SIMULADOR DE CHAT
// ==========================================
let chatEngine = "offline"; // 'offline' | 'openai'
let customOpenAiKey = "";

// Array de memoria del chat en vivo
const liveMessages = [
  {
    role: "system",
    content: "Eres el Tutor Virtual de Campuslands IA Academy. Respondes a los estudiantes con explicaciones claras, amigables, motivadoras y con analogías o fragmentos cortos de JavaScript."
  }
];

function setChatEngine(engine) {
  chatEngine = engine;
  const offlineBtn = document.getElementById("mode-offline-btn");
  const openaiBtn = document.getElementById("mode-openai-btn");
  const keyContainer = document.getElementById("openai-key-container");
  const badge = document.getElementById("active-engine-badge");

  if (engine === "offline") {
    offlineBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold transition bg-[#00AA80] text-white shadow";
    openaiBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
    keyContainer.classList.add("hidden");
    if (badge) {
      badge.textContent = "Simulado";
      badge.className = "px-2 py-0.5 text-[9px] font-mono uppercase font-black bg-[#00AA80]/20 text-[#00AA80] rounded";
    }
  } else {
    openaiBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold transition bg-[#5E3AE2] text-white shadow";
    offlineBtn.className = "px-3 py-1.5 rounded-xl text-xs font-bold transition text-slate-400 hover:text-white";
    keyContainer.classList.remove("hidden");
    if (badge) {
      badge.textContent = "OpenAI API";
      badge.className = "px-2 py-0.5 text-[9px] font-mono uppercase font-black bg-[#5E3AE2]/20 text-[#2CAAFF] rounded";
    }
  }
  updatePayloadDisplay();
}

function saveApiKey() {
  const input = document.getElementById("user-openai-key");
  if (input && input.value.trim()) {
    customOpenAiKey = input.value.trim();
    showToast("¡API Key guardada temporalmente!");
  } else {
    showToast("Por favor ingresa una API Key válida");
  }
}

function updatePayloadDisplay() {
  const display = document.getElementById("json-payload-display");
  const counter = document.getElementById("messages-count-badge");
  if (display) {
    const payload = {
      model: chatEngine === "openai" ? "gpt-4o-mini" : "campuslands-simulated-v1",
      temperature: 0.7,
      messages: liveMessages
    };
    display.textContent = JSON.stringify(payload, null, 2);
  }
  if (counter) {
    counter.textContent = liveMessages.length.toString();
  }
}

function appendLiveBubble(texto, rol) {
  const messagesBox = document.getElementById("live-chat-messages");
  if (!messagesBox) return;

  const bubbleWrapper = document.createElement("div");
  if (rol === "user") {
    bubbleWrapper.className = "flex items-start justify-end gap-2.5 max-w-[85%] ml-auto animate-fadeIn";
    bubbleWrapper.innerHTML = `
      <div class="p-3.5 rounded-2xl bg-[#5E3AE2] text-white text-xs leading-relaxed shadow-md shadow-purple-500/15">
        ${escapeHtml(texto)}
      </div>
      <div class="w-6 h-6 rounded-md bg-[#2CAAFF] flex items-center justify-center text-xs shrink-0 mt-0.5 text-slate-900 font-bold">
        👤
      </div>
    `;
  } else {
    bubbleWrapper.className = "flex items-start gap-2.5 max-w-[85%] animate-fadeIn";
    bubbleWrapper.innerHTML = `
      <div class="w-6 h-6 rounded-md bg-[#5E3AE2] flex items-center justify-center text-xs shrink-0 mt-0.5">🤖</div>
      <div class="p-3.5 rounded-2xl bg-[#0D1E38] border border-[#1E355B] text-xs text-slate-200 leading-relaxed shadow-sm">
        ${formatBotResponse(texto)}
      </div>
    `;
  }

  messagesBox.appendChild(bubbleWrapper);
  messagesBox.scrollTop = messagesBox.scrollHeight;
}

// Simulador local con respuestas pedagógicas inteligentes en español
function getSimulatedResponse(pregunta) {
  const q = pregunta.toLowerCase();

  if (q.includes("embedding") || q.includes("vector")) {
    return "¡Excelente pregunta camper! Un **Embedding** es una lista de números (vector de coordenadas) que representa el significado de una palabra. Por ejemplo, `perro` y `gato` tienen números cercanos porque ambos son animales domésticos. ¡En el Módulo 2 puedes probar el simulador 2D!";
  }
  if (q.includes("transformer") || q.includes("atención") || q.includes("attention")) {
    return "Los **Transformers** cambiaron la IA porque leen todo el texto a la vez y usan el **Mecanismo de Atención**. En lugar de leer palabra por palabra como una vieja cola FIFO, el modelo calcula qué palabras deben prestar atención a cuáles en paralelo.";
  }
  if (q.includes("javascript") || q.includes("js") || q.includes("código") || q.includes("fetch")) {
    return "Para conectar JavaScript con ChatGPT usamos `fetch()` con método `POST` y encabezados `'Content-Type': 'application/json'`. Recuerda que guardamos la conversación en un `Array` de objetos `{ role, content }` para que la IA tenga memoria.";
  }
  if (q.includes("yoda") || q.includes("padawan")) {
    return "Grandes cosas en Campuslands aprenderás. Bugs en tu código habrá, pero paciencia tener debes. Con console.log y async/await, el camino dominarás.";
  }
  if (q.includes("hola") || q.includes("buenos") || q.includes("saludos")) {
    return "¡Hola camper! 🚀 ¿Qué te gustaría aprender hoy? Puedes preguntarme sobre *Embeddings*, *Transformers*, cómo funciona *fetch()* o cómo construir tu propio chatbot.";
  }
  if (q.includes("campuslands") || q.includes("tutor")) {
    return "¡En Campuslands formamos talento tech con propósito! Aquí no solo memorizamos comandos: entendemos la arquitectura detrás de la tecnología para crear software real y de alto impacto.";
  }

  return `Comprendo tu pregunta sobre "${pregunta}". En un chatbot de JavaScript, este texto fue empaquetado en un objeto { role: "user", content: "${pregunta}" } y enviado al modelo. La IA genera su respuesta calculando token por token la probabilidad más alta. ¡Revisa el inspector JSON a la derecha para ver tu mensaje en memoria!`;
}

async function handleLiveChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("live-user-input");
  const btnSend = document.getElementById("live-btn-send");
  const typing = document.getElementById("typing-indicator");
  if (!input) return;

  const userText = input.value.trim();
  if (!userText) return;

  // 1. Mostrar mensaje del usuario
  appendLiveBubble(userText, "user");
  liveMessages.push({ role: "user", content: userText });
  updatePayloadDisplay();
  input.value = "";

  // 2. Activar estado escribiendo
  if (typing) typing.classList.remove("hidden");
  if (btnSend) btnSend.disabled = true;

  try {
    let botResponse = "";

    if (chatEngine === "openai" && customOpenAiKey) {
      // Llamada real a OpenAI
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${customOpenAiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: liveMessages,
          temperature: 0.7
        })
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      botResponse = data.choices[0].message.content;
    } else {
      // Simulación local con retardo realista de 600ms
      await new Promise((r) => setTimeout(r, 650));
      botResponse = getSimulatedResponse(userText);
    }

    // 3. Renderizar respuesta del bot
    appendLiveBubble(botResponse, "assistant");
    liveMessages.push({ role: "assistant", content: botResponse });
    updatePayloadDisplay();

  } catch (err) {
    console.error("Error en chat:", err);
    appendLiveBubble("⚠️ Ocurrió un error al contactar con la API. Revisa tu clave o cambia a Modo Simulado (gratis).", "assistant");
  } finally {
    if (typing) typing.classList.add("hidden");
    if (btnSend) btnSend.disabled = false;
    input.focus();
  }
}

function clearChatHistory() {
  // Reiniciar mensajes a solo el prompt de sistema
  liveMessages.length = 1;
  const messagesBox = document.getElementById("live-chat-messages");
  if (messagesBox) {
    messagesBox.innerHTML = `
      <div class="flex items-start gap-2.5 max-w-[85%]">
        <div class="w-6 h-6 rounded-md bg-[#5E3AE2] flex items-center justify-center text-xs shrink-0 mt-0.5">🤖</div>
        <div class="p-3.5 rounded-2xl bg-[#0D1E38] border border-[#1E355B] text-xs text-slate-200 leading-relaxed shadow-sm">
          ¡Historial reiniciado! Memoria limpia. ¿De qué tema de IA o JavaScript quieres conversar ahora?
        </div>
      </div>
    `;
  }
  updatePayloadDisplay();
  showToast("Historial del chat reiniciado");
}


// ==========================================
// 6. MISIONES GAMIFICADAS (LOCALSTORAGE)
// ==========================================
function toggleMission(missionNumber, isChecked) {
  localStorage.setItem(`campuslands_mission_${missionNumber}`, isChecked ? "true" : "false");
  if (isChecked) {
    showToast(`🎉 ¡Felicitaciones! Has completado la Misión ${missionNumber}`);
  }
}

function loadMissionsState() {
  for (let i = 1; i <= 3; i++) {
    const saved = localStorage.getItem(`campuslands_mission_${i}`);
    const checkbox = document.getElementById(`mission-check-${i}`);
    if (checkbox && saved === "true") {
      checkbox.checked = true;
    }
  }
}


// ==========================================
// 7. UTILIDADES (TOAST, COPIAR, FORMATO)
// ==========================================
function copyToClipboard(elementId, btnElement) {
  const el = document.getElementById(elementId);
  if (!el) return;
  const text = el.innerText || el.textContent;

  navigator.clipboard.writeText(text).then(() => {
    showToast("¡Código copiado al portapapeles! 📋");
    if (btnElement) {
      const originalText = btnElement.innerHTML;
      btnElement.classList.add("bg-[#00AA80]", "text-white");
      setTimeout(() => {
        btnElement.classList.remove("bg-[#00AA80]", "text-white");
      }, 1500);
    }
  }).catch((err) => {
    console.error("Error al copiar:", err);
  });
}

function showToast(msg) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 2500);
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function formatBotResponse(text) {
  // Convertir negritas markdown **palabra** a <strong>
  let formatted = escapeHtml(text);
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-[#050D1A] font-mono text-[#2CAAFF] border border-[#1E355B] text-[11px]">$1</code>');
  return formatted;
}


// ==========================================
// 8. INICIALIZACIÓN GLOBAL
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  updateTabUI();
  renderEmbeddingNodes();
  renderAttentionSentence();
  updateAttentionInspector();
  updatePayloadDisplay();
  loadMissionsState();
});
