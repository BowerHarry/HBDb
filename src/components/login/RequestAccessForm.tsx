import React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';
import { InfoOutlined } from '@mui/icons-material';

export const RequestAccessForm = ({ onSubmit, onBack }) => (
    <form onSubmit={onSubmit}>
      <Stack spacing={2}>
        <FormControl required>
          <FormLabel sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            Email Address
            <Tooltip title="Your email is required for account verification and password recovery" placement="right">
              <InfoOutlined sx={{ fontSize: '1rem' }} />
            </Tooltip>
          </FormLabel>
          <Input type="email" autoComplete="off" />
        </FormControl>
        <FormControl required>
          <FormLabel>Desired Username</FormLabel>
          <Input type="text" autoComplete="off" />
        </FormControl>
        <FormControl required>
          <FormLabel>Password</FormLabel>
          <Input type="password" autoComplete="off" />
        </FormControl>
        <Stack direction="row" spacing={1}>
          <Button type="submit" fullWidth>Submit Request</Button>
          <Button type="button" variant="outlined" fullWidth onClick={onBack}>
            Back to Login
          </Button>
        </Stack>
      </Stack>
    </form>
  );