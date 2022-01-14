const container = document.querySelector(".container");
const canvas = new fabric.Canvas("display", { width: 648, height: container.offsetHeight });
const start = document.querySelector(".start-btn");

init();

function init() {

    const roomImg = "./images/room.png";

    start.addEventListener("click", async ({ target }) => {
        if (target.className === "start-btn") {
            container.removeChild(target);
            canvas.setBackgroundImage(roomImg, canvas.renderAll.bind(canvas), {
                left: (canvas.width / 2 - 600 / 2),
                top: (canvas.height / 2 - 600 / 1.9)
            });
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
            itemList.innerHTML = `<p class="item-list-msg">Click on the tab!</p>`;
            clickedTab(itemTab, itemList, itemData);
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

function clickedItemList(itemList, categoryName) {

    itemList.addEventListener("click", ({ target }) => {
        if (target.classList.contains(categoryName)) {
            display.style.backgroundColor = target.style.backgroundColor;
        } else if (target.className === "item-img") {
            item.src = target.src;
            x = 10;
            y = 10;
            WIDTH = item.width;
            HEIGHT = item.height;
            draw(item);
            onClickedItem();
        }
    });
}

function draw(item) {
    ctx.drawImage(item, x, y);
}

function clear() {
}

function drag(e) {
    if (isDragging) {
        x = e.clientX - canvas.offsetLeft;
        y = e.clientY - canvas.offsetTop;
        draw(item);
    }
}

function dragStart(e) {
    isDragging = true;
    x = e.clientX - canvas.offsetLeft;
    y = e.clientY - canvas.offsetTop;
}

function dragEnd() {
    isDragging = false;
}

function onClickedItem() {

    canvas.addEventListener("touchstart", dragStart, { passive: false });
    canvas.addEventListener("touched", dragEnd, { passive: false });
    canvas.addEventListener("touchmove", drag, { passive: false });

    canvas.addEventListener("mousedown", dragStart, { passive: false });
    canvas.addEventListener("mouseup", dragEnd, { passive: false });
    canvas.addEventListener("mousemove", drag, { passive: false });
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