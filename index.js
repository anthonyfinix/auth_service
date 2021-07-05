const auth_service = require('./dist').default;
let port = 3001
auth_service({ port }).then(app => {
    app.listen(port, () => {
        console.info('listening to port:', port)
    })
});