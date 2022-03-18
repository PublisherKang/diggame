//캐릭터 선택창 이벤트
createCharactor();
function createCharactor() {
    const createCharactorList = document.querySelectorAll(".login_ch_list ul li");
    const loginWrap = document.querySelector(".game_login");
    const createBtn = document.querySelector(".login_create_btn");
    const chNameInput = document.getElementById("ch_name");
    const chNameInputValue = chNameInput.value;
    const aleatModal = document.querySelector(".create_symbol_modal");
    const symbolModalBtn = document.querySelector(".create_symbol_modal .cancel");

    chNameInput.addEventListener("input", function () {
        createCharactorList.forEach(ev => {
            ev.addEventListener("click", listAddClassOn);
        });

        function listAddClassOn(e) {

            createCharactorList.forEach(e => {
                e.classList.remove("on");
            });

            e.currentTarget.classList.add("on");


            for (let i = 0; i < createCharactorList.length; i++) {

                if (this.value !== "" && createCharactorList[i].classList.contains("on") !== true) {
                    createBtn.classList.add("on");
                } else {
                    createBtn.classList.remove("on");
                }
            }
        }
    });

    createCharactorList.forEach(ev => {
        ev.addEventListener("click", listAddClassOn2);
    });

    function listAddClassOn2(e) {
        e.currentTarget.classList.add("on");

        createCharactorList.forEach(e => {
            e.classList.remove("on");
        });

        e.currentTarget.classList.add("on");

        chNameInput.addEventListener("input", function () {
            for (let i = 0; i < createCharactorList.length; i++) {

                if (this.value !== "" && createCharactorList[i].classList.contains("on") !== true) {
                    createBtn.classList.add("on");
                } else {
                    createBtn.classList.remove("on");
                }
            }
        });


    }


    createBtn.addEventListener("click", function () {
        // const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
        const pattern = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

        if (this.classList.contains("on")) {
            //on 활성화 되었을때
            if (pattern.exec(chNameInput.value) || chNameInput.value === "") {
                aleatModal.style.display = "block";
              } else {
                window.open("http://localhost:34853/DigToc/gameidx");
                // loginWrap.style.display = "none";
            }

            // if (chNameInputValue.length === null) {
            //     aleatModal.style.visibility = "visible";

            //     symbolModalBtn.addEventListener("click", function () {
            //         chNameInput.focus();
            //         chNameInput.value = "";
            //     });
            // } else {
            //     loginWrap.style.display = "none";
            // }
        } else {
            chNameInput.focus();
            chNameInput.value = "";
            //on 활성화 되지 않았을때
        }
    });

    // 실패 모달창 이벤트
    symbolModalBtn.addEventListener("click", function () {
        chNameInput.focus();
        chNameInput.value = "";
        createBtn.classList.remove("on");
    });

}

