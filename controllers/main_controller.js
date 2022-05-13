function home_main(req, res) {
    res.render('index', { layout: 'main', title: 'Hello World', text: 'Hola Mundo' })
}

export {
    home_main
}
