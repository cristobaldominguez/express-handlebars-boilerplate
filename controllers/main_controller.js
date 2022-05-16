function home_main_controller(_, res) {
    res.render('index', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
}

export {
    home_main_controller
}
