import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Videos, ChannelCard } from '../components'
import { fetchFromApi } from '../utils/fetchData'

const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState(null)
  const [channelVideos, setChannelvideos] = useState([])


  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    })

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      setChannelvideos(data?.items)
    })
  }, [id])



  return (
    <Box minHeight='95vh'>
      <Box>
        <div
          style={{ background: " linear-gradient(156deg, rgba(137,199,243,1) 22%, rgba(162,37,196,1) 65%, rgba(225,245,255,1) 93%)", zIndex: 10, height: '300px' }} />
        <ChannelCard channelDetail={channelDetail} marginTop='-110px' />
      </Box>

      <Box display='flex' p='2'>
        <Box sx={{ mr: { sm: '60px' } }}/>
          <Videos videos={channelVideos} />
      </Box>
      
    </Box>
  )
}

export default ChannelDetail