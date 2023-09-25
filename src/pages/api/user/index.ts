import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        login: data.login,
        password: data.password,
        groups: {
          connect: data.groups
        }
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.user.update({
      where: { id: data.id },
      data: {
        email: data.email,
        name: data.name,
        login: data.login,
        password: data.password,
        groups: {
          connect: data.groups
        }
      }
    });

    res.json(result);
  }
}