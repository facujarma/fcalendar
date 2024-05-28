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
          >
            <div className="grid place-content-center w-4 h-4 bg-blue-600 rounded-full text-xs">
              {index+1}
            </div>
            {shortcut.name}
          </li>
        ) : null
      ))}
    </ul>
  );
}

export default DragAndDrop;
