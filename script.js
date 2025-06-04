const respostas = {
  energia: "Verifique se o cabo de energia está conectado corretamente e tente ligar em outra tomada.",
  lento: "Feche programas desnecessários, limpe arquivos temporários e verifique se há vírus.",
  internet: "Reinicie o modem e verifique se os cabos estão conectados corretamente.",
  telaAzul: "Isso pode ser erro de hardware ou driver. Tente iniciar em modo de segurança.",
  aquecimento: "Verifique se as ventoinhas estão funcionando e limpe a poeira interna.",
};

function addMessage(remetente, texto) {
  renderMessage(remetente, texto);  // mostra no chat
  saveToHistory(remetente, texto);  // salva no localStorage
}

function saveToHistory(remetente, texto) {
  const historico = JSON.parse(localStorage.getItem("chatHistory")) || [];
  historico.push({ remetente, texto });
  localStorage.setItem("chatHistory", JSON.stringify(historico));
}

function renderMessage(remetente, texto) {
  const chatLog = document.getElementById("chat-log");
  const message = document.createElement("div");

  message.classList.add("chat-message");
  if (remetente === "Você") {
    message.classList.add("user-message");
  } else {
    message.classList.add("bot-message");
  }

  message.innerHTML = `<strong>${remetente}:</strong> ${texto}`;
  chatLog.appendChild(message);
  chatLog.scrollTop = chatLog.scrollHeight;
}


function handleUserInput() {
  const input = document.getElementById("user-input");
  const userText = input.value.toLowerCase().trim();
  if (userText === "") return;

  addMessage("Você", userText);

  let resposta = "Desculpe, não entendi. Tente descrever o problema de outro jeito.";

  if (userText.includes("não liga") || userText.includes("sem ligar") || userText.includes("não funciona")) {
    resposta = respostas.energia;
  } else if (userText.includes("lento") || userText.includes("devagar")) {
    resposta = respostas.lento;
  } else if (userText.includes("internet") || userText.includes("wifi") || userText.includes("rede")) {
    resposta = respostas.internet;
  } else if (userText.includes("tela azul") || userText.includes("erro azul")) {
    resposta = respostas.telaAzul;
  } else if (userText.includes("esquentando") || userText.includes("aquecendo") || userText.includes("quente")) {
    resposta = respostas.aquecimento;
  }

  addMessage("Bot", resposta);
  input.value = "";
}

document.addEventListener("DOMContentLoaded",document.addEventListener("DOMContentLoaded", function () {
  // carregar histórico ao iniciar
  loadChatHistory();

  document.getElementById("send-btn").addEventListener("click", handleUserInput);
  document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      handleUserInput();
    }
  });
}));
function loadChatHistory() {
  const historico = JSON.parse(localStorage.getItem("chatHistory")) || [];
  historico.forEach(mensagem => {
    renderMessage(mensagem.remetente, mensagem.texto); // só exibe, não salva
  });
}

document.getElementById("clear-btn").addEventListener("click", function () {
  localStorage.removeItem("chatHistory");
  document.getElementById("chat-log").innerHTML = "";
});
