import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const permission = await prisma.permission.delete({
            where: { id: parametros.id }
        });

        res.json(permission);
    } else if (req.method === 'PUT') {
        const permission = await prisma.permission.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name
            }
        });

        res.json(permission);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}