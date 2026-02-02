// src/components/MusicBar/useMusicPlayer.ts
import { useState, useRef, ChangeEvent }  from "preact/hooks";
import ReactPlayer from "react-player";

const useMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [songs, setSongs] = useState<{ title: string; url: string }[]>([
    { title: "Từng Là", url: "/video/TungLa-VuCatTuong.mp3" },
    { title: "Mai Mình Xa", url: "/video/MaiMinhXa-ThinhSuy.mp3" },
    {
      title: "Ngày Đẹp Trời Để Nói Chia Tay",
      url:
        "/video/LOU HOÀNG - NGÀY ĐẸP TRỜI ĐỂ NÓI CHIA TAY (Official Music Video).mp4",
    },
  ]);
  const playerRef = useRef<ReactPlayer>(null);

  const togglePlay = () => setIsPlaying((prev) => !prev);
  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };
  const playNext = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  };
  const playPrevious = () => {
    const previousIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(previousIndex);
  };
  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(event.target.value));
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newSong = {
        title: file.name,
        url: URL.createObjectURL(file),
      };
      setSongs((prevSongs) => [...prevSongs, newSong]);
      playSong(songs.length);
    }
  };
  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };
  const handleDuration = (duration: number) => {
    setDuration(duration);
  };
  const handleEnded = () => {
    if (repeat) {
      playerRef.current?.seekTo(0);
    } else {
      playNext();
    }
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return {
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
  };
};

export default useMusicPlayer;
