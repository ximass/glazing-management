import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    console.log(parametros);

    if (req.method === 'DELETE') {
        const result = await prisma.itemField.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(result);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}