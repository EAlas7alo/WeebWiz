import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function useEntry({ entry }) {
  const [videoId, setVideoId] = useState(videoData ? videoData.videoId : '')
  const [entryTitle, setEntryTitle] = useState(videoData ? videoData.entryTitle : '')
  const [videoMeta, setVideoMeta] = useState({ min: 0, max: 0 })
  const [runTime, setRunTime] = useState({
    start: videoData ? videoData.start : 0,
    end: videoData ? videoData.end : 0 })

  return (
    <div>
      
    </div>
  )
}

useEntry.propTypes = {

}

export default useEntry

