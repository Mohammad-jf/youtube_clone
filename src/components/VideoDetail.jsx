import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { Box, Typography, Stack } from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import Videos from './Videos'
import { fetchFromApi } from '../utils/fetchData'


const VideoDetail = () => {
  const { id } = useParams();
  const [videoDetail, setVideoDetail] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState(null)


  useEffect(() => {
    fetchFromApi(`videos?part=snippet,statistics&id=${id}`).then((data) => {
      setVideoDetail(data?.items[0])
    })

    fetchFromApi(`search?part=snippet&relatedToVideoId=${id}&type=video`).then((data) => {
      setRelatedVideos(data?.items)
    })
  }, [id])

  if (!videoDetail?.snippet) return 'Loading....'

  const { snippet: { title, channelId, channelTitle }, statistics: { viewCount, likeCount } } = videoDetail
  return (
    <Box minHeight='95vh'>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Box flex={1}>

          <Box sx={{ width: '100%', position: 'sticky', top: '86px' }}>
            <ReactPlayer url={`http://www.youtube.com/watch?v=${id}`}
              className='react-player' controls />
            <Typography color='#fff' variant='h5' fontWeight='bold' p={2}>
              {title}
            </Typography>

            <Stack direction='row' justifyContent='space-between' sx={{ color: '#fff' }} py={1} px={2}>
              <Link to={`/channel/${channelId}`}>
                <Typography variant={{ sm: 'subtitle1', md: 'h6' }} color='#fff'>
                  {channelTitle}
                  <CheckCircle sx={{ fontSize: '12px', color: 'gray', ml: '5px' }} />
                </Typography>
              </Link>

              <Stack direction='row' gap='20px' alignItems='center'>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant='body1' sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} Likes
                </Typography>
              </Stack>

            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent='center' alignItems='center'>
          <Videos videos={relatedVideos} direction='column' />
        </Box>
      </Stack>

    </Box>
  )
}

export default VideoDetail