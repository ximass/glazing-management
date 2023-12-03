import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const result = await prisma.itemFieldValue.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(result);
    } else if (req.method === 'PUT') {
        const itemFieldValue = await prisma.itemFieldValue.update({
            where: { id: parametros.id },
            data: {
                value: parametros.value,
                ref_item_field: parametros.ref_item_field
            }
        });

        res.json(itemFieldValue);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}