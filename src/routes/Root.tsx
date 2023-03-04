import React from 'react'
import { Typography, Stack, Box, Container } from '@mui/material';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import theme from '../theme';
import Header from '../Header';
import { Outlet } from 'react-router-dom';

export const Root = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
