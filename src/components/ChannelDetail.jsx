import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { videos, ChannelCard } from '../components'
import { fetchFromApi } from '../utils/fetchData'

const ChannelDetail = () => {
  const { id } = useParams()
  const [channelDetail, setChannelDetail] = useState(null)
  const [channelvideos, setChannelvideos] = useState([])


  useEffect(() => {
    fetchFromApi(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
      console.log(data?.items[0])
    })

    fetchFromApi(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      setChannelvideos(data?.items)
      console.log(data?.items)
    })
  }, [id])



  return (
    <Box>

    </Box>
  )
}

export default ChannelDetail