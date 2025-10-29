const chat = document.getElementById("chat");
const themeToggle = document.getElementById("themeToggle");
const logo = document.getElementById("logo");
 
let isDark = true;
 
// Troca de tema
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  isDark = !isDark;
  themeToggle.textContent = isDark ? "🌙" : "☀️";
});
 
// Função criar mensagem
function createMessage(text, sender) {
  const container = document.createElement("div");
  container.classList.add("msg-container", sender);
 
  const img = document.createElement("img");
  img.src = sender === "bot" ? "IMG/bot.png" : "IMG/user.png";
  img.classList.add("avatar");
 
  const bubble = document.createElement("div");
  bubble.classList.add("message", sender);
  bubble.textContent = text;
 
  container.appendChild(img);
  container.appendChild(bubble);
  chat.appendChild(container);
  chat.scrollTop = chat.scrollHeight;
}
 
// Animação digitando
function typingAnimation(callback) {
  const container = document.createElement("div");
  container.classList.add("msg-container", "bot");
 
  const img = document.createElement("img");
  img.src = "IMG/bot.png";
  img.classList.add("avatar", "typing-avatar"); // classe para girar
 
  const bubble = document.createElement("div");
  bubble.classList.add("message", "bot", "typing");
 
  // Animação dos três pontos
  let dots = "";
  let interval = setInterval(() => {
    dots = dots.length < 3 ? dots + "." : "";
    bubble.textContent = dots;
  }, 300);
 
  container.appendChild(img);
  container.appendChild(bubble);
  chat.appendChild(container);
 
  // Depois de 1.2s, remove e mostra mensagem real
  setTimeout(() => {
    clearInterval(interval);
    container.remove();
    callback();
 
    // para rotação do avatar
    img.classList.remove("typing-avatar");
  }, 900);
}
 
// Fluxo de perguntas/respostas
const data = {
  inicio: {
    pergunta: "Em que área posso ajudar?",
    opcoes: ["Portfólio", "Operações", "Jurídico", "Crédito"]
  },
  Portfólio: {
    pergunta: "Sobre Portfólio?",
    opcoes: ["Como abrir um Chamado?", "Teste"],
    respostas: {
      "Como abrir um Chamado?": "https://helpprodutos.supplier.com.br",
      "Teste": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
  },
  Operações: {
    pergunta: "Sobre Operações:",
    opcoes: ["Como comprar?", "É seguro?"],
    respostas: {
      "Como comprar?": "Use corretoras confiáveis como Binance, Coinbase, etc.",
      "É seguro?": "É volátil, exige cautela e carteira segura."
    }
  },
  Jurídico: {
    pergunta: "Sobre Jurídico:",
    opcoes: ["Vantagens", "Riscos"],
    respostas: {
      "Vantagens": "Renda mensal isenta de IR para pessoa física.",
      "Riscos": "Vacância e desvalorização dos imóveis."
    }
  },
  Crédito: {
    pergunta: "Sobre Crédito:",
    opcoes: ["Segurança", "Rentabilidade"],
    respostas: {
      "Segurança": "Mais previsível e seguro que renda variável.",
      "Rentabilidade": "Geralmente menor que ações, mas constante."
    }
  }
};
 
function startChat() {
  typingAnimation(() => {
    createMessage(data.inicio.pergunta, "bot");
    showOptions(data.inicio.opcoes, "inicio");
  });
}
 
function showOptions(options, context) {
  const optionsContainer = document.createElement("div");
  optionsContainer.classList.add("options-container");
 
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.classList.add("message", "user");
 
    btn.onclick = () => {
      createMessage(opt, "user"); // histórico
      optionsContainer.remove(); // remove opções
      handleSelection(opt, context);
    };
 
    optionsContainer.appendChild(btn);
  });
 
  chat.appendChild(optionsContainer);
  chat.scrollTop = chat.scrollHeight;
}
 
function handleSelection(option, context) {
  if (context === "inicio") {
    typingAnimation(() => {
      createMessage(data[option].pergunta, "bot");
      showOptions(data[option].opcoes, option);
    });
  } else {
    typingAnimation(() => {
      createMessage(data[context].respostas[option], "bot");
 
      // Botão voltar ao início
      const restartBtn = document.createElement("button");
      restartBtn.textContent = "Voltar ao início";
      restartBtn.classList.add("message", "user");
      restartBtn.onclick = () => {
        chat.innerHTML = "";
        startChat();
      };
 
      chat.appendChild(restartBtn);
      chat.scrollTop = chat.scrollHeight;
    });
  }
}
 
// Inicia o chat

startChat();


