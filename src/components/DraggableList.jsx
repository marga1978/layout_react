import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const DragDropList = () => {
  const [items, setItems] = useState(["Elemento 1", "Elemento 2", "Elemento 3", "Elemento 4"]);
  const listRef = useRef(null);
  const positions = useRef([]);
  
  useEffect(() => {
    const elements = listRef.current.children;
    positions.current = [...elements].map((el) => el.offsetTop);

    Draggable.create(elements, {
      type: "y",
      bounds: listRef.current,
      onPress() {
        this.startIndex = [...elements].indexOf(this.target);
      },
      onDrag() {
        let closestIndex = positions.current.findIndex((pos) => this.y < pos + 20);
        if (closestIndex === -1) closestIndex = positions.current.length - 1;
        gsap.to(this.target, { y: positions.current[closestIndex] });
      },
      onDragEnd() {
        let endIndex = positions.current.findIndex((pos) => this.y < pos + 20);
        if (endIndex === -1) endIndex = positions.current.length - 1;
        const newItems = [...items];
        const [movedItem] = newItems.splice(this.startIndex, 1);
        newItems.splice(endIndex, 0, movedItem);
        setItems(newItems);
      }
    });
  }, [items]);

  return (
    <div>
      <h2>Ordina gli elementi</h2>
      <ul ref={listRef} className="drag-list">
        {items.map((item, index) => (
          <li key={item} className="draggable-item" data-id={item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DragDropList;