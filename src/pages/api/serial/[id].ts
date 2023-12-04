import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const serial = await prisma.serial.delete({
            where: { id: Number(parametros.id) }
        });

        res.json(serial);
    } else if (req.method === 'PUT') {
        const serial = await prisma.serial.update({
            where: { id: parametros.id },
            data: {
                name: parametros.name,
                value: parametros.value,
                pattern: parametros.pattern,
                ref_module: parametros.ref_module
            }
        });

        res.json(serial);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}