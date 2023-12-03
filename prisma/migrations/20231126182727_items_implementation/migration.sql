-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "ref_type" INTEGER NOT NULL,
    "ref_serial" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemType" (
    "id" SERIAL NOT NULL,
    "ref_category" INTEGER NOT NULL,
    "ref_serial" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "info" TEXT NOT NULL,
    "state" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemField" (
    "id" SERIAL NOT NULL,
    "ref_item_type" INTEGER NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemFieldValue" (
    "id" SERIAL NOT NULL,
    "ref_item_field" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item_to_product" (
    "id" SERIAL NOT NULL,
    "ref_item" INTEGER NOT NULL,
    "ref_product" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Item_to_product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemStock" (
    "id" SERIAL NOT NULL,
    "ref_item" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "critical_quantity" INTEGER NOT NULL,

    CONSTRAINT "ItemStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "legal_name" TEXT NOT NULL,
    "ref_owner" INTEGER NOT NULL,
    "info" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "identity" INTEGER NOT NULL,
    "cep" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "company_owner" TEXT NOT NULL,
    "company_owner_cpf" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "ref_user" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToProvider" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ItemToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProviderToPurchase" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemFieldValue_ref_item_field_key" ON "ItemFieldValue"("ref_item_field");

-- CreateIndex
CREATE UNIQUE INDEX "ItemStock_ref_item_key" ON "ItemStock"("ref_item");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToProvider_AB_unique" ON "_ItemToProvider"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToProvider_B_index" ON "_ItemToProvider"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToPurchase_AB_unique" ON "_ItemToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToPurchase_B_index" ON "_ItemToPurchase"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProviderToPurchase_AB_unique" ON "_ProviderToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ProviderToPurchase_B_index" ON "_ProviderToPurchase"("B");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ref_type_fkey" FOREIGN KEY ("ref_type") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_ref_serial_fkey" FOREIGN KEY ("ref_serial") REFERENCES "Serial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemType" ADD CONSTRAINT "ItemType_ref_category_fkey" FOREIGN KEY ("ref_category") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemType" ADD CONSTRAINT "ItemType_ref_serial_fkey" FOREIGN KEY ("ref_serial") REFERENCES "Serial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemField" ADD CONSTRAINT "ItemField_ref_item_type_fkey" FOREIGN KEY ("ref_item_type") REFERENCES "ItemType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemFieldValue" ADD CONSTRAINT "ItemFieldValue_ref_item_field_fkey" FOREIGN KEY ("ref_item_field") REFERENCES "ItemField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_to_product" ADD CONSTRAINT "Item_to_product_ref_item_fkey" FOREIGN KEY ("ref_item") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item_to_product" ADD CONSTRAINT "Item_to_product_ref_product_fkey" FOREIGN KEY ("ref_product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemStock" ADD CONSTRAINT "ItemStock_ref_item_fkey" FOREIGN KEY ("ref_item") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_ref_owner_fkey" FOREIGN KEY ("ref_owner") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_ref_user_fkey" FOREIGN KEY ("ref_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToProvider" ADD CONSTRAINT "_ItemToProvider_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToProvider" ADD CONSTRAINT "_ItemToProvider_B_fkey" FOREIGN KEY ("B") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPurchase" ADD CONSTRAINT "_ItemToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPurchase" ADD CONSTRAINT "_ItemToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToPurchase" ADD CONSTRAINT "_ProviderToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Provider"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProviderToPurchase" ADD CONSTRAINT "_ProviderToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
