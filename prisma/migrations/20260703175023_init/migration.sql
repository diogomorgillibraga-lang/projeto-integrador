-- CreateTable
CREATE TABLE "fotos_imovel" (
    "id" SERIAL NOT NULL,
    "imovel_id" INTEGER NOT NULL,
    "url_imagem" VARCHAR(500) NOT NULL,
    "alt_texto" VARCHAR(255),
    "ordem" INTEGER DEFAULT 1,
    "capa" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "fotos_imovel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "imoveis" (
    "id" SERIAL NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "referencia" VARCHAR(100) NOT NULL,
    "tipo_negocio" VARCHAR(50) NOT NULL,
    "tipo_imovel" VARCHAR(50) NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "preco" DECIMAL(15,2),
    "endereco" VARCHAR(255),
    "bairro" VARCHAR(150),
    "cidade" VARCHAR(150),
    "estado" VARCHAR(100),
    "link_mapa" VARCHAR(500),
    "quartos" INTEGER DEFAULT 0,
    "banheiros" INTEGER DEFAULT 0,
    "vagas" INTEGER DEFAULT 0,
    "area_m2" DECIMAL(10,2),
    "destaque" BOOLEAN NOT NULL DEFAULT false,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "imoveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "telefone" VARCHAR(30),
    "adm" BOOLEAN NOT NULL DEFAULT false,
    "tipo_interesse" VARCHAR(50),
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_fotos_imovel_imovel_id" ON "fotos_imovel"("imovel_id");

-- CreateIndex
CREATE UNIQUE INDEX "referencia" ON "imoveis"("referencia");

-- CreateIndex
CREATE INDEX "idx_imoveis_usuario" ON "imoveis"("usuario_id");

-- CreateIndex
CREATE INDEX "idx_imoveis_ativo" ON "imoveis"("ativo");

-- CreateIndex
CREATE INDEX "idx_imoveis_bairro" ON "imoveis"("bairro");

-- CreateIndex
CREATE INDEX "idx_imoveis_cidade" ON "imoveis"("cidade");

-- CreateIndex
CREATE INDEX "idx_imoveis_destaque" ON "imoveis"("destaque");

-- CreateIndex
CREATE INDEX "idx_imoveis_estado" ON "imoveis"("estado");

-- CreateIndex
CREATE INDEX "idx_imoveis_tipo_imovel" ON "imoveis"("tipo_imovel");

-- CreateIndex
CREATE INDEX "idx_imoveis_tipo_negocio" ON "imoveis"("tipo_negocio");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "fotos_imovel" ADD CONSTRAINT "fk_fotos_imovel" FOREIGN KEY ("imovel_id") REFERENCES "imoveis"("id") ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "imoveis" ADD CONSTRAINT "fk_imoveis_usuario" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE RESTRICT;
