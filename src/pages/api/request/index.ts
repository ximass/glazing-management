import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.request.create({
      data: {
        customers: {
          connect: data.customers
        },
        users: {
          connect: data.users
        },
        value: data.value
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.request.update({
      where: { id: data.id },
      data: {
        customers: {
          connect: data.customers
        },
        users: {
          connect: data.users
        },
        value: data.value
      }
    });

    res.json(result);
  }
}