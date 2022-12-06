const init = () => {
    // header gnb area fetch load event
  const headerNav = document.querySelector('#header'),
        headerNavUrl = headerNav.dataset.include;

    fetch(headerNavUrl)
    .then(response => response.text())
    .then(data => callback(data));

    const callback = (data) => {
        headerNav.innerHTML = data;
        headerNav.removeAttribute('data-include');

        // navigation menu tab on style handler
      const elHeader = document.querySelector("#header"),
            elMenuList = document.querySelectorAll(".gnb__menu li");

        elMenuList.forEach((item)=>{
            item.dataset.menu == elHeader.dataset.menu
            && item.classList.add("on");
        })

        // modal logout toggle event
      const btnLogout = document.querySelector(".btn_logout"),
            btnLogoutCancle = document.querySelector(".modal.logout .btn_cancle"),
            modalLogout = document.querySelector(".modal.logout");
        
        const modalLogoutHandler = (elBtn) => {
            elBtn.addEventListener("click",() => {
                modalLogout.classList.toggle("on");
                document.body.classList.toggle("on");
            })
        }

        modalLogoutHandler(btnLogout);
        modalLogoutHandler(btnLogoutCancle);
    };

    // aside top button fetch load event
  const bntTop = document.querySelector('.btn_top'),
        btnTopUrl = bntTop.dataset.include;

    fetch(btnTopUrl)
    .then(response => response.text())
    .then(data => callbackAside(data));
    
    const callbackAside = (data) => {
        bntTop.innerHTML = data;
        bntTop.removeAttribute('data-include');

        const btnTop = document.querySelector(".btn_top");
        window.addEventListener("scroll",()=>{
            let scrHeight = window.pageYOffset || document.documentElement.scrollTop;
            scrHeight > 100
            ? btnTop.classList.add("on")
            : btnTop.classList.remove("on");
        })
        btnTop.addEventListener("click",()=>{
            window.scrollTo({ top: "0", behavior: "smooth" });
        })
    };

    // table box checked button click event
    if( document.body.contains(document.querySelector(".chk_all")) ){
      const chkAll = document.querySelector(".chk_all"),
            chkOne = document.querySelectorAll(".chk_one"),
            btnCplt = document.querySelector(".btn_cplt"),
            labOne = document.querySelectorAll(".label_one");

        chkAll.addEventListener("click",() => {
            chkAll.checked == true
            ? chkOne.forEach((item,key) => {
                item.checked = true;
                labOne[key].classList.add("checked");
                btnCplt.disabled = false;
            })
            : chkOne.forEach((item,key) => {
                item.checked = false;
                labOne[key].classList.remove("checked");
                btnCplt.disabled = true;
            })
        })
        chkOne.forEach((item,key) => {
            item.addEventListener("click",() => {
                item.checked == true
                ? labOne[key].classList.add("checked")
                : labOne[key].classList.remove("checked");

                setTimeout(() => {
                    const chkOneAll = document.querySelectorAll('input[name="chkOne"]:checked');

                    chkOneAll.length < chkOne.length
                    && (chkAll.checked = false);
                    
                    chkOneAll.length == chkOne.length
                    && (chkAll.checked = true);

                    chkOneAll.length >= 1
                    ? btnCplt.disabled = false
                    : btnCplt.disabled = true;
                }, 120);
            })
        })
    }
    // custom select box UI controls select tag
    if( document.body.contains(document.querySelector(".custom_select")) ){
      const elSelect = document.querySelector("select"),
            selectedArea = document.querySelector(".category"),
            selectBox = document.querySelector(".custom_select"),
            selectUl = document.querySelector(".custom_select ul"),
            selectList = document.querySelectorAll(".custom_select ul li");

        elSelect.addEventListener("change",() => { selectedArea.innerHTML = this.value; })

        selectedArea.addEventListener("click",() => {
            selectBox.classList.toggle("on");
            setTimeout(()=>{ selectUl.scrollTo(0,0); },200);
        })

        selectList.forEach((item,key) => {
            item.addEventListener("click",() => {
                selectedArea.innerHTML = item.dataset.value;
                elSelect.value = item.dataset.value;
                selectBox.classList.remove("on");

                setTimeout(()=>{ selectUl.scrollTo(0,0); },200);

                key !== 0
                ? selectedArea.classList.add("off")
                : selectedArea.classList.remove("off");
            })
        })
    }

    // one page scroll 제어 test용 (추후 수정 혹은 삭제 필요)
    let scrollNum = 0;
    window.addEventListener("mousewheel" || "DOMMouseScroll",(e) => {
        (e.wheelDelta || e.detail) > 0
        ? scrollNum > 0 && scrollNum--
        : scrollNum++;

        // device & OS check handler
        const appVersion = window.navigator.userAgent;
        let deviceCheck, osCheck;
        
        appVersion.includes("Mobile")
        ? deviceCheck = "Mobile"
        : deviceCheck = "PC";

        appVersion.includes("Mac")
        ? osCheck = "Apple"
        : osCheck = "Not Apple";

        console.log( deviceCheck, osCheck, scrollNum );
    })
}
window.addEventListener("load",init);