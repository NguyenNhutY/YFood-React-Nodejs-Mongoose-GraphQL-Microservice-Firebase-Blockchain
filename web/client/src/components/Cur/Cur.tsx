import React, { useRef, useState, useEffect, useCallback }  from "preact/hooks";
import "./cur.scss";
import { FunctionalComponent } from "preact";

type CursorProps = {
  color?: string;
  outerAlpha?: number;
  innerSize?: number;
  outerSize?: number;
  outerScale?: number;
  innerScale?: number;
};

function useEventListener<T extends EventTarget>(
  eventName: string,
  handler: (event: Event) => void,
  element: T = (document as unknown) as T
) {
  const savedHandler = useRef<(event: Event) => void>();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && (element as any).addEventListener;
    if (!isSupported) return;

    const eventListener = (event: Event) => savedHandler.current?.(event);

    (element as any).addEventListener(eventName, eventListener);

    return () => {
      (element as any).removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
}

const Cursor: FunctionalComponent<CursorProps> = ({
  color = "220, 90, 90",
  outerAlpha = 0.4,
  innerSize = 8,
  outerSize = 8,
  outerScale = 5,
  innerScale = 0.7,
}) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();
  const [coords, setCoords] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isVisible, setIsVisible] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isActiveClickable, setIsActiveClickable] = useState(false);
  const endX = useRef(0);
  const endY = useRef(0);

  const onMouseMove = useCallback(({ clientX, clientY }: MouseEvent) => {
    setCoords({ x: clientX, y: clientY });
    if (cursorInnerRef.current) {
      cursorInnerRef.current.style.top = `${clientY}px`;
      cursorInnerRef.current.style.left = `${clientX}px`;
    }
    endX.current = clientX;
    endY.current = clientY;
  }, []);

  const animateOuterCursor = useCallback(
    (time: number) => {
      if (previousTimeRef.current !== undefined) {
        coords.x += (endX.current - coords.x) / 8;
        coords.y += (endY.current - coords.y) / 8;
        if (cursorOuterRef.current) {
          cursorOuterRef.current.style.top = `${coords.y}px`;
          cursorOuterRef.current.style.left = `${coords.x}px`;
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animateOuterCursor);
    },
    [coords]
  );

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animateOuterCursor);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animateOuterCursor]);

  const onMouseDown = useCallback(() => setIsActive(true), []);
  const onMouseUp = useCallback(() => setIsActive(false), []);
  const onMouseEnter = useCallback(() => setIsVisible(true), []);
  const onMouseLeave = useCallback(() => setIsVisible(false), []);

  useEventListener("mousemove", onMouseMove);
  useEventListener("mousedown", onMouseDown);
  useEventListener("mouseup", onMouseUp);
  useEventListener("mouseenter", onMouseEnter);
  useEventListener("mouseleave", onMouseLeave);

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.transform = isActive
        ? `scale(${innerScale})`
        : "scale(1)";
      cursorOuterRef.current.style.transform = isActive
        ? `scale(${outerScale})`
        : "scale(1)";
    }
  }, [innerScale, outerScale, isActive]);

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      if (isActiveClickable) {
        cursorInnerRef.current.style.transform = `scale(${innerScale * 1.3})`;
        cursorOuterRef.current.style.transform = `scale(${outerScale * 1.4})`;
      }
    }
  }, [innerScale, outerScale, isActiveClickable]);

  useEffect(() => {
    if (cursorInnerRef.current && cursorOuterRef.current) {
      cursorInnerRef.current.style.opacity = isVisible ? "1" : "0";
      cursorOuterRef.current.style.opacity = isVisible ? "1" : "0";
    }
  }, [isVisible]);

  useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, input[type="submit"], input[type="image"], label[for], select, button, .link'
    );

    const handleMouseOver = () => setIsActive(true);
    const handleClick = () => {
      setIsActive(true);
      setIsActiveClickable(false);
    };
    const handleMouseDown = () => setIsActiveClickable(true);
    const handleMouseUp = () => setIsActive(true);
    const handleMouseOut = () => {
      setIsActive(false);
      setIsActiveClickable(false);
    };

    clickables.forEach((el) => {
      (el as HTMLElement).style.cursor = "none";
      el.addEventListener("mouseover", handleMouseOver);
      el.addEventListener("click", handleClick);
      el.addEventListener("mousedown", handleMouseDown);
      el.addEventListener("mouseup", handleMouseUp);
      el.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      clickables.forEach((el) => {
        el.removeEventListener("mouseover", handleMouseOver);
        el.removeEventListener("click", handleClick);
        el.removeEventListener("mousedown", handleMouseDown);
        el.removeEventListener("mouseup", handleMouseUp);
        el.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, [isActive]);

  const styles = {
    cursor: {
      zIndex: 999,
      position: "fixed",
      opacity: 1,
      pointerEvents: "none",
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
    cursorInner: {
      position: "fixed",
      borderRadius: "50%",
      width: innerSize,
      height: innerSize,
      pointerEvents: "none",
      backgroundColor: `rgba(${color}, 1)`,
      transition: "opacity 0.15s ease-in-out, transform 0.25s ease-in-out",
    },
    cursorOuter: {
      position: "fixed",
      borderRadius: "50%",
      pointerEvents: "none",
      width: outerSize,
      height: outerSize,
      backgroundColor: `rgba(${color}, ${outerAlpha})`,
      transition: "opacity 0.15s ease-in-out, transform 0.15s ease-in-out",
    },
  };

  return (
    <>
      <div ref={cursorOuterRef} style={styles.cursorOuter} />
      <div ref={cursorInnerRef} style={styles.cursorInner} />
    </>
  );
};

export default Cursor;
