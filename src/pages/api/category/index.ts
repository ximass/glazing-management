import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.category.create({
      data: {
        name: data.name,
        ref_serial: data.ref_serial,
        active: data.active
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.category.update({
      where: { id: data.id },
      data: {
        name: data.name,
        ref_serial: data.ref_serial,
        active: data.active
      }
    });

    res.json(result);
  }
}