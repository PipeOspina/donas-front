import styles from '@/styles/components/Carousel.module.css';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, useTheme, Zoom } from '@mui/material';
import { Property } from 'csstype';
import {
  FC,
  memo,
  MouseEventHandler,
  ReactNode,
  UIEventHandler,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';

interface CarouselProps {
  elements: ReactNode[];
  width?: Property.Width<string | number>;
  maxWidth?: Property.MaxWidth<string | number>;
  noArrows?: boolean;
  arrowColor?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success'
    | 'inherit'
    | 'default';
  disableOnClickScroll?: boolean;
  selectedIndex?: number;
  spacing?: number;
}

const Carousel: FC<CarouselProps> = ({
  elements,
  width,
  noArrows,
  arrowColor,
  disableOnClickScroll,
  selectedIndex,
  maxWidth,
  spacing,
}) => {
  const [showNext, setShowNext] = useState(false);
  const [showBefore, setShowBefore] = useState(false);

  const id = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const widthSize = useMemo(
    () =>
      noArrows || !width
        ? width
        : `calc(${width}${typeof width === 'string' ? '' : 'px'} - 112px)`,
    [noArrows, width],
  );
  const maxWidthSize = useMemo(
    () =>
      noArrows || !maxWidth
        ? maxWidth
        : `calc(${maxWidth}${
            typeof maxWidth === 'string' ? '' : 'px'
          } - 112px)`,
    [noArrows, maxWidth],
  );

  const idConstructor = useCallback(
    (index: number) => `CAROUSEL_ELEMENT_${id}_${index}`,
    [id],
  );

  const updateShow = useCallback((newScrollLeft: number) => {
    if (containerRef.current) {
      const noNeedScroll =
        containerRef.current.clientWidth === containerRef.current.scrollWidth;
      setShowBefore(noNeedScroll ? false : newScrollLeft > 0);
      setShowNext(
        noNeedScroll
          ? false
          : newScrollLeft + containerRef.current.clientWidth <
              containerRef.current.scrollWidth,
      );
    }
  }, []);

  const handleContainerRef = useCallback(
    (instance: HTMLDivElement | null) => {
      containerRef.current = instance;
      updateShow(0);
    },
    [updateShow],
  );

  const goToElement = useCallback(
    (element: (EventTarget & HTMLDivElement) | HTMLElement) => {
      if (containerRef.current) {
        if (
          containerRef.current.clientWidth === containerRef.current.scrollWidth
        ) {
          setShowBefore(false);
          setShowNext(false);
          return;
        }
        containerRef.current.scrollLeft =
          element.offsetLeft -
          containerRef.current.clientWidth / 2 +
          element.clientWidth / 2;
      }
    },
    [],
  );

  const handleGoToElement: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      if (!disableOnClickScroll) {
        goToElement(event.currentTarget);
      }
    },
    [disableOnClickScroll, goToElement],
  );

  const handleGoNext = useCallback(() => {
    if (containerRef.current) {
      const newScrollLeft =
        containerRef.current.scrollLeft +
        containerRef.current.clientWidth * 0.7;
      containerRef.current.scrollLeft = newScrollLeft;
      updateShow(newScrollLeft);
    }
  }, [updateShow]);

  const handleGoBefore = useCallback(() => {
    if (containerRef.current) {
      const newScrollLeft =
        containerRef.current.scrollLeft -
        containerRef.current.clientWidth * 0.7;
      containerRef.current.scrollLeft = newScrollLeft;
      updateShow(newScrollLeft);
    }
  }, [updateShow]);

  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      updateShow(event.currentTarget.scrollLeft ?? 0);
    },
    [updateShow],
  );

  useEffect(() => {
    if (selectedIndex !== undefined && document) {
      const element = document.getElementById(idConstructor(selectedIndex));
      element && goToElement(element);
    }
  }, [selectedIndex, goToElement, idConstructor]);

  useEffect(() => {
    if (containerRef.current) {
      updateShow(containerRef.current.scrollLeft);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements]);

  return (
    <div
      style={{
        position: 'relative',
        width: 'fit-content',
        marginLeft: 56,
        marginRight: 56,
      }}
    >
      <div
        className={styles.container}
        ref={handleContainerRef}
        style={{ maxWidth: maxWidthSize ?? '100%', width: widthSize }}
        onScroll={handleScroll}
      >
        {elements.map((element, i) => {
          const elementId = idConstructor(i);
          return (
            <div
              key={elementId}
              id={elementId}
              onClick={handleGoToElement}
              style={{
                marginRight:
                  i !== elements.length - 1
                    ? theme.spacing(spacing ?? 2)
                    : undefined,
              }}
            >
              {element}
            </div>
          );
        })}
      </div>
      {!noArrows && (
        <>
          <div
            style={{
              position: 'absolute',
              left: -56,
              color: 'red',
              top: '50%',
              transform: 'translate(0, -50%)',
              borderRadius: '50%',
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            <Zoom in={showBefore}>
              <IconButton
                onClick={handleGoBefore}
                color={arrowColor}
              >
                <NavigateBeforeIcon />
              </IconButton>
            </Zoom>
          </div>
          <div
            style={{
              position: 'absolute',
              right: -56,
              color: 'red',
              top: '50%',
              transform: 'translate(0, -50%)',
              borderRadius: '50%',
              marginLeft: 8,
              marginRight: 8,
            }}
          >
            <Zoom in={showNext}>
              <IconButton
                onClick={handleGoNext}
                color={arrowColor}
              >
                <NavigateNextIcon />
              </IconButton>
            </Zoom>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Carousel);
