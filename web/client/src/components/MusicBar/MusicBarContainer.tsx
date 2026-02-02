// src/components/MusicBar/MusicBarContainer.tsx
import React, { useState }  from "preact/hooks";
import MusicBar from "./MusicBar";
import useMusicPlayer from "./useMusicPlayer";
import Modal from "../Modal/Modal";
import DragAndDropModal from "../Modal/ModalMusic/ModalMusic";
import { FunctionalComponent } from "preact";

const MusicBarContainer: FunctionalComponent = () => {
  const {
    isPlaying,
    currentSongIndex,
    volume,
    playedSeconds,
    duration,
    repeat,
    songs,
    playerRef,
    togglePlay,
    playSong,
    playNext,
    playPrevious,
    handleVolumeChange,
    handleFileChange,
    handleProgress,
    handleDuration,
    handleEnded,
    formatTime,
    setRepeat,
    setSongs,
  } = useMusicPlayer();

  const [showFileInput, setShowFileInput] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    if (value === "upload") {
      setShowFileInput(true);
    } else if (value === "dragDrop") {
      setIsModalOpen(true);
    } else {
      playSong(parseInt(value));
      setShowFileInput(false);
    }
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "mute";
    if (volume > 0 && volume <= 0.5) return "low";
    return "high";
  };

  return (
    <>
      <MusicBar
        isPlaying={isPlaying}
        currentSongIndex={currentSongIndex}
        volume={volume}
        playedSeconds={playedSeconds}
        duration={duration}
        repeat={repeat}
        songs={songs}
        playerRef={playerRef}
        togglePlay={togglePlay}
        playSong={playSong}
        playNext={playNext}
        playPrevious={playPrevious}
        handleVolumeChange={handleVolumeChange}
        handleFileChange={handleFileChange}
        handleProgress={handleProgress}
        handleDuration={handleDuration}
        handleEnded={handleEnded}
        formatTime={formatTime}
        setRepeat={setRepeat}
        setSongs={setSongs}
        showFileInput={showFileInput}
        setShowFileInput={setShowFileInput}
        showVolume={showVolume}
        setShowVolume={setShowVolume}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleDropdownChange={handleDropdownChange}
        getVolumeIcon={getVolumeIcon}
      />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DragAndDropModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          songs={songs}
          setSongs={setSongs}
          playSong={playSong} // Truyền hàm playSong xuống DragAndDropModal
        />
      </Modal>
    </>
  );
};

export default MusicBarContainer;
