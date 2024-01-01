import React from 'react'
import { Box, CardContent, CardMedia, Typography } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { demoProfilePicture } from '../utils/constants'



const ChannelCard = ({ channelDatail }) => {
    return (
        <Box sx={{
            boxShadow: 'none',
            borderRadius: '20px',

        }}>
            <Link to={`/channel/${channelDatail?.id?.channelId}`}>
                <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: '#fff'
                }}>
                    <CardMedia image={channelDatail?.snippet?.thumbnails?.high?.url || demoProfilePicture} />
                </CardContent>
            </Link>
        </Box>
    )
}

export default ChannelCard