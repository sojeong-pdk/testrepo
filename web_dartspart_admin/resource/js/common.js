const init = () => {
    // common function list
    const elBody = document.body;
    const addCls = (elItem,elClass) => { elItem.classList.add(elClass); }
    const removeCls = (elItem,elClass) => { elItem.classList.remove(elClass); }
    const toggleCls = (elItem,elClass) => { elItem.classList.toggle(elClass); }

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
                toggleCls(modalLogout,"on");
                toggleCls(elBody,"on");
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
            ? addCls(btnTop,"on")
            : removeCls(btnTop,"on");
        })
        btnTop.addEventListener("click",()=>{
            window.scrollTo({ top: "0", behavior: "smooth" });
        })
    };

    // table box checked button click event
    if( elBody.contains(document.querySelector(".chk_all")) ){
        const chkAll = document.querySelector(".chk_all"),
            chkOne = document.querySelectorAll(".chk_one"),
            btnCplt = document.querySelector(".btn_cplt"),
            labOne = document.querySelectorAll(".label_one");
        const checkBoolean = (Boolean)=>{ chkAll.checked = Boolean; };
        const disabledBoolean = (Boolean)=>{ btnCplt.disabled = Boolean; }

        chkAll.addEventListener("click",()=>{
            chkAll.checked == true
            ? chkOne.forEach((item,key)=>{
                item.checked = true;
                disabledBoolean(false);
                addCls(labOne[key],"checked");
            })
            : chkOne.forEach((item,key)=>{
                item.checked = false;
                disabledBoolean(true);
                removeCls(labOne[key],"checked");
            })
        })
        chkOne.forEach((item,key)=>{
            item.addEventListener("click",()=>{
                const chkOneAll = document.querySelectorAll('input[name="chkOne"]:checked');

                item.checked == true
                ? addCls(labOne[key],"checked")
                : removeCls(labOne[key],"checked");

                setTimeout(()=>{
                    chkOneAll.length < chkOne.length
                    && checkBoolean(false);
                    
                    chkOneAll.length == chkOne.length
                    && checkBoolean(true);

                    chkOneAll.length >= 1
                    ? disabledBoolean(false)
                    : disabledBoolean(true);
                }, 120);
            })
        })
    }
    // custom select box UI controls select tag
    if( elBody.contains(document.querySelector(".custom_select")) ){
        const elSelect = document.querySelector("select"),
            selectedArea = document.querySelector(".category"),
            selectBox = document.querySelector(".custom_select"),
            selectUl = document.querySelector(".custom_select ul"),
            selectList = document.querySelectorAll(".custom_select ul li");

        elSelect.addEventListener("change",() => { selectedArea.innerHTML = this.value; })

        selectedArea.addEventListener("click",() => {
            toggleCls(selectBox,"on");
            setTimeout(()=>{ selectUl.scrollTo(0,0); },200);
        })

        selectList.forEach((item,key) => {
            item.addEventListener("click",() => {
                selectedArea.innerHTML = item.dataset.value;
                elSelect.value = item.dataset.value;
                removeCls(selectBox,"on");

                setTimeout(()=>{ selectUl.scrollTo(0,0); },200);

                key !== 0
                ? addCls(selectedArea,"off")
                : removeCls(selectedArea,"off");
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
        : deviceCheck = "PC", osCheck = "";

        appVersion.includes("Mac") && (osCheck = "iOS");
        appVersion.includes("Android") && (osCheck = "Android");

        console.log(deviceCheck, osCheck, scrollNum);
    })
}
window.addEventListener("load",init);