
const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('index')
})
server = app.listen(3000);
//socket.io instantiation
const io = require("socket.io")(server)


//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Sweet Dick"

    //listen on change_username
	socket.on('change_username', (data) => {
		socket.username = data.username
		console.log(data);
	})
	socket.on("new_message", (data) => {
		io.sockets.emit('new_message',{message:data.message,username:socket.username})
	})
})