import styles from '@/styles/components/NumberField.module.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Collapse,
  IconButton,
  TextField,
  TextFieldProps,
  Zoom,
} from '@mui/material';
import clsx from 'clsx';
import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import { TransitionGroup } from 'react-transition-group';

export type NumberFieldProps = Omit<
  TextFieldProps,
  'onChange' | 'defaultValue' | 'value' | 'type'
> &
  Omit<NumericFormatProps, 'value' | 'onChange' | 'onValueChange' | 'size'> & {
    value?: number;
    defaultValue?: number;
    hideControls?: boolean;
    controlsPlacement?: 'start' | 'end' | 'start-end';
    onChange?: (value?: number) => void;
    min?: string | number;
    max?: string | number;
    minError?: string;
    maxError?: string;
    step?: number;
  };

const NumberField = forwardRef<HTMLDivElement, NumberFieldProps>(
  (
    {
      hideControls,
      value,
      controlsPlacement = 'end',
      onChange,
      min,
      max,
      minError: minErrorProps,
      maxError: maxErrorProps,
      step = 1,
      ...props
    },
    ref,
  ) => {
    const [valueState, setValueState] = useState(value);
    const [focus, setFocus] = useState(false);

    const id = useId();

    const valueRef = useRef(valueState);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const minParsed = useMemo(() => Number(min), [min]);
    const minNumber = useMemo(
      () => (Number.isNaN(minParsed) ? undefined : minParsed),
      [minParsed],
    );

    const isMinError = useMemo(
      () => minNumber !== undefined && (valueState ?? 0) < minNumber,
      [valueState, minNumber],
    );
    const minError = useMemo(
      () => (isMinError ? `El valor mínimo es ${min}` : ''),
      [isMinError, min],
    );

    const maxParsed = useMemo(() => Number(max), [max]);
    const maxNumber = useMemo(
      () => (Number.isNaN(maxParsed) ? Number.MAX_SAFE_INTEGER : maxParsed),
      [maxParsed],
    );

    const isMaxError = useMemo(
      () => maxNumber !== undefined && (valueState ?? 0) > maxNumber,
      [valueState, maxNumber],
    );
    const maxError = useMemo(
      () => (isMaxError ? `El valor máximo es ${max}` : ''),
      [isMaxError, max],
    );

    const error = useMemo(
      () => isMinError || isMaxError || props.error,
      [isMinError, isMaxError, props.error],
    );
    const helperText = useMemo(
      () =>
        (minErrorProps ?? minError) ||
        (maxErrorProps ?? maxError) ||
        props.helperText,
      [minErrorProps, minError, props.helperText, maxError, maxErrorProps],
    );

    const handleChangeValue = useCallback(
      (currentValue?: number) => {
        onChange && onChange(currentValue);
      },
      [onChange],
    );

    const handleAdd = useCallback(() => {
      setValueState((current) => {
        const newValue = (current ?? minNumber ?? 0) + step;
        return maxNumber !== undefined
          ? newValue < maxNumber
            ? newValue
            : maxNumber
          : newValue;
      });
    }, [minNumber, maxNumber, step]);

    const handleRemove = useCallback(() => {
      setValueState((current) => {
        const newValue = (current ?? 0) - step;
        return minNumber !== undefined
          ? newValue > minNumber
            ? newValue
            : minNumber
          : newValue;
      });
    }, [minNumber, step]);

    const handleMouseDown = useCallback(
      (changeFunction: () => void) => {
        changeFunction();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        const timeout = setTimeout(() => {
          const interval = setInterval(() => {
            changeFunction();
          }, 50);
          intervalRef.current = interval;
        }, 250);
        timeoutRef.current = timeout;
        const documentMouseUpListener = () => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          if (intervalRef.current) clearInterval(intervalRef.current);
          onChange && onChange(valueRef.current);
          document.removeEventListener('mouseup', documentMouseUpListener);
        };
        document.addEventListener('mouseup', documentMouseUpListener);
      },
      [onChange],
    );

    const getControl = useCallback(
      (type?: 'add' | 'remove') => (
        <IconButton
          size="small"
          className={clsx({
            [styles.smallControl]:
              props.size === 'small' && controlsPlacement !== 'start-end',
          })}
          color={error ? 'error' : focus ? 'primary' : undefined}
          onMouseDown={() =>
            handleMouseDown(type === 'add' ? handleAdd : handleRemove)
          }
        >
          {type === 'add' ? (
            <AddIcon fontSize="small" />
          ) : (
            <RemoveIcon fontSize="small" />
          )}
        </IconButton>
      ),
      [
        controlsPlacement,
        focus,
        props.size,
        handleAdd,
        handleRemove,
        handleMouseDown,
        error,
      ],
    );

    const VerticalControls = useMemo(
      () => (
        <div className={styles.verticalControls}>
          {getControl('add')}
          {getControl('remove')}
        </div>
      ),
      [getControl],
    );

    useEffect(() => {
      setValueState(value);
    }, [value]);

    useEffect(() => {
      valueRef.current = valueState;
    }, [valueState]);

    return (
      <div
        className={clsx(styles.container, {
          [styles.fullWidth]: props.fullWidth,
        })}
      >
        <Zoom in={!hideControls}>
          <div>
            {controlsPlacement === 'start' && VerticalControls}
            {controlsPlacement === 'start-end' && getControl('remove')}
            <Collapse in={!!helperText}>
              <div className={styles.helperTextHeight} />
            </Collapse>
          </div>
        </Zoom>
        <NumericFormat
          {...props}
          customInput={TextField}
          InputProps={{
            ...props.InputProps,
            ref,
          }}
          value={
            valueState && valueState > Number.MAX_SAFE_INTEGER
              ? Number.MAX_SAFE_INTEGER
              : valueState
          }
          onValueChange={({ floatValue }, { event }) =>
            floatValue && floatValue > Number.MAX_SAFE_INTEGER
              ? event?.preventDefault()
              : handleChangeValue(floatValue)
          }
          onFocus={(event) => {
            props.onFocus && props.onFocus(event);
            setFocus(true);
          }}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
            setFocus(false);
          }}
          error={error}
          FormHelperTextProps={
            {
              component: 'span',
            } as any
          }
          helperText={
            <TransitionGroup>
              {[helperText]
                .filter((text) => !!text)
                .map((text) => (
                  <Collapse key={`NUMBER_FIELD_HELPER_TEXT_${id}`}>
                    {text}
                  </Collapse>
                ))}
            </TransitionGroup>
          }
        />
        <Zoom in={!hideControls}>
          <div>
            {controlsPlacement === 'end' && VerticalControls}
            {controlsPlacement === 'start-end' && getControl('add')}
            <Collapse in={!!helperText}>
              <div className={styles.helperTextHeight} />
            </Collapse>
          </div>
        </Zoom>
      </div>
    );
  },
);

export default NumberField;
