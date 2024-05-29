import React, { useRef, useState } from 'react';

function DragAndDrop({ shortcuts, setShortcuts }) {
  const dragShortcut = useRef(null);
  const draggedOverShortcut = useRef(null);
  const touchStartIndex = useRef(null);
  const [draggedElementStyle, setDraggedElementStyle] = useState({});
  const [draggedElementContent, setDraggedElementContent] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const touchTimeout = useRef(null);

  const handleSort = () => {
    const shortcutsClone = [...shortcuts];

    // Update the shortcutPriority
    shortcutsClone[dragShortcut.current].shortcutPriority = draggedOverShortcut.current;
    shortcutsClone[draggedOverShortcut.current].shortcutPriority = dragShortcut.current;

    // Swap the shortcuts
    const temp = shortcutsClone[dragShortcut.current];
    shortcutsClone[dragShortcut.current] = shortcutsClone[draggedOverShortcut.current];
    shortcutsClone[draggedOverShortcut.current] = temp;

    setShortcuts(shortcutsClone);
    setDraggedElementStyle({});
    setDraggedElementContent(null);
    setIsDragging(false);
  };

  const handleTouchStart = (index, event) => {
    touchStartIndex.current = index;
    touchTimeout.current = setTimeout(() => {
      const touch = event.targetTouches[0];
      setDraggedElementStyle({
        position: 'absolute',
        top: `${touch.clientY}px`,
        left: `${touch.clientX}px`,
        pointerEvents: 'none',
      });
      setDraggedElementContent(shortcuts[index]);
      setIsDragging(true);
    }, 300); // 300 ms delay to differentiate a tap from a drag
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    e.preventDefault();
    const touch = e.targetTouches[0];
    setDraggedElementStyle((prevStyle) => ({
      ...prevStyle,
      top: `${touch.clientY}px`,
      left: `${touch.clientX}px`,
    }));

    const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
    const listItem = elementUnderTouch && elementUnderTouch.closest('li');

    if (listItem) {
      const index = Array.from(listItem.parentNode.children).indexOf(listItem);
      if (index !== -1) {
        draggedOverShortcut.current = index;
      }
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(touchTimeout.current);

    if (isDragging) {
      if (touchStartIndex.current !== null && draggedOverShortcut.current !== null) {
        dragShortcut.current = touchStartIndex.current;
        handleSort();
      }
      touchStartIndex.current = null;
      draggedOverShortcut.current = null;
    }
    setIsDragging(false);
  };

  return (
    <>
      <ul className="flex flex-col gap-2.5">
        {shortcuts.map((shortcut, index) => (
          shortcut ? (
            <li
              key={index}
              className="relative flex items-center justify-start w-full gap-2.5 text-white list-none"
              draggable
              onDragStart={(e) => {
                dragShortcut.current = index;
              }}
              onDragEnter={(e) => {
                e.preventDefault();
                draggedOverShortcut.current = index;
              }}
              onDragEnd={handleSort}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onTouchStart={(e) => handleTouchStart(index, e)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="grid place-content-center w-4 h-4 bg-blue-600 rounded-full text-xs">
                {index + 1}
              </div>
              {shortcut.name}
            </li>
          ) : null
        ))}
      </ul>
      {isDragging && draggedElementContent && (
        <div style={draggedElementStyle} className="pointer-events-none">
          <div className="relative flex items-center justify-start w-full gap-2.5 text-white list-none">
            <div className="grid place-content-center w-4 h-4 bg-blue-600 rounded-full text-xs">
              {touchStartIndex.current + 1}
            </div>
            {draggedElementContent.name}
          </div>
        </div>
      )}
    </>
  );
}

export default DragAndDrop;
