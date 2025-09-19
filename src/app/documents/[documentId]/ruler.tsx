import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const RULER_WIDTH = 816; // px
const MIN_CONTENT_WIDTH = 100; // px between left and right margins
const HANDLE_WIDTH = 16; // visual handle width for clamping feel

const markers = Array.from({ length: 83 }, (_, i) => i); // 0..82 => 83 markers

function Ruler() {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const rulerRef = useRef<HTMLDivElement>(null);

  const stopDragging = useCallback(() => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  }, []);

  // Attach window listeners so drag continues smoothly even if leaving the ruler area.
  useEffect(() => {
    const onUp = () => stopDragging();
    window.addEventListener('mouseup', onUp);
    window.addEventListener('mouseleave', onUp);
    return () => {
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('mouseleave', onUp);
    };
  }, [stopDragging]);

  const onLeftMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingLeft(true);
  }, []);

  const onRightMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingRight(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if ((!isDraggingLeft && !isDraggingRight) || !rulerRef.current) return;

      const container = rulerRef.current.querySelector('#ruler-container') as HTMLDivElement | null;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const rawPosition = Math.max(0, Math.min(RULER_WIDTH, relativeX));

      if (isDraggingLeft) {
        // Left marker cannot cross into right margin minus MIN_CONTENT_WIDTH
        const maxLeft = RULER_WIDTH - rightMargin - MIN_CONTENT_WIDTH;
        const newLeft = Math.max(0, Math.min(maxLeft, rawPosition));
        setLeftMargin(newLeft);
      } else if (isDraggingRight) {
        // Right marker moves from the right edge; compute distance from right
        const fromRight = Math.max(0, Math.min(RULER_WIDTH, RULER_WIDTH - rawPosition));
        // Right marker cannot cross into left margin minus MIN_CONTENT_WIDTH
        const maxRight = RULER_WIDTH - leftMargin - MIN_CONTENT_WIDTH;
        const newRight = Math.max(0, Math.min(maxRight, fromRight));
        setRightMargin(newRight);
      }
    },
    [isDraggingLeft, isDraggingRight, leftMargin, rightMargin],
  );

  const numbers = useMemo(() => markers, []);

  return (
    <div
      ref={rulerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
    >
      <div id="ruler-container" className="max-w-[816px] mx-auto w-full h-full relative">
        {/* Left marker */}
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={onLeftMouseDown}
          onDoubleClick={() => setLeftMargin(56)}
        />

        {/* Right marker */}
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={onRightMouseDown}
          onDoubleClick={() => setRightMargin(56)}
        />

        {/* Ticks */}
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full" style={{ width: `${RULER_WIDTH}px` }}>
            {numbers.map((marker) => {
              const position = (marker * RULER_WIDTH) / (markers.length - 1); // 0..816
              const isMajor = marker % 10 === 0;
              const isMid = marker % 5 === 0 && !isMajor;

              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {isMajor && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {isMid && <div className="absolute bottom-0 w-[1px] h-1.5 bg-neutral-500" />}
                  {!isMajor && !isMid && (
                    <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual content area (optional): shows the area between margins */}
        <div
          className="absolute bottom-0 top-0 pointer-events-none"
          style={{
            left: `${leftMargin}px`,
            right: `${rightMargin}px`,
          }}
        />
      </div>
    </div>
  );
}

interface MarkerProps {
  position: number; // px from edge indicated by isLeft
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onDoubleClick: () => void;
}

const Marker = ({
  position,
  isLeft,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: MarkerProps) => {
  return (
    <div
      className={`absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2 ${
        isDragging ? 'opacity-100' : 'opacity-100'
      }`}
      style={{ [isLeft ? 'left' : 'right']: `${position}px` } as React.CSSProperties}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
      title={`${isLeft ? 'Left' : 'Right'} margin: ${Math.round(position)}px`}
    >
      <FaCaretDown className="left-1/2 absolute top-0 h-full fill-blue-500 transform -translate-x-1/2" />
      <div
      className='absolute left-1/2 top-4 transform -translate-x-1/2 duration-150'
      style={{
        height: "100vh",
        width: "1px",
        transform: "scaleX(0.5)",
        backgroundColor: "#3b72f6",
        display: isDragging ? "block" : "none",
      }}
      />
    </div>
  );
};

export default Ruler;
