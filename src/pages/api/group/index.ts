import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.group.create({
      data: {
        name: data.name,
        permissions: {
          connect: data.permissions
        }
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.group.update({
      where: { id: data.id },
      data: {
        name: data.name,
        permissions: {
          connect: data.permissions
        }
      }
    });

    res.json(result);
  }
}