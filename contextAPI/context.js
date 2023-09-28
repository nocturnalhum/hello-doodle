import { useHistory } from '@/hooks/useHistory';
import { createContext, useContext, useRef, useState } from 'react';

const CanvasContext = createContext();
const DiffusionContext = createContext();

export default function AppStore({ children }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [color, setColor] = useState('#000');
  const [color1, setColor1] = useState('#000');
  const [color2, setColor2] = useState('#F00');
  const [color3, setColor3] = useState('#0F0');
  const [color4, setColor4] = useState('#00F');
  const [color5, setColor5] = useState('#FFC200');
  const [radius, setRadius] = useState(6);
  const [smoothing, setSmoothing] = useState(0.5);
  const [thinning, setThinning] = useState(0.3);
  const [taperStart, setTaperStart] = useState(10);
  const [taperEnd, setTaperEnd] = useState(80);
  const [shapeRoughness, setShapeRoughness] = useState(1);
  const [useFill, setUseFill] = useState(color);
  const [hachureAngle, setHachureAngle] = useState(-41);
  const [hachureGap, setHachureGap] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actions, setActions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(-1);
  const [showTools, setShowTools] = useState(true);
  const [elements, setElements, undo, redo] = useHistory([]);
  const [tool, setTool] = useState('pen');

  const canvasRef = useRef(null);

  return (
    <DiffusionContext.Provider
      value={{
        prediction,
        setPrediction,
        loading,
        setLoading,
        message,
        setMessage,
        error,
        setError,
      }}
    >
      <CanvasContext.Provider
        value={{
          canvasRef,
          isFlipped,
          setIsFlipped,
          color,
          setColor,
          color1,
          setColor1,
          color2,
          setColor2,
          color3,
          setColor3,
          color4,
          setColor4,
          color5,
          setColor5,
          radius,
          setRadius,
          taperStart,
          setTaperStart,
          taperEnd,
          setTaperEnd,
          smoothing,
          setSmoothing,
          thinning,
          setThinning,
          shapeRoughness,
          setShapeRoughness,
          useFill,
          setUseFill,
          hachureAngle,
          setHachureAngle,
          hachureGap,
          setHachureGap,
          isModalOpen,
          setIsModalOpen,
          actions,
          setActions,
          currentPosition,
          setCurrentPosition,
          tool,
          setTool,
          elements,
          setElements,
          showTools,
          setShowTools,
          undo,
          redo,
        }}
      >
        {children}
      </CanvasContext.Provider>
    </DiffusionContext.Provider>
  );
}

// Make useUserContext Hook to easily use our context throughout the application
export function useCanvasContext() {
  return useContext(CanvasContext);
}

export function useDiffusionContext() {
  return useContext(DiffusionContext);
}
