import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs/bundled/rough.cjs.js';
import {
  adjustElementCoord,
  adjustmentRequired,
  createShape,
  cursorForPosition,
  drawElement,
  getElementAtPosition,
  resizedCoords,
  updateElement,
} from '@/utils/elementUtilities';
import { useCanvasContext } from '@/contextAPI/context';

export default function Canvas({ elementRef }) {
  const [action, setAction] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const {
    tool,
    elements,
    setElements,
    color,
    radius,
    smoothing,
    thinning,
    taperStart,
    taperEnd,
    shapeRoughness,
    useFill,
    hachureAngle,
    hachureGap,
    canvasRef,
  } = useCanvasContext();
  const isShiftPressed = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#FFF'; // Set the background color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //  Initialize RoughJS Canvas
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => drawElement(roughCanvas, ctx, element));

    const resize = () => {
      ctx.canvas.width = elementRef.current.clientWidth;
      ctx.canvas.height = elementRef.current.clientHeight;
      ctx.canvas.style.width = `${elementRef.current.clientWidth}px`;
      ctx.canvas.style.height = `${elementRef.current.clientHeight}px`;
      elements.forEach((element) => drawElement(roughCanvas, ctx, element));
    };
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [canvasRef, elementRef, elements]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Shift') {
        isShiftPressed.current = true;
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === 'Shift') {
        isShiftPressed.current = false;
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // ==========================================================================
  // =============<<< MouseDown >>>============================================
  // ==========================================================================
  const handleMouseDown = (e) => {
    e.preventDefault();
    let x, y;
    // Determine x,y offset based on mouse or touch device:
    if (e.touches) {
      const { clientX, clientY } = e.touches[0];
      const rect = e.target.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
    } else {
      const { offsetX, offsetY } = e.nativeEvent;
      x = offsetX;
      y = offsetY;
    }

    if (tool === 'delete') {
      const elementToDelete = getElementAtPosition(x, y, elements);
      if (elementToDelete) {
        const elementsCopy = [...elements];
        const updatedElements = elementsCopy
          .filter((element) => element.id !== elementToDelete.id)
          .map((element, index) => {
            return { ...element, id: index };
          });
        setElements(updatedElements);
      }
      return;
    }

    if (action === 'writing') return;

    if (tool === 'selection') {
      const element = getElementAtPosition(x, y, elements);
      if (element) {
        if (element.type === 'pen') {
          const xOffsets = element.points.map((point) => x - point.x);
          const yOffsets = element.points.map((point) => y - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        } else {
          const offsetX = x - element.x1;
          const offsetY = y - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }
        setElements((prev) => prev);

        if (element.position === 'inside') {
          setAction('moving');
        } else {
          setAction('resizing');
        }
      }
    } else {
      const id = elements.length;
      const element = createShape(
        id,
        x,
        y,
        x,
        y,
        tool,
        color,
        radius,
        smoothing,
        thinning,
        taperStart,
        taperEnd,
        shapeRoughness,
        useFill,
        hachureAngle,
        hachureGap,
        isShiftPressed.current
      );
      setElements((prev) => [...prev, element]);
      setSelectedElement(element);
      setAction(tool === 'text' ? 'writing' : 'draw');
    }
  };

  // ==========================================================================
  // =============<<< MouseMove >>>============================================
  // ==========================================================================
  const handleMouseMove = (e) => {
    let x, y;
    // Determine x,y offset based on mouse or touch device:
    if (e.touches) {
      const { clientX, clientY } = e.touches[0];
      const rect = e.target.getBoundingClientRect();
      x = clientX - rect.left;
      y = clientY - rect.top;
    } else {
      const { offsetX, offsetY } = e.nativeEvent;
      x = offsetX;
      y = offsetY;
    }

    // Set cursor to 'move' when hovering over movable element
    if (tool === 'selection') {
      const element = getElementAtPosition(x, y, elements);
      e.target.style.cursor = element
        ? cursorForPosition(element.position)
        : 'default';
    }

    if (action === 'draw') {
      const index = elements.length - 1;
      const { x1, y1 } = elements[index];

      updateElement(
        elements,
        setElements,
        index,
        x1,
        y1,
        x,
        y,
        tool,
        color,
        radius * 0.25, // Adjust thickness of shape elements to complement pen thickness
        smoothing,
        thinning,
        taperStart,
        taperEnd,
        shapeRoughness,
        useFill,
        hachureAngle,
        hachureGap,
        isShiftPressed.current // When isShiftPressed, rectangles and ellipses will be restricted to 1:1 ratio
      );
    } else if (action === 'moving') {
      if (selectedElement.type === 'pen') {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: x - selectedElement.xOffsets[index],
          y: y - selectedElement.yOffsets[index],
        }));
        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY, roughShape } =
          selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const updateX = x - offsetX;
        const updateY = y - offsetY;
        updateElement(
          elements,
          setElements,
          id,
          updateX,
          updateY,
          updateX + width,
          updateY + height,
          type,
          roughShape.options.stroke,
          roughShape.options.strokeWidth,
          smoothing,
          thinning,
          taperStart,
          taperEnd,
          roughShape.options.roughness,
          roughShape.options.fill,
          roughShape.options.hachureAngle,
          roughShape.options.hachureGap,
          isShiftPressed.current
        );
      }
    } else if (action === 'resizing') {
      const { id, type, position, roughShape, ...coordinates } =
        selectedElement;
      const { x1, y1, x2, y2 } = resizedCoords(x, y, position, coordinates);
      updateElement(
        elements,
        setElements,
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughShape.options.stroke,
        roughShape.options.strokeWidth,
        smoothing,
        thinning,
        taperStart,
        taperEnd,
        roughShape.options.roughness,
        roughShape.options.fill,
        roughShape.options.hachureAngle,
        roughShape.options.hachureGap,
        isShiftPressed.current
      );
    }
  };

  // ==========================================================================
  // =============<<< MouseUp and MouseOut >>>=================================
  // ==========================================================================
  const handleMouseUp = () => {
    if (!selectedElement) return;
    const index = selectedElement.id;

    const { id, type, roughShape } = elements[index];
    if (
      (action === 'draw' || action === 'resizing') &&
      adjustmentRequired(type)
    ) {
      const { x1, y1, x2, y2 } = adjustElementCoord(elements[index]);

      updateElement(
        elements,
        setElements,
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        roughShape.options.stroke,
        roughShape.options.strokeWidth,
        smoothing,
        thinning,
        taperStart,
        taperEnd,
        roughShape.options.roughness,
        roughShape.options.fill,
        roughShape.options.hachureAngle,
        roughShape.options.hachureGap,
        isShiftPressed.current
      );
    }
    setAction('none');
    setSelectedElement(null);
    console.log('Element', selectedElement.roughShape);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
      style={{ touchAction: 'manipulation' }}
      className='bg-white h-full w-full rounded-xl select-none touch-none cursor-crosshair'
    />
  );
}
