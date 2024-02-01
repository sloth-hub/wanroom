import Canvas from "./Canvas.js";
function App({$app}){
    this.render = () => {
            let startBtn = document.createElement("button");
            startBtn.className = "start-btn";
            startBtn.innerText = "START";
            $app.appendChild(startBtn);
            startBtn.addEventListener("click", e => {
                const canvas = new Canvas({$app, e});
            });
    };
    this.render();
};

export default App;

// const start = document.querySelector(".start-btn");
// const moveTabComp = `
// <button id="flipX-btn">◀▶</button>
// <button id="remove-btn">remove</button>
// <button id="reset-btn">reset</button>
// <button id="finish-btn">finish</button>`;
// let itemList;
// let itemData;
// let selectedItem;
// let x = 0;
// let y = 0;
// const SCALE = 1.5;

// init();

// function init() {
    
//     let itemTab = document.createElement("div");
//     let moveTab = document.createElement("div");
//     let toggleTab = document.createElement("div");

//     start.addEventListener("click", async ({ target }) => {
//         if (target.className === "start-btn") {
//             itemTab.className = "items-wrap";
//             moveTab.className = "move-tab";
//             toggleTab.className = "tab-toggle";
//             toggleTab.innerText = "▼";
//             container.removeChild(target);
//             container.appendChild(moveTab);
//             container.appendChild(toggleTab);
//             container.appendChild(itemTab);

//             moveTab.innerHTML = moveTabComp;
//             itemTab.innerHTML = `
//             <ul class="item-tab"></ul>
//             <ul class="item-list"></ul>`;

//             itemData = await axios.get("item.json")
//                 .then(({ data }) => data)
//                 .catch(error => console.log(error));
//             itemTab = document.querySelector(".item-tab");
//             itemList = document.querySelector(".item-list");
//             itemList.innerHTML = `<p class="item-list-msg">Click on the tab!</p>`;

//             for (let key in itemData) {
//                 itemTab.innerHTML += `<li>${key}</li>`;
//             }

//             canvas.setBackgroundImage("./images/room.png", canvas.renderAll.bind(canvas), {
//                 left: Math.floor(canvas.width / 2 - 500 / 2),
//                 top: Math.floor(canvas.height / 2 - 460 / 2)
//             });
//             menuInit(itemTab);
//         }
//     });
// }

// function menuInit(itemTab) {
//     moveTab.addEventListener("click", clickedMoveTab);
//     toggleTab.addEventListener("click", tabToggle);
//     itemTab.addEventListener("click", clickedTab);
//     itemList.addEventListener("click", clickedList);
// }

// function clickedMoveTab({ target }) {
//     if (target.nodeName === "BUTTON") {
//         switch (target.id) {
//             case "flipX-btn":
//                 selectedItem = canvas.getActiveObjects()[0];
//                 if (selectedItem) {
//                     selectedItem.toggle("flipX");
//                 }
//                 break;
//             case "remove-btn":
//                 selectedItem = canvas.getActiveObjects()[0];
//                 if (selectedItem) {
//                     canvas.remove(selectedItem);
//                 }
//                 break;
//             case "reset-btn":
//                 canvas.remove(...canvas.getObjects());
//                 break;
//             case "finish-btn":
//                 itemTab.remove();
//                 toggleTab.remove();
//                 moveTab.innerHTML = `<button id="prev-btn">prev</button><button id="download-btn">download</button><button id="share-btn">share</button>`;
//                 break;
//             case "prev-btn":
//                 moveTab.innerHTML = moveTabComp;
//                 break;
//         }
//     }
// }

// function moveToPosition(x, y) {
//     canvas.absolutePan({ x, y });
// }

// function tabToggle({ target }) {

//     if (target.innerText === "▼") {
//         target.innerText = "▲";
//         target.style.bottom = "0";
//         itemTab.classList.toggle("hide");
//     } else {
//         target.innerText = "▼";
//         target.style.bottom = "30%";
//         itemTab.classList.toggle("hide");
//     }
// }

// function clickedTab({ target }) {

//     itemList.innerHTML = "";
//     itemData[target.innerText].forEach((e) => {
//         let template = itemListTemp({
//             categoryName: target.innerText,
//             category: e
//         });
//         itemList.innerHTML += template;
//     });

// }

// function clickedList({ target }) {
//     if (target.classList.contains("background")) {
//         display.style.backgroundColor = target.style.backgroundColor;
//     } else if (target.dataset.category === "wall") {
//         sendBack(target);
//     } else if (target.dataset.category === "floor") {
//         sendBack(target);
//     } else {
//         fabric.Image.fromURL(target.src, (img) => {
//             canvas.add(img.set({
//                 left: Math.floor(768 / 2 - img.width / 2),
//                 top: Math.floor(768 / 2 - img.height / 2),
//                 hasControls: false
//             }));
//         });
//     }
// }

// function sendBack(target) {
//     canvas.getObjects().forEach((e) => {
//         if (e.category === target.dataset.category) {
//             canvas.remove(e);
//         }
//     });
//     fabric.Image.fromURL(target.src, (img) => {
//         img.set({
//             left: Math.floor(canvas.width / 2 - 500 / 2),
//             top: Math.floor(canvas.height / 2 - 460 / 2),
//             selectable: false,
//             evented: false,
//             hasControls: false,
//             "category": target.dataset.category
//         });
//         canvas.sendToBack(img);
//     });
// }

// function download(target) {
//     target.href = canvas.toDataURL();
// }

// function itemListTemp(arguments) {
//     if (arguments.categoryName === "background") {
//         return `
//         <li class="list-item ${arguments.categoryName}" style="background-color: ${arguments.category.colorCode}"></li>
//         `;
//     }
//     else {
//         return `<li class="list-item ${arguments.categoryName}"><img class="item-img" src="${arguments.category.img}" data-category="${arguments.category.category}"></li>`;
//     }
// }