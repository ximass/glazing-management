import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
    const parametros = req.query;

    if (req.method === 'DELETE') {
        const user = await prisma.user.delete({
            where: { id: parametros.id }
        });

        res.json(user);
    } else if (req.method === 'PUT') {
        const user = await prisma.user.update({
            where: { id: parametros.id },
            data: {
                email: parametros.email,
                name: parametros.name,
                login: parametros.login,
                password: parametros.password,
                groups: {
                    connect: parametros.groups
                }
            }
        });

        res.json(user);
    } else {
        throw new Error(
            `The HTTP ${req.method} method is not supported at this route.`,
        );
    }
}