// src/components/DragAndDropModal.tsx
import React  from "preact/hooks";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./modalMusic.scss";
import { FunctionalComponent } from "preact";

interface Song {
  title: string;
  url: string;
}

interface DragAndDropModalProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
  setSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const DragAndDropModal: FunctionalComponent<DragAndDropModalProps> = ({
  isOpen,
  onClose,
  songs,
  setSongs,
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reorderedSongs = Array.from(songs);
    const [removed] = reorderedSongs.splice(result.source.index, 1);
    reorderedSongs.splice(result.destination.index, 0, removed);

    setSongs(reorderedSongs);

    // Nếu bài hát đầu tiên thay đổi, phát bài hát đó
    if (result.destination.index === 0) {
      setTimeout(() => {
        playSong(0); // Thêm hàm này từ props hoặc context để phát bài hát đầu tiên
      }, 0);
    }
  };

  if (!isOpen) return null;

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLElement).classList.contains("modal-music-overlay")) {
      onClose();
    }
  };

  return (
    <div class='modal-music-overlay' onClick={handleOverlayClick}>
      <div class='modal-music-content'>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='songs'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {songs.map((song, index) => (
                  <Draggable
                    key={song.url}
                    draggableId={song.url}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        class='draggable-item'
                      >
                        {song.title}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div class='modal-footer'>
          <button class='modal-ok-button' onClick={onClose}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default DragAndDropModal;
