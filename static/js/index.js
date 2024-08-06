let index = 0;
let attempts = 0;
let chk;
let timer;
let time;

function appStart() {
  const displayGameover = () => {
    clearInterval(timer);
    const div = document.querySelector(".gameover");
    if (chk === 5) div.innerText = `정답입니다!!\n time:${time}`;
    else div.innerText = "정답을 맞추지 못했습니다.";
    div.style = "opacity:1;";
    div.dataset.gameover = "run";

    var screen = document.querySelector("header");
    screen.style.opacity = "0.6";
    screen = document.querySelector("main");
    screen.style.opacity = "0.6";
    screen = document.querySelector("footer");
    screen.style.opacity = "0.6";
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKey);
    targetFirst.forEach((target) =>
      target.removeEventListener("click", handleClick)
    );
    displayGameover();
  };

  const nextLine = () => {
    if (attempts === 5) {
      return gameover();
    } else {
      attempts++;
      index = 0;
    }
  };

  const handleEnterKey = async () => {
    chk = 0;
    const 응답 = await fetch("/answer");
    const 정답 = await 응답.json();

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.block[data-index='${attempts}${i}']`
      );
      const 입력문자 = block.innerText;

      const keyboard = document.querySelector(
        `.keyblock[data-key='${입력문자}']`
      );
      console.log(keyboard.style.background);

      if (정답[i] === 입력문자) {
        block.style.background = "#6AAA64";
        block.style.border = "2.3px solid #6AAA64";
        keyboard.style.background = "#6AAA64";
        chk++;
      } else if (정답.includes(입력문자)) {
        block.style.background = "#C9B458";
        block.style.border = "2.3px solid #C9B458";
        if (keyboard.style.background !== "rgb(106, 170, 100)")
          keyboard.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
        block.style.border = "2.3px solid #787C7E";
        keyboard.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (chk === 5) gameover();
    else nextLine();
  };

  const handleKeydown = (key, code) => {
    let cur_block = document.querySelector(
      `.block[data-index='${attempts}${index}']`
    );

    // 엔터
    if (code === 13 && index === 5) handleEnterKey();
    // 알파벳
    else if (65 <= code && code <= 90) {
      if (index < 5) {
        cur_block.style.border = "2.3px solid black";
        cur_block.innerText = key;
        cur_block.dataset.state = "run";
        index++;
      }
    }
    // 백스페이스
    else if (code === 8 && index != 0) {
      cur_block = document.querySelector(
        `.block[data-index='${attempts}${--index}']`
      );
      cur_block.dataset.state = "idle";
      cur_block.innerText = null;
      cur_block.style.border = "2.3px solid #d3d6da";
    }
  };

  //키보드를 눌렀을 때
  const handleKey = (event) => {
    const key = event.key.toUpperCase();
    const code = event.keyCode;
    handleKeydown(key, code);
  };

  //화면의 키보드를 클릭했을 때
  const handleClick = (event) => {
    let clickcode;
    const clickkey = event.target.getAttribute("data-key");
    if (clickkey === "ENTER") clickcode = 13;
    else if (clickkey === "BACK") clickcode = 8;
    else clickcode = clickkey.charCodeAt(0);
    handleKeydown(clickkey, clickcode);
  };

  // 화면의 키보드 이벤트 등록
  let targetFirst = document.querySelectorAll(".keyblock");
  targetFirst.forEach((target) =>
    target.addEventListener("click", handleClick)
  );

  // 타이머 진행
  const startTimer = () => {
    const start_time = new Date();

    function setTime() {
      const cur_time = new Date();
      const duration_time = new Date(cur_time - start_time);
      const minutes = duration_time.getMinutes().toString();
      const seconds = duration_time.getSeconds().toString();
      const th1 = document.querySelector(".timer div");
      time = th1.innerText = `time: ${minutes.padStart(
        2,
        "0"
      )}:${seconds.padStart(2, "0")}`;
    }

    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKey);
}

appStart();
