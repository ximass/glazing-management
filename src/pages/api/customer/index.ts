import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.customer.create({
      data: {
        email: data.email,
        name: data.name,
        identity: data.identity,
        info: data.info,
        cep: data.cep,
        uf: data.uf,
        address: data.address,
        city: data.city,
        phone: data.phone,
        country: data.country
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.customer.update({
      where: { id: data.id },
      data: {
        email: data.email,
        name: data.name,
        identity: data.identity,
        info: data.info,
        cep: data.cep,
        uf: data.uf,
        address: data.address,
        city: data.city,
        phone: data.phone,
        country: data.country
      }
    });

    res.json(result);
  }
}