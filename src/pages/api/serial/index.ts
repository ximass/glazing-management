import prisma from '../../../../lib/prisma';

//@ts-ignore
export default async function handle(req, res) {
  const data = req.body;

  if (req.method === 'POST') {
    const result = await prisma.serial.create({
      data: {
        name: data.name,
        value: data.value,
        pattern: data.pattern,
        ref_module: data.ref_module
      }
    });

    res.json(result);
  }
  else if (req.method === 'PUT') {
    const result = await prisma.serial.update({
      where: { id: data.id },
      data: {
        name: data.name,
        value: data.value,
        pattern: data.pattern,
        ref_module: data.ref_module
      }
    });

    res.json(result);
  }
}