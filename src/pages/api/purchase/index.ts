import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.purchase.create({
      data: {
        providers: {
          connect: data.providers
        },
        users: {
          connect: data.users
        },
        value: Number(data.value)
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.purchase.update({
      where: { id: data.id },
      data: {
        providers: {
          connect: data.providers
        },
        users: {
          connect: data.users
        },
        value: Number(data.value)
      }
    });

    res.json(result);
  }
}