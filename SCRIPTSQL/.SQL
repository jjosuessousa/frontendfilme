-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 31/03/2025 às 04:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `filmes_db`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `filmes`
--

CREATE TABLE `filmes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `sinopse` text NOT NULL,
  `genero_id` int(11) DEFAULT NULL,
  `capa` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `lancamento` date NOT NULL,
  `duracao` int(11) NOT NULL,
  `categoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `filmes`
--

INSERT INTO `filmes` (`id`, `titulo`, `sinopse`, `genero_id`, `capa`, `trailer`, `lancamento`, `duracao`, `categoria`) VALUES
(10, 'Filme de Teste', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia. Seu plano é roubar das pessoas tudo que tenha ligação com a data, até que a menina Cindy Lou Who resolve ficar amiga dele.', 1, 'download (1).jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(11, 'Filme de Teste', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia. Seu plano é roubar das pessoas tudo que tenha ligação com a data, até que a menina Cindy Lou Who resolve ficar amiga dele.', 1, 'download (2).jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(12, 'homen aranha', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia. Seu plano é roubar das pessoas tudo que tenha ligação com a data, até que a menina Cindy Lou Who resolve ficar amiga dele.', 1, 'download (3).png', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(13, 'O Grande Filme', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia. Seu plano é roubar das pessoas tudo que tenha ligação com a data, até que a menina Cindy Lou Who resolve ficar amiga dele.', 1, 'download (4).jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(14, 'cabeça', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia', 1, 'images (2).jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(15, 'homen de ferro', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia', 1, 'images (1).jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(16, 'O Grande Filme', 'O rabugento Grinch faz de tudo para acabar com o Natal dos cidadãos de Quemlândia', 1, 'download.jpeg', 'https://youtu.be/UzZbMj5qYNg?si=ZWbfdvECqlhG70Ln', '0000-00-00', 0, 'açao'),
(17, 'O Grande Filme', 'e', 1, 'images (1).jpeg', 'https://youtube.com/superman-trailer', '0000-00-00', 0, 'açao'),
(30, 'O Grande Filme', 'teste', 2, 'images (2).jpeg', 'https://www.youtube.com/watch?v=trailerfilme', '0000-00-00', 0, 'terror'),
(31, 'homen aranha', 'rrr', 3, 'download (1).jpeg', 'https://www.youtube.com/watch?v=trailerfilme', '0000-00-00', 0, 'ficcao'),
(32, 'Filme de Teste3', 'bbb', 4, 'download (3).png', 'https://youtube.com/trailer', '0000-00-00', 0, 'romance'),
(33, 'Filme de Teste', 'TT', 1, 'download.jpeg', 'https://youtube.com/superman-trailer', '0000-00-00', 0, 'acao'),
(34, 'homenferro', 'TESTE', 2, 'download (1).jpeg', 'https://www.youtube.com/watch?v=trailerfilme', '0000-00-00', 0, 'terror'),
(35, 'O Grande Filme', 'ii', 4, 'download (2).jpeg', 'https://youtube.com/superman-trailer', '0000-00-00', 0, 'romance'),
(36, 'Filme de Teste3', 'teste', NULL, 'download (4).jpeg', 'https://www.youtube.com/watch?v=trailerfilme', '0000-00-00', 0, 'ficcao'),
(37, 'O Grande Filme', 'ii', NULL, 'download (1).jpeg', 'https://youtube.com/superman-trailer', '0000-00-00', 0, 'terror');

-- --------------------------------------------------------

--
-- Estrutura para tabela `generos`
--

CREATE TABLE `generos` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `generos`
--

INSERT INTO `generos` (`id`, `nome`) VALUES
(1, 'açao'),
(2, 'terror'),
(3, 'ficcao'),
(4, 'romance');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `filmes`
--
ALTER TABLE `filmes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_filme_genero` (`genero_id`);

--
-- Índices de tabela `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `filmes`
--
ALTER TABLE `filmes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `generos`
--
ALTER TABLE `generos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `filmes`
--
ALTER TABLE `filmes`
  ADD CONSTRAINT `fk_filme_genero` FOREIGN KEY (`genero_id`) REFERENCES `generos` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
