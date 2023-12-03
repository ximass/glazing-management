import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.itemType.create({
      data: {
        name: data.name,
        info: data.info,
        active: data.active,
        ref_category: data.ref_category
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.itemType.update({
      where: { id: data.id },
      data: {
        name: data.name,
        info: data.info,
        active: data.active,
        ref_category: data.ref_category
      }
    });

    res.json(result);
  }
}