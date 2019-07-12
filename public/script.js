//Realiza Conexao com o Servidor
		var socket = io("http://127.0.0.1:3000");

		//Renderiza as Mensagens na Tela
		function renderMessage(message) {
			$(".messages ").append("<div class='message'><strong>" + message.author + "</strong>: " + message.message + " </div>");
		}

		//Carrega Mensagens Anteriores Mesmo que Recarregue a Página
		socket.on("previousMessage", function (messages) {
			for (message of messages) {
				renderMessage(message);
			}
		});

		//Recebe Resposta Recem Escrita
		socket.on("responseMessage", function (message) {
			renderMessage(message);
		});

		//Recebimento e Envio de Valores dos Inputs Para o Servidor
		$("#form_chat").submit(function (event) {
			event.preventDefault();

			var author 	= $("input[name = user]").val();
			var message = $("input[name = message]").val();

			//Limpa Input da Mensagem
			$("input[name = message]").val("");

			//Verifica quem Escreveu e se há Mensagem e Seta Valores 
			if (author.length && message.length) {
				var messageObject = {
					author : author,
					message: message
				};

				//Mostra Mensagem em Tela
				renderMessage(messageObject);

				//Envia Mensagem ao Servidor
				socket.emit("sendMessage", messageObject); 
			}
		});