import AccessError from "../errors/access_error.js"

const non_existent_route = (req, res) => {
  const { originalUrl: url, method } = req
  console.error({ error: { method, url } })

  throw new AccessError({ message: 'Non Existent Route.', status: 404 })
}

export {
  non_existent_route
}
