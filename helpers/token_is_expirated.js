const tokenIsExpirated = ({ exp: expirationTimeStamp }) => {
  const currentTimeStamp = parseInt(Date.now() / 1000)

  console.log({
    expirationTimeStamp,
    currentTimeStamp,
    value: (currentTimeStamp > expirationTimeStamp)
  })

  return currentTimeStamp > expirationTimeStamp
}

export default tokenIsExpirated
