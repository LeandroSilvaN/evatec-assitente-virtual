let etapa = 0;



const responderBot = (texto) => {

  let resposta = "";

  if (etapa === 0) {

    if (
      texto.toLowerCase().includes("trancar") ||
      texto.toLowerCase().includes("matrícula")
    ) {
      resposta = "Posso ajudar! Você deseja trancar o semestre atual?";
      etapa = 1;
    }
    else {
      resposta = "Posso ajudar com matrícula, trancamento, declarações e calendário acadêmico.";
    }

  } else if (etapa === 1) {

    resposta = "Informe seu RA para prosseguir.";
    etapa = 2;

  } else if(etapa === 2){

    resposta = `
Solicitação registrada com sucesso! ✅

RA: ${texto}

Protocolo: FATEC-${Math.floor(Math.random()*99999)}

Seu pedido de trancamento foi registrado pela Evatec e encaminhado automaticamente para o sistema acadêmico.

Você receberá atualizações pelo Portal SIGA e pelo e-mail institucional.

Obrigado por utilizar a Evatec! 😊
`;

    etapa = 0;
}

    const messageContent = `
<img src="img/persona-ia.png" class="bot-avatar" alt="Persona IA">
<div class="message-text">${resposta}</div>`;

    const botDiv = createMessageElement(
        messageContent,
        'bot-message'
    );

    chatBody.appendChild(botDiv);

    chatBody.scrollTo({
        top: chatBody.scrollHeight,
        behavior:'smooth'
    });
};

const chatbotToggler = document.querySelector("#chatbot-toggler");
const closeChatbot = document.querySelector("#close-chatbot");

chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
});

closeChatbot.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
});

const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
};

const chatBody = document.querySelector(".chat-body");
const messageInput = document.querySelector(".message-input");
const sendButton = document.querySelector("#send-message");

messageInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();

        const texto = messageInput.value.trim();

        if (!texto) return;

        // Mensagem do usuário
        const userMessage = createMessageElement(
            `<div class="message-text">${texto}</div>`,
            "user-message"
        );

        chatBody.appendChild(userMessage);

        chatBody.scrollTo({
            top: chatBody.scrollHeight,
            behavior: "smooth"
        });

        // Limpa campo
        messageInput.value = "";

        // Resposta da Evatec
        setTimeout(() => {
            responderBot(texto);
        }, 500);
    }
});

sendButton.addEventListener("click", (e) => {
    e.preventDefault();

    const texto = messageInput.value.trim();

    if (!texto) return;

    const userDiv = document.createElement("div");
    userDiv.classList.add("message", "user-message");

    userDiv.innerHTML = `
        <div class="message-text">${texto}</div>
    `;

    chatBody.appendChild(userDiv);

    messageInput.value = "";

    setTimeout(() => {
        responderBot(texto);
    }, 500);

    chatBody.scrollTop = chatBody.scrollHeight;
});

