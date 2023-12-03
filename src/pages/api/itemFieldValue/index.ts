import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const itemFieldValue = await prisma.itemFieldValue.create({
      data: {
        value: data.value,
        ref_item_field: data.ref_item_field
      }
    });

    res.json(itemFieldValue);
  }
  else if (req.method === 'PUT') {
    const itemFieldValue = await prisma.itemFieldValue.update({
      where: { id: Number(data.id) },
      data: {
        value: data.value,
        ref_item_field: data.ref_item_field
      }
    });

    res.json(itemFieldValue);
  }
}