document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

const GEMINI_API_KEY = "AIzaSyDMXU34kV_2zsVDaRhgSI4FuveGt5IUbMg"; // Replace with your actual API key

async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let userMessage = inputField.value.trim();
    if (userMessage === "") return;

    appendMessage("You: " + userMessage, "user");
    inputField.value = "";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();
        console.log("API Response:", data); // Debugging

        const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to respond.";
        appendMessage("Bot: " + botReply, "bot");

    } catch (error) {
        console.error("Error:", error);
        appendMessage("Bot: Sorry, I couldn't process your request.", "bot");
    }
}

function appendMessage(text, sender) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.classList.add(sender);
    messageDiv.innerText = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}
