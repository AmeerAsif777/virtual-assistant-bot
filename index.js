const i = {
  info: {
    name: "Gp Muthu",
    age: "100",
    country: "Kailasa",
    number: "Sorry I should not say Ameer",
  },
  author: {
    name: "Ameer",
    age: "23",
    country: "India",
    number:
      "I cant say his number. If I still say, arya madam will kill me. Hold on. Let me tell your secret. He is such a bitch. You can message him in instagram. His account name is dirtyameer007",
    extra_info: "Currently, he is single now, but always ready to mingle",
  },
};
const author = ["author", "god", "owner", "create", "creator"];
const authorMention = ["you", "name"];
const basicQuestions = ["how", "name", "what", "your"];
const selfIntro = (message) => {
  let matter;
  if (message.includes("name")) matter = `My name is ${i.info.name}`;
  else if (message.includes("age")) matter = `My age is ${i.info.age}`;
  else if (message.includes("country"))
    matter = `My country is ${i.info.country}`;
  else if (message.includes("are you")) matter = `I am fine`;
  else if (message.includes("number")) matter = i.info.number;
  return matter;
};

const authorInfo = (message) => {
  let matter;
  if (message.includes("age")) matter = `My author age is ${i.author.age}.`;
  else if (message.includes("country"))
    matter = `My author country is ${i.author.country}.`;
  else if (message.includes("number")) matter = `${i.author.number}.`;
  else if (authorMention.some((name) => message.includes(name.toLowerCase())))
    matter = `My author name is ${i.author.name}.`;
  matter = matter.concat(i.author.extra_info);
  return matter;
};

const speakNowButton = document.getElementById("speakNowButton");
speakNowButton.addEventListener("click", speakNow);

const styleSheet = document.getElementById("styleSheet");
const img = document.getElementById("robotImg");
// SpeechRecognition

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("Started..");
  img.setAttribute("src", "./robot-observe.gif");
};

recognition.onresult = function (e) {
  const resultIndex = e.resultIndex;

  const { confidence, transcript } = e.results[resultIndex][0];
  console.log("You have been told...", transcript);
  speakOutLoud(confidence, transcript);
  // speakOutLoud(confidence, transcript);
};

function speakNow() {
  recognition.start();
}

function speakOutLoud(confidence, message) {
  img.setAttribute("src", "./robot-reply.gif");
  let mes;
  if (message.includes("dark")) {
    styleSheet.setAttribute("href", "dark-mode-theme.css");
    mes = "Executing";
  } else if (message.includes("light")) {
    styleSheet.setAttribute("href", "light-mode-theme.css");
  } else if (message.includes("YouTube")) {
    window.open("https://www.youtube.com/watch?v=D7wFq8AJQlo", "_blank");
  } else if (author.some((name) => message.includes(name.toLowerCase())))
    mes = authorInfo(message);
  else if (basicQuestions.some((name) => message.includes(name.toLowerCase())))
    mes = selfIntro(message);
  else mes = `You are such a bitch`;
  // `Sorry nothing matched with our library, so Im gonna repeat what you have said just before. ${message}`;
  console.log("Robot Replying....", mes);

  // The action of saying or expressing something aloud..
  const SpeechSynthesisUtterance =
    window.SpeechSynthesisUtterance || window.webkitSpeechSynthesisUtterance;

  const utterance = new SpeechSynthesisUtterance();

  utterance.onend = e => {
    console.log('Done speaking...');
    img.setAttribute("src", "./robot-start.gif");
    // body.style.background = '#141414';
  };
  utterance.volume = 1; // 100%
  utterance.rate = 1;
  utterance.pitch = 1.5;
  utterance.text = mes;

  // Artificial production of human speech
  const speechSynthesis =
    window.speechSynthesis || window.webkitspeechSynthesis;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}
