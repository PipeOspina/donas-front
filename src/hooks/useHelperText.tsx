import { Collapse, FormHelperTextProps } from '@mui/material';
import { ReactNode, useId } from 'react';
import { TransitionGroup } from 'react-transition-group';

export const useHelperText = (label?: ReactNode) => {
  const id = useId();

  const customProps: FormHelperTextProps = {
    component: 'span',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  const Component = (
    <TransitionGroup>
      {[label]
        .filter((text) => !!text)
        .map((text) => (
          <Collapse key={`HELPER_TEXT_${id}`}>{text}</Collapse>
        ))}
    </TransitionGroup>
  );

  return {
    Component,
    customProps,
  };
};
