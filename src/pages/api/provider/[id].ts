import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const provider = await prisma.provider.delete({
            where: { id: parametros.id }
        });

        res.json(provider);
    } else if (req.method === 'PUT') {
        const provider = await prisma.provider.update({
            where: { id: parametros.id },
            data: {
                email: parametros.email,
                name: parametros.name,
                identity: parametros.identity,
                info: parametros.info,
                cep: parametros.cep,
                uf: parametros.uf,
                address: parametros.address,
                city: parametros.city,
                phone: parametros.phone,
                country: parametros.country,
                company_owner: parametros.company_owner,
                company_owner_cpf: parametros.company_owner_cpf,
                legal_name: parametros.legal_name
            }
        });

        res.json(provider);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}