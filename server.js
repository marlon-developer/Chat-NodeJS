//Inclui Bibliotecas para Realizar Conexao
const express = require("express");
const path    = require("path");

//Constantes de Conexao com Socket.io, express e http
const app    = express();
const server = require("http").createServer(app);
const io 	 = require("socket.io")(server);

//Seta Caminho da View, HML, Express 
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "public"));
app.engine("html", require("ejs").renderFile);
app.set("app engine", "html");


//Seta a View que Deve Ser Renderizada 
app.use("/", (request, response) => {
	response.render("index.html");
});

//Array Para Guardar Strings de Mensagem
let messages = [];

//Realiza Conexao com Socket.io
io.on("connection", socket => {

	//Debug Mostra Hash da Conexao em Terminal
	console.log("Conectado: " + socket.id);

	//Carrega Mensagens Anteriores Mesmo que Recarregando Página
	socket.emit("previousMessage", messages);

	//Recebe Valores em data e Envia Para Outros Usuarios
	socket.on("sendMessage", data => {

		//Debug Mostra em Terminal
		console.log(data);

		//Envia String da Mensagem
		messages.push(data);
		socket.broadcast.emit("responseMessage", data);
	});
});

server.listen(3000);





