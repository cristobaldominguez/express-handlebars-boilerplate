// Methods
// GET /examples/
function get_index(req, res) {
  if (req.accepts('text/html')) {
    // for several options req.accepts(['json', 'text'])
    return res.render('example/index', { layout: 'main', title: `Hello ${req.user.email}!`, text: `Hello ${req.user.email}! You're authenticated successfully` })
  }

  res.json({ message: `Hello ${req.user.email}! You're authenticated successfully` })
}

export default {
  get_index
}
