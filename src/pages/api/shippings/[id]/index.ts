import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { shippingValidationSchema } from 'validationSchema/shippings';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.shipping
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getShippingById();
    case 'PUT':
      return updateShippingById();
    case 'DELETE':
      return deleteShippingById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getShippingById() {
    const data = await prisma.shipping.findFirst(convertQueryToPrismaUtil(req.query, 'shipping'));
    return res.status(200).json(data);
  }

  async function updateShippingById() {
    await shippingValidationSchema.validate(req.body);
    const data = await prisma.shipping.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteShippingById() {
    const data = await prisma.shipping.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
