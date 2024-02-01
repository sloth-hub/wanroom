import MoveTab from "./MoveTab.js";

function ItemTab({ $app }) {
    let items = [];
    const itemTabs = document.createElement("div");
    itemTabs.className = "item-tabs";
    itemTabs.innerHTML = `
            <ul class="item-tab">
            </ul>
            <ul class="item-list">
            </ul>`;

    // itemData = await axios.get("item.json")
    //     .then(({ data }) => data)
    //     .catch(error => console.log(error));
    // itemTab = document.querySelector(".item-tab");
    // itemList = document.querySelector(".item-list");
    // itemList.innerHTML = `<p class="item-list-msg">Click on the tab!</p>`;

    // for (let key in itemData) {
    //     itemTab.innerHTML += `<li>${key}</li>`;
    // }

    async function getItems() {
        return await axios.get("./item.json")
            .then(({ data }) => data)
            .catch(error => console.log(error));;
    }

    this.render = async () => {
        $app.appendChild(itemTabs);
        items = await getItems();
        const itemTab = document.querySelector(".item-tab");
        for (let key in items) {
            itemTab.innerHTML += `<li>${key}</li>`;
        }
    }
    this.render();
}

export default ItemTab;