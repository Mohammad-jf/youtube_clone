import React, { useEffect, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { SideBar, Videos } from '../components'
import { fetchFromApi } from '../utils/fetchData'

const Feed = () => {
    const [videos, setVideos] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('New')

    useEffect(() => {
        fetchFromApi(`search?part=snippet&q=${selectedCategory}`).then((data) => {
            setVideos(data.items)
            console.log(data.items)
        })
    }, [selectedCategory])


    return (
        <Stack sx={{ flexDirection: { md: 'row', sx: 'column' } }}>
            <Box sx={{
                height: { sx: 'auto', md: '92vh' },
                borderRight: '1px solid #3d3d3d', px: { sx: 0, md: 2 }
            }} >
                {/* sidebar section */}
                <SideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
                <Typography className='copyright' variant='body2' sx={{ mt: 1.5, color: '#fff' }}>
                    CopyRight 2024 mohammad jalifathi
                </Typography>
            </Box>


            <Box p={2} sx={{ overflowY: 'auto', height: '90vh', flex: 2 }}>
                <Typography variant='h4' fontWeight='bold' mb={2}
                    sx={{ color: '#fff' }}> {selectedCategory}
                    <span style={{ color: '#fc1503' }}> videos</span>
                </Typography>
                <Videos videos={videos} />
            </Box>

        </Stack >
    )
}

export default Feed