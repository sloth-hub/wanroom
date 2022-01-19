const container = document.querySelector(".container");
const canvas = new fabric.Canvas("display", { width: 768, height: container.offsetHeight });
canvas.selection = false;
const start = document.querySelector(".start-btn");
const itemsWrap = document.createElement("div");
let moveTab = document.createElement("div");
let toggleTab = document.createElement("div");
let itemList;
let itemData;
let x = 0;
let y = 0;
let SCALE = 1.5;

init();

function init() {

    start.addEventListener("click", async ({ target }) => {
        if (target.className === "start-btn") {
            itemsWrap.className = "items-wrap";
            moveTab.className = "move-tab";
            toggleTab.className = "tab-toggle";
            toggleTab.innerText = "▼";
            container.removeChild(target);
            container.appendChild(moveTab);
            container.appendChild(toggleTab);
            container.appendChild(itemsWrap);

            moveTab.innerHTML = `
            <button id="top-btn">▲</button>
            <button id="bottom-btn">▼</button>
            <button id="left-btn">◀</button>
            <button id="right-btn">▶</button>
            <button id="zoomIn-btn">+</button>
            <button id="zoomOut-btn">-</button>
            <button id="middle-btn">■</button>
            `;
            itemsWrap.innerHTML = `
            <ul class="item-tab"></ul>
            <ul class="item-list"></ul>`;

            itemData = await axios.get("test.json")
                .then(({ data }) => data)
                .catch(error => console.log(error));
            itemTab = document.querySelector(".item-tab");
            itemList = document.querySelector(".item-list");
            itemList.innerHTML = `<p class="item-list-msg">Click on the tab!</p>`;

            for (let key in itemData) {
                itemTab.innerHTML += `<li>${key}</li>`;
            }

            canvas.setBackgroundImage("./images/room.png", canvas.renderAll.bind(canvas), {
                left: (canvas.width / 2 - 600 / 2),
                top: (canvas.height / 2 - 600 / 1.8)
            });

            menuInit(itemTab);
        }
    });
}

function menuInit(itemTab) {
    moveTab.addEventListener("click", clickedMoveTab);
    toggleTab.addEventListener("click", tabToggle);
    itemTab.addEventListener("click", clickedTab);
    itemList.addEventListener("click", clickedList);
}

function clickedMoveTab({ target }) {
    if (target.nodeName === "BUTTON") {
        if (target.id === "top-btn") {
            moveToPosition(x, y-=50);
        } else if (target.id === "bottom-btn") {
            moveToPosition(x, y+=50);
        } else if (target.id === "left-btn") {
            moveToPosition(x -= 50, y);
        } else if (target.id === "right-btn") {
            moveToPosition(x += 50, y);
        } else if (target.id === "zoomIn-btn") {
            canvas.setZoom(canvas.getZoom() * SCALE);
            canvas.setWidth(canvas.getWidth() * SCALE);
            canvas.setHeight(canvas.getHeight() * SCALE);
        } else if (target.id === "zoomOut-btn") {
            if(canvas.getZoom() > 1) {
                canvas.setZoom(canvas.getZoom() / SCALE);
                canvas.setWidth(canvas.getWidth() / SCALE);
                canvas.setHeight(canvas.getHeight() / SCALE);
            }
        } else {
            canvas.absolutePan({ x: x=0, y: y=0 });
            canvas.setZoom(1);
            canvas.setWidth(768);
            canvas.setHeight(container.offsetHeight);
        }
    }
}

function moveToPosition(x, y) {
    canvas.absolutePan({ x, y });
}

function tabToggle({ target }) {

    if (target.innerText === "▼") {
        target.innerText = "▲";
        target.style.bottom = "0";
        itemsWrap.classList.toggle("hide");
    } else {
        target.innerText = "▼";
        target.style.bottom = "30%";
        itemsWrap.classList.toggle("hide");
    }
}

function clickedTab({ target }) {

    itemList.innerHTML = "";
    itemData[target.innerText].forEach((e) => {
        let template = itemListTemp({
            categoryName: target.innerText,
            category: e
        });
        itemList.innerHTML += template;
    });

}

function clickedList({ target }) {
    if (target.classList.contains("background")) {
        display.style.backgroundColor = target.style.backgroundColor;
    } else if (target.className === "item-img") {
        fabric.Image.fromURL(target.src, (img) => {
            img.set({
                left: Math.floor(768 / 2 - img.width / 2),
                top: Math.floor(768 / 2 - img.height / 2),
            });
            canvas.add(img);
        });
        fabric.Object.prototype.hasControls = false;
        fabric.Object.prototype.hasBorders = false;
    }
}

function download(target) {
    target.href = canvas.toDataURL();
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