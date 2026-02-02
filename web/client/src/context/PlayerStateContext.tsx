// src/components/MusicBar/PlayerStateContext.tsx
import React, {  useContext, useState }  from "preact/hooks";
import { FunctionalComponent,createContext } from "preact";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
}

const PlayerStateContext = createContext<PlayerState | undefined>(undefined);

export const PlayerStateProvider: FunctionalComponent = ({ children }) => {
  const [state, setState] = useState<PlayerState>({
    isPlaying: true,
    volume: 0.5,
  });

  return (
    <PlayerStateContext.Provider value={state}>
      {children}
    </PlayerStateContext.Provider>
  );
};

export const usePlayerState = () => {
  const context = useContext(PlayerStateContext);
  if (!context)
    throw new Error("usePlayerState must be used within a PlayerStateProvider");
  return context;
};
