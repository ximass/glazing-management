import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const itemField = await prisma.itemField.create({
      data: {
        label: data.label,
        ref_item_type: data.ref_item_type
      }
    });

    res.json(itemField);
  }
  else if (req.method === 'PUT') {
    const itemField = await prisma.itemField.update({
      where: { id: Number(data.id) },
      data: {
        label: data.label,
        ref_item_type: data.ref_item_type
      }
    });

    res.json(itemField);
  }
}