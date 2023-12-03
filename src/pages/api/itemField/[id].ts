import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const result = await prisma.itemField.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(result);
    } else if (req.method === 'PUT') {
        const itemField = await prisma.itemField.update({
            where: { id: parametros.id },
            data: {
                label: parametros.label,
                ref_item_type: parametros.ref_item_type
            }
        });

        res.json(itemField);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}