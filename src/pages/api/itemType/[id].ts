import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const itemType = await prisma.itemType.delete({
            where: { id: parametros.id }
        });

        res.json(itemType);
    } else if (req.method === 'PUT') {
        const itemType = await prisma.itemType.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name,
                info: parametros.info,
                active: parametros.active,
                ref_category: parametros.ref_category
            }
        });

        res.json(itemType);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}