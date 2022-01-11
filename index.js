const canvas = document.getElementById("display");
const context = canvas.getContext("2d");
const start = document.querySelector(".start-btn");

let active = false;
let activeItem = null;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

init();

function init() {
    const container = document.querySelector(".container");
    canvas.width = "648";
    canvas.height = container.offsetHeight;
    const roomImg = new Image;
    roomImg.src = "./images/room.png";

    start.addEventListener("click", async ({ target }) => {
        if (target.className === "start-btn") {
            container.removeChild(target);
            context.drawImage(roomImg, (canvas.width / 2 - roomImg.width / 2), (canvas.height / 2 - roomImg.height / 1.9), 600, 600);
            const itemsWrap = document.createElement("div");
            itemsWrap.className = "items-wrap";
            container.appendChild(itemsWrap);
            itemsWrap.innerHTML = `
            <div class="tab-toggle">▼</div>
            <ul class="item-tab"></ul>
            <ul class="item-list"></ul>`;

            const itemData = await axios.get("test.json")
                .then(({ data }) => data)
                .catch(error => console.log(error));

            const itemTab = document.querySelector(".item-tab");
            const itemList = document.querySelector(".item-list");
            for (let key in itemData) {
                itemTab.innerHTML += `<li>${key}</li>`;
            }
            itemList.innerHTML = `<p class="item-list-msg">Click on the tabs!</p>`;
            clickedTab(itemTab, itemList, itemData);
            // const btn = document.createElement("a");
            // btn.innerText = "다운로드";
            // btn.download = "sample.png";
            // container.appendChild(btn);
            // btn.addEventListener("click", ({target}) => {
            //     download(target);
            // });
        }
    });
}


function clickedTab(itemTab, itemList, itemData) {
    const tabToggle = document.querySelector(".tab-toggle");;

    tabToggle.addEventListener("click", () => {
        itemList.classList.toggle("hide");
        itemTab.classList.toggle("hide");
        if (tabToggle.innerText === "▼") {
            tabToggle.innerText = "▲";
        } else {
            tabToggle.innerText = "▼";
        }
    });

    itemTab.addEventListener("click", ({ target }) => {

        let categoryName = target.innerText;
        itemList.innerHTML = "";
        itemData[categoryName].forEach((e) => {
            let template = itemListTemp({ categoryName, category: e });
            itemList.innerHTML += template;
        });
        clickedItemList(itemList, categoryName);

    });
}

function itemListTemp(arguments) {
    if (arguments.categoryName === "background") {
        return `
        <li class="list-item ${arguments.categoryName}" style="background-color: ${arguments.category.colorCode}"></li>
        `;
    } else {
        return `<li class="list-item ${arguments.categoryName}"><img class="item-img" src="${arguments.category.img}"></li>`;
    }
}


function download(target) {
    target.href = canvas.toDataURL();
}

function clickedItemList(itemList, categoryName) {

    itemList.addEventListener("click", ({ target }) => {
        if (target.innerText === "background") {
            console.log("");
            // display.style.backgroundColor = target.style.backgroundColor;
        } else if (target.className === "item-img") {
            let item = document.createElement("img");
            item.classList.add("item");
            item.src = target.src;
            room.appendChild(item);
        }
    });
}

function onClickedItem() {
    room.addEventListener("touchstart", dragStart, { passive: false });
    room.addEventListener("touched", dragEnd, { passive: false });
    room.addEventListener("touchmove", drag, { passive: false });

    room.addEventListener("mousedown", dragStart, { passive: false });
    room.addEventListener("mouseup", dragEnd, { passive: false });
    room.addEventListener("mousemove", drag, { passive: false });
}

function dragStart(e) {

    if (e.target !== e.currentTarget) {
        active = true;
        activeItem = e.target;
        room.appendChild(activeItem);

        if (activeItem !== null) {
            if (!activeItem.xOffset) {
                activeItem.xOffset = 0;
            }

            if (!activeItem.yOffset) {
                activeItem.yOffset = 0;
            }

            if (e.type === "touchstart") {
                activeItem.initialX = e.touches[0].clientX - activeItem.xOffset;
                activeItem.initialY = e.touches[0].clientY - activeItem.yOffset;
            } else {
                activeItem.initialX = e.clientX - activeItem.xOffset;
                activeItem.initialY = e.clientY - activeItem.yOffset;
            }
        }
    }
}

function dragEnd(e) {
    if (activeItem !== null) {
        activeItem.initialX = activeItem.currentX;
        activeItem.initialY = activeItem.currentY;
    }

    active = false;
    activeItem = null;
}

function drag(e) {
    if (active) {
        if (e.type === "touchmove") {
            e.preventDefault();

            activeItem.currentX = e.touches[0].clientX - activeItem.initialX;
            activeItem.currentY = e.touches[0].clientY - activeItem.initialY;
        } else {
            activeItem.currentX = e.clientX - activeItem.initialX;
            activeItem.currentY = e.clientY - activeItem.initialY;
        }

        activeItem.xOffset = activeItem.currentX;
        activeItem.yOffset = activeItem.currentY;

        setTranslate(activeItem.currentX, activeItem.currentY, activeItem);
    }
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}
