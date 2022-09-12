// Methods
// GET /examples/
function get_index(req, res) {
  if (req.expects_html) {
    return res.render('example/index', { layout: 'main', title: `Hello ${req.user.email}!`, text: `Hello ${req.user.email}! You're authenticated successfully` })
  }

  res.json({ message: `Hello ${req.user.email}! You're authenticated successfully` })
}

export default {
  get_index
}
