// Importa o módulo Express para criar a aplicação web
import express from "express";

// Importa o módulo Multer para lidar com o upload de arquivos
import multer from "multer";

// Importa funções do controlador de posts para lidar com as rotas
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js";

// Configura o armazenamento de arquivos, definindo o diretório de destino
const storage = multer.diskStorage({
  // Define a função para determinar o destino do arquivo
  destination: function (req, file, cb) {
    // Define o diretório de uploads
    cb(null, 'uploads/'); 
  },
  // Define a função para determinar o nome do arquivo
  filename: function (req, file, cb) {
    // Utiliza o nome original do arquivo
    cb(null, file.originalname); 
  }
});

// Cria uma instância do middleware Multer com as configurações definidas
const upload = multer({ dest: "./uploads" , storage });

// Define a função que configura as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());

  // Define a rota para listar todos os posts
  app.get("/posts", listarPosts);

  // Define a rota para criar um novo post
  app.post("/posts", postarNovoPost);

  // Define a rota para fazer upload de uma imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
}

// Exporta a função de rotas para ser utilizada em outros módulos
export default routes;

