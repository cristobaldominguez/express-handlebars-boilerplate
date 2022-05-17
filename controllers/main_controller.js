function home_main_controller(_, res) {
    res.render('index', { title: 'Hello World', text: 'Hola Mundo' })
}

function unauthorized_main_controller(req, res) {
    if (req.accepts('text/html')) {
        return res.render('unauthorized', { title: 'Unauthorized (403)', text: 'Oh, no! No tienes acceso a esta sección' })
    }

    res.sendStatus(401)
}

export {
    home_main_controller,
    unauthorized_main_controller
}
