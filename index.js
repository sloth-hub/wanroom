const container = document.querySelector(".container");
const canvas = new fabric.Canvas("display", { width: 648, height: container.offsetHeight });
canvas.selection = false;
const start = document.querySelector(".start-btn");
let itemTab = document.createElement("div");
const itemsWrap = document.createElement("div");
let itemList;
let toggleTab;
let itemData;

init();

function init() {

    start.addEventListener("click", async ({ target }) => {
        if (target.className === "start-btn") {
            const roomImg = "./images/room.png";
            itemsWrap.className = "items-wrap";
            itemTab.className = "tab-toggle";
            itemTab.innerText = "▼";
            container.removeChild(target);
            container.appendChild(itemTab);
            container.appendChild(itemsWrap);

            itemsWrap.innerHTML = `
            <ul class="item-tab"></ul>
            <ul class="item-list"></ul>`;

            itemData = await axios.get("test.json")
                .then(({ data }) => data)
                .catch(error => console.log(error));

            itemTab = document.querySelector(".item-tab");
            itemList = document.querySelector(".item-list");
            toggleTab = document.querySelector(".tab-toggle");
            for (let key in itemData) {
                itemTab.innerHTML += `<li>${key}</li>`;
            }
            itemList.innerHTML = `<p class="item-list-msg">Click on the tab!</p>`;

            canvas.setBackgroundImage(roomImg, canvas.renderAll.bind(canvas), {
                left: (canvas.width / 2 - 600 / 2),
                top: (canvas.height / 2 - 600 / 1.9)
            });

            menuInit();
        }
    });
}

function menuInit() {

    toggleTab.addEventListener("click", tabToggle);
    itemTab.addEventListener("click", clickedTab);
    itemList.addEventListener("click", clickedList);
}

function tabToggle({ target }) {

    if (target.innerText === "▼") {
        target.innerText = "▲";
        itemsWrap.classList.toggle("hide");
    } else {
        target.innerText = "▼";
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