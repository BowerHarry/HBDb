import React, { useEffect, useState } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';

export const LoginForm = ({ onSubmit, onShowOptions, showOptions, onResetPassword, onRequestAccess }) => (
    <form onSubmit={onSubmit}>
      <FormControl required>
        <FormLabel>Username</FormLabel>
        <Input type="text" name="username" autoComplete="off" />
      </FormControl>
      <FormControl required>
        <FormLabel>Password</FormLabel>
        <Input type="password" name="password" autoComplete="off" />
      </FormControl>
      <Stack sx={{ gap: 1, mt: 2 }}>
        <Button type="submit" fullWidth>
          Sign in
        </Button>
        <Button type="button" color="warning" variant="outlined" fullWidth onClick={onShowOptions}>
          {showOptions ? 'Hide Options' : 'More Options'}
        </Button>
        {showOptions && (
          <>
            <Button type="button" color="neutral" variant="outlined" fullWidth onClick={onResetPassword}>
              Reset Password
            </Button>
            <Button type="button" color="neutral" variant="outlined" fullWidth onClick={onRequestAccess}>
              Request Access
            </Button>
          </>
        )}
      </Stack>
    </form>
  );