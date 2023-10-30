import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const request = await prisma.request.delete({
            where: { id: parametros.id }
        });

        res.json(request);
    } else if (req.method === 'PUT') {
        const request = await prisma.request.update({
            where: { id: parametros.id },
            data: {
                customers: {
                    connect: parametros.customers
                  },
                  users: {
                    connect: parametros.users
                  },
                  value: parametros.value
            }
        });

        res.json(request);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}