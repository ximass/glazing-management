import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const group = await prisma.group.delete({
            where: { id: parametros.id }
        });

        res.json(group);
    } else if (req.method === 'PUT') {
        const group = await prisma.group.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name,
                permissions: {
                    connect: parametros.permissions
                }
            }
        });

        res.json(group);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}