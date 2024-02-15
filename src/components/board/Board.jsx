import { useEffect, useRef, useState } from 'react';
import './board.css';

const Board = ({ objects, setObjects }) => {
  const boardRef = useRef(null);
  const imgRef = useRef(null);
  const [mouseCursor, setMouseCursor] = useState();

  const handleDragStart = (e, object) => {
    e.dataTransfer.setData('text/plain', JSON.stringify(object));
  };

  const handleDragEnd = (e, object) => {
    if (!boardRef.current) return;
    const { left, top, bottom, right } = boardRef.current.getBoundingClientRect();
    let elem = document.getElementById(object.id);
    const imgRect = elem.getBoundingClientRect();
    const xRadius = mouseCursor.x - imgRect.left;
    const xRadius2 = imgRect.right - mouseCursor.x;
    const yRadius = mouseCursor.y - imgRect.top;
    const yRadius2 = imgRect.bottom - mouseCursor.y;
    
    if (
      e.clientX - xRadius >= left &&
      e.clientX + xRadius2 <= right &&
      e.clientY - yRadius >= top &&
      e.clientY + yRadius2 <= bottom
    ) {
      const newObjects = objects.map((o) =>
        o.id === object.id
          ? { ...o, x: e.clientX - xRadius, y: e.clientY - yRadius }
          : o
      );
      setObjects(newObjects);
    } else if (
      e.clientX - xRadius < left - 20 ||
      e.clientX + xRadius2 > right  + 20 ||
      e.clientY - yRadius < top - 20 ||
      e.clientY + yRadius2 > bottom + 20
    ) {
      const newObjects = objects.filter((o) => o.id !== object.id);
      setObjects(newObjects);
    } else {
      const newObjects = objects.map((o) =>
        o.id === object.id  && left - e.clientX + xRadius < 20 && top - e.clientY + yRadius < 20
          && left - e.clientX + xRadius > 0 && top - e.clientY + yRadius > 0
        ? { ...o, x: left, y: top } 
        : o.id === object.id  && e.clientX + xRadius2 - right < 20 && top - e.clientY + yRadius < 20
          && e.clientX + xRadius2 - right > 0 && top - e.clientY + yRadius > 0
        ? { ...o, x: right - 100, y: top }
        : o.id === object.id && left - e.clientX + xRadius < 20 && e.clientY + yRadius2 - bottom < 20
          && left - e.clientX + xRadius > 0 && e.clientY + yRadius2 - bottom > 0
        ? {... o, x: left, y: bottom - 100 }
        : o.id === object.id && e.clientX + xRadius2 - right < 20 && e.clientY + yRadius2 - bottom < 20
          && e.clientX + xRadius2 - right > 0 && e.clientY + yRadius2 - bottom > 0
        ? { ...o, x: right - 100, y: bottom - 100 }

        : o.id === object.id  && left - e.clientX + xRadius < 20 && left - e.clientX + xRadius > 0 
        ? { ...o, x: left, y: e.clientY - yRadius }
        : o.id === object.id  && e.clientX + xRadius2 - right < 20 && e.clientX + xRadius2 - right > 0 
        ? { ...o, x: right - 100, y: e.clientY - yRadius }
        : o.id === object.id && top - e.clientY + yRadius < 20 && top - e.clientY + yRadius > 0
        ? { ...o, x: e.clientX - xRadius, y: top }
        : o.id === object.id && e.clientY + yRadius2 - bottom < 20 && e.clientY + yRadius2 - bottom > 0
        ? { ...o, x: e.clientX - xRadius, y: bottom - 100 }
        : o
      )
      setObjects(newObjects);
    }
  };

  function updateDisplay(e) {
    if (e.target.id >= 0 && e.target.id) {
      setMouseCursor({ x: e.pageX, y: e.pageY });
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', updateDisplay);
    return () => document.removeEventListener('mousedown', updateDisplay);
  }, []);

  return (
    <div className="board" ref={boardRef}>
      {objects?.map((object) => (
        <img
          id={object.id}
          ref={imgRef}
          key={object.id}
          src={object.image}
          alt={object.name}
          style={{ position: 'absolute', left: object.x, top: object.y }}
          draggable
          onDragStart={(e) => handleDragStart(e, object)}
          onDragEnd={(e) => handleDragEnd(e, object)}
        />
      ))}
    </div>
  );
};

export default Board;