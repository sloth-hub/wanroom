const startbtn = document.querySelector('.start-btn');
const container = document.querySelector('.container');
const display = document.querySelector(".display");
const room = document.querySelector(".room");

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
    startbtn.addEventListener("click", ({ target }) => {
        display.removeChild(target);
        room.classList.remove("hide");
        const itemListWrap = document.createElement("div");
        itemListWrap.classList.add("item-list-wrap");
        itemListWrap.innerHTML = `
        <div class="tab-toggle">▼</li></div>
        <ul class="item-tab">
        <li class="item-tab category">background</li>
        <li class="item-tab category">wall</li>
        <li class="item-tab category">floor</li>
        <li class="item-tab category">furniture</li>
        </ul>
        <ul class="item-list">
        <li class="list-item">🍎</li>
        <li class="list-item">🥨</li>
        <li class="list-item">🍌</li>
        <li class="list-item">🍞</li>
        <li class="list-item">🍳</li>
        <li class="list-item">🍇</li>
        <li class="list-item">🍑</li>
        <li class="list-item">😍</li>
        <li class="list-item">👍</li>
        <li class="list-item">🍉</li>
        </ul>`;
        container.appendChild(itemListWrap);
        clickedItemList(itemListWrap);
        onClickedItem();
        onClickedTab(itemListWrap);
    });

}

function clickedItemList(itemListWrap) {
    itemListWrap.addEventListener("click", ({ target }) => {
        if (target.className === "list-item") {
            let span = document.createElement("span");
            span.classList.add("item");
            span.appendChild(document.createTextNode(target.innerText));
            room.appendChild(span);
        }
    });
}

function onClickedTab(itemListWrap) {
    const tabToggle = itemListWrap.querySelector(".tab-toggle");
    tabToggle.addEventListener("click", ()=> {
        const itemList = itemListWrap.querySelector(".item-list");
        const itemTab = itemListWrap.querySelector(".item-tab");
        itemList.classList.toggle("hide");
        itemTab.classList.toggle("hide");
        if (tabToggle.innerText === "▼") {
            tabToggle.innerText = "▲";
        } else {
            tabToggle.innerText = "▼";
        }
    });
}

function onClickedItem() {
    room.addEventListener("touchstart", dragStart, false);
    room.addEventListener("touched", dragEnd, false);
    room.addEventListener("touchmove", drag, false);

    room.addEventListener("mousedown", dragStart, false);
    room.addEventListener("mouseup", dragEnd, false);
    room.addEventListener("mousemove", drag, false);
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
