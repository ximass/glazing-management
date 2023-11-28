import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const purchase = await prisma.purchase.delete({
            where: { id: parametros.id }
        });

        res.json(purchase);
    } else if (req.method === 'PUT') {
        const purchase = await prisma.purchase.update({
            where: { id: parametros.id },
            data: {
                providers: {
                    connect: parametros.providers
                  },
                  users: {
                    connect: parametros.users
                  },
                  value: Number(parametros.value)
            }
        });

        res.json(purchase);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}