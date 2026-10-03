import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import { InfoOutlined } from '@mui/icons-material';
import Tooltip from '@mui/joy/Tooltip';

interface ResetPasswordFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onSubmit, onBack }) => (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Email Address
            <Tooltip title="Enter the email address associated with your account. You will receive a link to choose a new password." placement="right">
              <InfoOutlined sx={{ fontSize: '1rem' }} />
            </Tooltip>
          </FormLabel>
          <Input type="email" name="email" autoComplete="off" />
        </FormControl>
        <Stack direction="row" spacing={1}>
          <Button type="submit" fullWidth>Reset Password</Button>
          <Button type="button" variant="outlined" fullWidth onClick={onBack}>
            Back to Login
          </Button>
        </Stack>
      </Stack>
    </form>
  );
