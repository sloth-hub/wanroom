function MoveTabs({ $app, canvas }) {
    let selectedItem;
    const moveTabComp = ["flipX", "remove", "reset", "finish"];
    const moveTab = document.createElement("div");
    moveTab.className = "move-tabs ";
    moveTabComp.forEach(v => {
        let btn = document.createElement("button");
        btn.id = v;
        btn.innerText = v;
        moveTab.appendChild(btn);
    });

    function clickedMoveTab({ target }) {
        if (target.nodeName === "BUTTON") {
            switch (target.id) {
                case "flipX":
                    selectedItem = canvas.getActiveObjects()[0];
                    if (selectedItem) {
                        selectedItem.toggle("flipX");
                    }
                    break;
                case "remove":
                    selectedItem = canvas.getActiveObjects()[0];
                    if (selectedItem) {
                        canvas.remove(selectedItem);
                    }
                    break;
                case "reset":
                    canvas.remove(...canvas.getObjects());
                    break;
                case "finish":
                    itemTab.remove();
                    toggleTab.remove();
                    // moveTab.innerHTML = `<button id="prev-btn">prev</button><button id="download-btn">download</button><button id="share-btn">share</button>`;
                    break;
                case "prev":
                    // moveTab.innerHTML = moveTabComp;
                    break;
            }
        }
    }

    this.render = () => {
        $app.appendChild(moveTab);
        $app.addEventListener("click", e => clickedMoveTab(e));
    }
    this.render();
}

export default MoveTabs;