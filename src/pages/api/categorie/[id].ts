import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const categorie = await prisma.categorie.delete({
            where: { id: parametros.id }
        });

        res.json(categorie);
    } else if (req.method === 'PUT') {
        const categorie = await prisma.categorie.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name,
                ref_serial: parametros.ref_serial,
                active: parametros.active
            }
        });

        res.json(categorie);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}