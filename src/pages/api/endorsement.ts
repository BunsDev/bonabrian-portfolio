import { withSentry } from '@sentry/nextjs'
import type { NextApiRequest, NextApiResponse } from 'next'
import { unstable_getServerSession } from 'next-auth'

import prisma from '@/lib/prisma'

import { authOptions } from './auth/[...nextauth]'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await unstable_getServerSession(req, res, authOptions)
    if (!session) {
      return res.status(401).send('Unauthenticated')
    }
    const { skillId } = req.body
    await prisma.endorsement.create({
      data: {
        skillId: Number(skillId),
        userId: session.id as string,
      },
    })
    return res.status(200).json(true)
  }

  return res.send('Method not allowed')
}

export default withSentry(handler)
