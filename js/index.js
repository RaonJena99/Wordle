let index = 0;
let attempts = 0;

function appStart() {
  const handleEnterKey = () => {
    console.log("엔터키");
  };

  const handleKeydown = (event) => {
    const key = event.key.toUpperCase();
    const code = event.keyCode;
    let cur_block = document.querySelector(
      `.block[data-index='${attempts}${index}']`
    );

    // 엔터
    if (code === 13 && index === 5) handleEnterKey();
    // 알파벳
    else if (65 <= code && code <= 90) {
      cur_block.innerText = key;
      index++;
    }
    // 백스페이스
    else if (code === 8 && index != 0) {
      cur_block = document.querySelector(
        `.block[data-index='${attempts}${--index}']`
      );
      cur_block.innerText = null;
    }
  };

  window.addEventListener("keydown", handleKeydown);
}

appStart();
