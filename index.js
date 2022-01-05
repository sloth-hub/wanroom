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
    startbtn.addEventListener("click", async ({ target }) => {
        display.removeChild(target);
        room.classList.remove("hide");
        const itemListWrap = document.createElement("div");
        itemListWrap.classList.add("item-list-wrap");
        itemListWrap.innerHTML = `
        <div class="tab-toggle">▼</li></div>
        <ul class="item-tab">
        <li class="item-tab category">comfort</li>
        <li class="item-tab category">table</li>
        <li class="item-tab category">storage</li>
        <li class="item-tab category">decorations</li>
        <li class="item-tab category">wall</li>
        <li class="item-tab category">floor</li>
        <li class="item-tab category">background</li>
        </ul>
        <ul class="item-list">
        </ul>`;
        const itemData = await axios.get("test.json")
            .then(({ data }) => data);
        container.appendChild(itemListWrap);
        onClickedItem();
        onClickedTab(itemListWrap, itemData);
    });

}

function clickedItemList(itemListWrap, categoryName) {
    itemListWrap.addEventListener("click", ({ target }) => {
        if (categoryName === "background") {
            room.style.backgroundColor = target.style.backgroundColor;
        } else if (target.className === "item-img") {
            let item = document.createElement("img");
            item.classList.add("item");
            item.src = target.src;
            room.appendChild(item);
        }
    });
}

function onClickedTab(itemListWrap, itemData) {
    const tabToggle = itemListWrap.querySelector(".tab-toggle");
    const itemList = itemListWrap.querySelector(".item-list");
    const itemTab = itemListWrap.querySelector(".item-tab");

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
        if (target.className === "item-tab category") {
            let categoryName = target.innerText;
            itemList.innerHTML = "";
            itemData[categoryName].forEach((e) => {
                let template = itemListTemp({ categoryName, category: e });
                itemList.innerHTML += template;
            });
            clickedItemList(itemListWrap, categoryName);
        }
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
