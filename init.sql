-- Arquivo de requisitos das entidades:

-- Tabela 1: Usuários (ambos os níveis de acesso: 'administrador', 'padrao')
CREATE TABLE Usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    nome_do_usuario VARCHAR(50), NOT NULL,
    nivel_acesso VARCHAR(10) DEFAULT 'padrao' CHECK (nivel_acesso IN ('admin', 'padrao')),
);

-- Tabela 2: Listas (Relação 1:N com Usuarios)
CREATE TABLE Listas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    criador_id INTEGER NOT NULL,
    
    FOREIGN KEY (criador_id) REFERENCES Usuarios(id) ON DELETE CASCADE
);

-- Tabela 3: Itens (Relação N:1 com Listas e N:1 com Usuarios)
CREATE TABLE Itens (
    id SERIAL PRIMARY KEY,
    nome_produto VARCHAR(255) NOT NULL,
    quantidade INTEGER DEFAULT 1,
    comprado BOOLEAN DEFAULT FALSE,
    lista_id INTEGER NOT NULL,
    responsavel_id INTEGER,
    
    FOREIGN KEY (lista_id) REFERENCES Listas(id) ON DELETE CASCADE,
    FOREIGN KEY (responsavel_id) REFERENCES Usuarios(id) ON DELETE SET NULL
);

-- Insere um usuário admin inicial (a senha será HASHED na Semana 3)
INSERT INTO Usuarios (email, senha, nome_usuario, nivel_acesso) VALUES
('admin@api.com', 'senha_inicial_nao_segura', 'Admin Master', 'admin');