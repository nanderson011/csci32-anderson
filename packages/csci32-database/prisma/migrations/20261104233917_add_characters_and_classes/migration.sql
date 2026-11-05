-- CreateTable
CREATE TABLE "Character" (
    "character_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL DEFAULT 1,
    "user_id" TEXT NOT NULL,
    "class_id" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("character_id")
);

-- CreateTable
CREATE TABLE "CharacterClass" (
    "class_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hit_die" INTEGER NOT NULL,

    CONSTRAINT "CharacterClass_pkey" PRIMARY KEY ("class_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CharacterClass_name_key" ON "CharacterClass"("name");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "CharacterClass"("class_id") ON DELETE RESTRICT ON UPDATE CASCADE;
