import type { AuthChecker } from 'type-graphql'
import jwt from 'jsonwebtoken'
import type { JwtPayload as DefaultJwtPayload } from 'jsonwebtoken'
import type { Context } from '@/utils/graphql'
import { PermissionName } from 'csci32-database'

interface JwtPayload extends DefaultJwtPayload {
  sub: string
  email: string
  role?: string
  permissions?: PermissionName[]
}

export const customAuthChecker: AuthChecker<Context> = (
  { context },
  requiredPermissions,
) => {
  const authHeader = context.request.headers.authorization

  if (!authHeader) {
    return false
  }

  try {
    const token = authHeader.replace('Bearer ', '')

    const decodedToken = jwt.verify(
      token,
      process.env.PRIVATE_KEY as string,
      {
        algorithms: [
          (process.env.ALGORITHM ?? 'ES256') as jwt.Algorithm,
        ],
      },
    )

    if (!requiredPermissions.length) {
      return true
    }

    const isPayloadObject = typeof decodedToken === 'object'

    const payload = isPayloadObject
      ? (decodedToken as JwtPayload)
      : null

    if (!payload) {
      return false
    }

    const userPerms = payload.permissions ?? []

    return requiredPermissions.every((perm) =>
      userPerms.includes(perm as PermissionName),
    )
  } catch {
    return false
  }
}
