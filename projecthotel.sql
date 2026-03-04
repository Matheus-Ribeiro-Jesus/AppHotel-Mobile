
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 28/01/2026 às 18:03
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `projecthotel`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adicionais`
--

CREATE TABLE `adicionais` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `adicionais`
--

INSERT INTO `adicionais` (`id`, `nome`, `preco`) VALUES
(2, 'Café da manha', 350.00),
(3, 'teste', 12.00);

-- --------------------------------------------------------

--
-- Estrutura para tabela `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `telefone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `cargo_id` int(11) DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `clientes`
--

INSERT INTO `clientes` (`id`, `nome`, `cpf`, `telefone`, `email`, `senha`, `cargo_id`) VALUES
(2, 'Matheus', '123-456-789', '(15)1234-5633', 'matheus@gmail.com', '123', 1),
(5, 'Lucas', '222-444-223', '(15)1234-5678', 'Lucas@gmail.com', '123', 5),
(12, 'a', 'a', 'a', 'a@a', '$2y$10$Vuw2nojMdgmfrYUkZmWPzupUitzARcEXew8XVtzqJOdZ8xZoOt/7S', 3),
(13, 'fghgf', 'hgf', 'jhg', 'a@f', '$2y$10$u4qcapbGWIST0fMARhwNZeXAdsDuqnFjDoxNbOh.A2YA2ym/zkaaq', 5),
(14, 'Matheus2', '123', '1232', 'mtxp@gmail.com', '$2y$10$jexsiVpKx0uY5ShWGrPYge45BOle82.yvXH2okEf.nfjKAXBLOyPC', 5),
(16, 'matheus-teste', '133', '13w21', 'asaef@gmail.com', '$2y$10$Jjn8ez6gRLzYD8MFJH/pie3mxsQjem/fxz6Ts7xTGxUXjRba54S5C', 5),
(17, '1', '1', '2', '11@11', '$2y$10$bmMFUh0UJ2L17eMruKEsSOdwjCc4tQ4FS1grBmRo6KaHypdOXt1qa', 5),
(21, '1123123123321321', '1123123123123132123123123123131312321313123123123', '212121231231231231231232312312123', '11@113213213123123', '$2y$10$yGTBe2YfeSFAgHYRNhKU6uBAvhF2JgI90BwukP9ojTPme1EnhyDqu', 5),
(22, '', '', '', '', '$2y$10$iL5LrDHe7xccOrjS/1Q1FubOv/rjzcdz1mQEVZC8ostFqef8TepGK', 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagens`
--

CREATE TABLE `imagens` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `data_pedido` date NOT NULL DEFAULT (CURRENT_DATE),
  `pagamento` enum('Debito','Credito','Pix','Dinheiro') NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `cliente_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `data_pedido`, `pagamento`, `usuario_id`, `cliente_id`) VALUES
(4, NULL, 'Pix', 1, 2),
(6, NULL, 'Dinheiro', 3, 5);

-- --------------------------------------------------------

--
-- Estrutura para tabela `quartos`
--

CREATE TABLE `quartos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `qtd_cama_casal` int(11) NOT NULL,
  `qtd_cama_solteiro` int(11) NOT NULL,
  `preco` decimal(5,2) NOT NULL,
  `disponivel` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `quartos`
--

INSERT INTO `quartos` (`id`, `nome`, `numero`, `qtd_cama_casal`, `qtd_cama_solteiro`, `preco`, `disponivel`) VALUES
(1, 'Suíte Casal', '101', 1, 0, 200.00, 1),
(2, 'Suíte Família', '102', 1, 2, 350.00, 1),
(3, 'Quarto Luxo', '103', 2, 0, 400.00, 1),
(4, 'Quarto Simples', '104', 0, 1, 120.00, 1),
(5, 'Suíte Master', '105', 1, 1, 280.00, 1),
(6, 'Suíte Família Plus', '201', 1, 2, 380.00, 1),
(7, 'Quarto Premium 4 Pessoas', '202', 2, 0, 420.00, 1),
(8, 'Apartamento Grande', '203', 0, 4, 300.00, 1),
(9, 'Quarto Duplo Econômico', '204', 1, 0, 180.00, 1),
(10, 'Suíte Compacta', '205', 0, 2, 150.00, 1),
(11, 'Quarto Casal Standard', '206', 1, 0, 200.00, 1),
(12, 'Quarto Individual Simples', '207', 0, 1, 100.00, 1),
(13, 'Studio Individual', '208', 0, 1, 120.00, 1),
(14, 'Quarto Single Econômico', '209', 0, 1, 90.00, 1),
(15, 'Theus Deluxe', '102', 1, 1, 21.00, 1),
(16, 'Suíte Casal Standard', '301', 1, 0, 220.00, 1),
(17, 'Suíte Família', '302', 1, 2, 360.00, 1),
(18, 'Quarto Luxo Vista Mar', '303', 1, 1, 420.00, 1),
(19, 'Quarto Econômico', '304', 0, 2, 160.00, 1),
(20, 'Suíte Presidencial', '305', 2, 1, 600.00, 1),
(21, 'Quarto Individual', '306', 0, 1, 130.00, 1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `reservas`
--

CREATE TABLE `reservas` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `quarto_id` int(11) DEFAULT NULL,
  `adicional_id` int(11) DEFAULT NULL,
  `inicio` timestamp NOT NULL DEFAULT current_timestamp(),
  `fim` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `reservas`
--

INSERT INTO `reservas` (`id`, `pedido_id`, `quarto_id`, `adicional_id`, `inicio`, `fim`) VALUES
(1, 4, 1, NULL, '2025-10-05 14:00:00', '2025-10-07 12:00:00'),
(2, 4, 2, NULL, '2025-11-01 14:00:00', '2025-11-05 12:00:00'),
(3, 4, 3, NULL, '2025-12-20 14:00:00', '2025-12-25 12:00:00'),
(4, 6, 6, NULL, '2025-11-10 14:00:00', '2025-11-15 12:00:00'),
(5, 6, 8, NULL, '2025-12-05 14:00:00', '2025-12-08 12:00:00'),
(6, 6, 10, NULL, '2026-01-10 14:00:00', '2026-01-12 12:00:00');

-- --------------------------------------------------------

--
-- Estrutura para tabela `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `roles`
--

INSERT INTO `roles` (`id`, `nome`) VALUES
(1, 'admin'),
(2, 'gerencia'),
(3, 'funcionario'),
(5, 'cliente');

-- --------------------------------------------------------

--
-- Estrutura para tabela `upimages`
--

CREATE TABLE `upimages` (
  `id` int(11) NOT NULL,
  `quarto_id` int(11) DEFAULT NULL,
  `image_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `role_id`) VALUES
(1, 'Matheus', 'matheus@gmail.com', '12345', 5),
(3, 'Lucas', 'Lucas@gmail.com', '21232f297a57a5a743894a0e4a801fc3', 1),
(4, 'Matheus2', 'matheus2@gmail.com', '$2y$10$WgSs309Kmr0ewSxkUQ1zfOjslXLsMsMbCZSSdxYQeq8/LTacvp1/S', 3);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adicionais`
--
ALTER TABLE `adicionais`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cpf` (`cpf`),
  ADD UNIQUE KEY `telefone` (`telefone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `cargo_id` (`cargo_id`);

--
-- Índices de tabela `imagens`
--
ALTER TABLE `imagens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Índices de tabela `quartos`
--
ALTER TABLE `quartos`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `quarto_id` (`quarto_id`),
  ADD KEY `adicional_id` (`adicional_id`);

--
-- Índices de tabela `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `upimages`
--
ALTER TABLE `upimages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `quarto_id` (`quarto_id`),
  ADD KEY `image_id` (`image_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `adicionais`
--
ALTER TABLE `adicionais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de tabela `imagens`
--
ALTER TABLE `imagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de tabela `quartos`
--
ALTER TABLE `quartos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de tabela `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `upimages`
--
ALTER TABLE `upimages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `cargo_id` FOREIGN KEY (`cargo_id`) REFERENCES `roles` (`id`);

--
-- Restrições para tabelas `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`);

--
-- Restrições para tabelas `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`quarto_id`) REFERENCES `quartos` (`id`),
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`adicional_id`) REFERENCES `adicionais` (`id`);

--
-- Restrições para tabelas `upimages`
--
ALTER TABLE `upimages`
  ADD CONSTRAINT `upimages_ibfk_1` FOREIGN KEY (`quarto_id`) REFERENCES `quartos` (`id`),
  ADD CONSTRAINT `upimages_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `imagens` (`id`);

--
-- Restrições para tabelas `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
