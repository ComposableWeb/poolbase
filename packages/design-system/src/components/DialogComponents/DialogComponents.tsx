/** @jsx jsx */
import { jsx, Grid, Flex, IconButton, Box } from 'theme-ui';
import { transparentize } from '@theme-ui/color';
import { useMemo, useContext, createContext } from 'react';
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogDisclosure as BaseDialogDisclosure,
  DialogBackdrop as BaseDialogBackdrop,
  DialogStateReturn,
  DialogProps as BaseDialogProps,
  DialogDisclosureProps as BaseDialogDisclosureProps,
} from 'reakit/Dialog';
import { XCircle } from 'react-feather';

const DialogContext = createContext<DialogStateReturn>(undefined as any);

export const DialogWrapper: React.FC = ({ children, ...initialState }: React.PropsWithChildren<{}>) => {
  const dialog = useDialogState(initialState);
  const value = useMemo(() => dialog, Object.values(dialog));
  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
};

export interface DialogProps extends Partial<BaseDialogProps> {
  children: (dialog: DialogStateReturn) => React.ReactNode;
  hasCloseButton?: boolean;
  closeButtonLabel?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  children,
  hasCloseButton = true,
  closeButtonLabel = 'close dialog',
  ...rest
}: DialogProps) => {
  const dialog = useContext<DialogStateReturn>(DialogContext);
  return (
    <BaseDialog
      {...dialog}
      {...rest}
      sx={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
    >
      <Grid sx={{ backgroundColor: 'background' }}>
        {hasCloseButton && (
          <Flex sx={{ justifyContent: 'flex-end', p: 2 }}>
            <IconButton onClick={dialog.hide} aria-label={closeButtonLabel}>
              <XCircle />
            </IconButton>
          </Flex>
        )}
        <Box sx={{ px: 4, pt: hasCloseButton ? 0 : 4, pb: 4 }}>{children(dialog)}</Box>
      </Grid>
    </BaseDialog>
  );
};

export interface DialogDisclosureProps extends Partial<BaseDialogDisclosureProps> {
  as?: any;
}
export const DialogDisclosure: React.FC<DialogDisclosureProps> = (props: DialogDisclosureProps) => {
  const dialog = useContext<DialogStateReturn>(DialogContext);
  return <BaseDialogDisclosure {...dialog} {...props} />;
};
export const DialogBackdrop: React.FC = (props) => {
  const dialog = useContext<DialogStateReturn>(DialogContext);
  return (
    <BaseDialogBackdrop
      {...dialog}
      {...props}
      sx={{
        backgroundColor: transparentize('backgroundInverted', 0.15),
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        minHeight: '100vh',
      }}
    />
  );
};
