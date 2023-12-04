import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const customer = await prisma.customer.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(customer);
    } else if (req.method === 'PUT') {
        const customer = await prisma.customer.update({
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
                country: parametros.country
            }
        });

        res.json(customer);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}