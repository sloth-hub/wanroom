import MoveTab from "./MoveTab.js";
import ItemTab from "./ItemTab.js";

function Canvas({ $app, e }) {
    this.render = () => {
        $app.removeChild(e.target);
        const $canvas = document.createElement("canvas");
        $canvas.id = "display";
        $app.appendChild($canvas);
        const canvas = this.__canvas = new fabric.Canvas("display", { width: 768, height: $app.offsetHeight });
        canvas.selection = false;
        canvas.setBackgroundImage("./images/room.png", canvas.renderAll.bind(canvas), {
            left: Math.floor(canvas.width / 2 - 500 / 2),
            top: Math.floor(canvas.height / 2 - 460 / 2)
        });
        const moveTab = new MoveTab({$app, canvas});
        const itemTab = new ItemTab({$app, canvas});
    }
    this.render();
}

export default Canvas;