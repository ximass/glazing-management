import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const category = await prisma.category.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(category);
    } else if (req.method === 'PUT') {
        const category = await prisma.category.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name,
                ref_serial: parametros.ref_serial,
                active: parametros.active
            }
        });

        res.json(category);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}