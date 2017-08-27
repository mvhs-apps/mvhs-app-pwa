// @flow weak

import * as React from 'react';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';

type Props = {
  open: boolean,
  message: string,
  buttonMessage: string,
  onButtonClick: () => void
};

const SimpleSnackbar = ({
  open,
  message,
  buttonMessage,
  onButtonClick,
  ...props
}: Props) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={null}
      message={
        <span id="message-id">
          {message}
        </span>
      }
      action={[
        <Button color="accent" dense onClick={onButtonClick}>
          {buttonMessage}
        </Button>
      ]}
      {...props}
    />
  );
};

export default SimpleSnackbar;
