-- CreateTable
CREATE TABLE `Livro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(200) NOT NULL,
    `autor` VARCHAR(100) NOT NULL,
    `isbn` VARCHAR(20) NOT NULL,
    `editora` VARCHAR(100) NOT NULL,
    `anoPublicacao` INTEGER NOT NULL,
    `genero` VARCHAR(50) NOT NULL,
    `sinopse` TEXT NOT NULL,
    `paginas` INTEGER NOT NULL,
    `idioma` VARCHAR(30) NOT NULL,
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Livro_isbn_key`(`isbn`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha` VARCHAR(255) NOT NULL,
    `tipo` ENUM('ADMIN', 'BIBLIOTECARIO', 'COMUM') NOT NULL DEFAULT 'COMUM',
    `dataCadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Registro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `livroId` INTEGER NOT NULL,
    `usuarioId` INTEGER NOT NULL,
    `tipo` ENUM('CADASTRO', 'EMPRESTIMO', 'DEVOLUCAO', 'RESERVA', 'ATUALIZACAO') NOT NULL,
    `data` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observacao` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Registro` ADD CONSTRAINT `Registro_livroId_fkey` FOREIGN KEY (`livroId`) REFERENCES `Livro`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Registro` ADD CONSTRAINT `Registro_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
