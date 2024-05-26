import { useRef } from "react";

function DragAndDrop({ shortcuts, setShortcuts }) {
  const dragShortcut = useRef(null);
  const draggedOverShortcut = useRef(null);
  const handleSort = () => {
    const shortcutsClone = [...shortcuts];

    // Update the shortcutPriority
    shortcutsClone[dragShortcut.current].shortcutPriority = draggedOverShortcut.current ;
    shortcutsClone[draggedOverShortcut.current].shortcutPriority = dragShortcut.current;

    // Swap the shortcuts
    const temp = shortcutsClone[dragShortcut.current];
    shortcutsClone[dragShortcut.current] = shortcutsClone[draggedOverShortcut.current];
    shortcutsClone[draggedOverShortcut.current] = temp;

    setShortcuts(shortcutsClone);
    console.log(shortcuts)
  };

  return (
    <div>
      {shortcuts.map((shortcut, index) => (
        shortcut ? (
          <li
            key={index}
            className="w-full text-white"
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
          >
            {shortcut.name}
          </li>
        ) : null
      ))}
    </div>
  );
}

export default DragAndDrop;
