const findVideosById = async (idList) => {
  const ids = idList.join()
  const testApiCall = await window.gapi.client.youtube.videos.list({
    part: 'snippet,contentDetails',
    id: ids,
  })

  return testApiCall
}
export { findVideosById }
