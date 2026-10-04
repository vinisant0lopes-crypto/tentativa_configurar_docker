CREATE TABLE IF NOT EXISTS tbUsuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    emailUsuario VARCHAR(100) NOT NULL,
    senhaUsuario VARCHAR(255) NOT NULL
);

INSERT INTO tbUsuario (emailUsuario, senhaUsuario) VALUES 
('joao@email.com', 'senha123'),
('maria@email.com', 'senha456'),
('carlos@email.com', 'senha789');