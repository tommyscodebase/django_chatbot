const userChatDiv = (data) => {
  return `
    <div class="flex gap-1 justify-end mt-3">
          <p
            class="bg-gradient-to-tr from-[#2731DC] to-[#03C1FC] py-2 h-fit px-3 text-lg text-right text-white shadow-md rounded-br-3xl rounded-l-3xl w-fit max-w-[90%] md:max-w-[60%]"
          >
            ${data}
          </p>
          <img
            src="/static/user.jpg"
            class="w-6 h-6 rounded-full ml-2 mb-1"
            alt=""
          />
        </div>
    `;
};
const aiChatDiv = (data) => {
  return `
  <div class="flex gap-1 justify-start mt-3">
  <img
  src="/static/chat-bot.jpg"
    class="w-6 h-6 rounded-full ml-2 mb-1"
    alt=""
  />
  <p
    class="bg-gray-100 py-2 h-fit px-3 text-lg text-gray-600 shadow-md rounded-bl-3xl rounded-r-3xl w-fit max-w-[90%] md:max-w-[60%]"
  >
    ${data}
  </p>
</div>
    `;
};

const userMessage = document.getElementById("message");
const chatContainer = document.getElementById("chat-container");
const chatForm = document.getElementById("chat-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const userPrompt = userMessage.value;
  if (userPrompt.trim() == "") return;

  console.log(`Message: ${userPrompt}`);

  chatContainer.innerHTML += userChatDiv(userPrompt);
  userMessage.value = "";

  //   Get CSRF Token from cookie data
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  //   Get CSRF Token
  csrf_token = getCookie("csrftoken");

  fetch("http://127.0.0.1:8000/get_chatbot_response/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      csrfmiddlewaretoken: csrf_token,
      message: userPrompt,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const response = data.response;
      console.log(`${response}`);
      chatContainer.innerHTML += aiChatDiv(response);
    });
};

chatForm.addEventListener("submit", handleSubmit);
chatForm.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    handleSubmit(event);
  }
});
