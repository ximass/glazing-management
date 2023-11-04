import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.provider.create({
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
        country: data.country,
        company_owner: data.company_owner,
        company_owner_cpf: data.company_owner_cpf,
        legal_name: data.legal_name
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.provider.update({
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
        country: data.country,
        company_owner: data.company_owner,
        company_owner_cpf: data.company_owner_cpf,
        legal_name: data.legal_name
      }
    });

    res.json(result);
  }
}