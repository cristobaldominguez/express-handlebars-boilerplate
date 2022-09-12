// Methods
// GET /
function get_home(req, res) {
  if (req.expects_html) {
    return res.render('home/index', { title: 'Hello World', text: 'Hola Mundo' })
  }

  res.json({ message: 'Hello World' })
}

// GET /unauthorized
function get_unauthorized(req, res) {
  if (req.expects_html) {
    return res.render('home/unauthorized', { title: 'Unauthorized (403)', text: 'Oh, no! No tienes acceso a esta sección' })
  }

  res.sendStatus(401)
}

// GET /404
function get_404(req, res) {
  if (req.expects_html) {
    return res.render('home/404', { content: 'Oh no! a 404 :(' })
  }
}

export default {
  get_home,
  get_404,
  get_unauthorized
}
