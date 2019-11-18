const parseYoutubeUrl = (url) => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/
  const match = url.match(regExp)

  return match ? match[1] : null
}

export default parseYoutubeUrl
