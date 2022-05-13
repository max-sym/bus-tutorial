import { prisma } from "./prisma"
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  VerifyCallback,
} from "passport-jwt"
import { env } from "./env"

const jwtOptions = {
  secretOrKey: env.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
}

const jwtVerify: VerifyCallback = async (payload, done) => {
  try {
    if (payload.type !== "ACCESS") throw new Error("Invalid token type")

    const user = await prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user) return done(null, false)

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export const passportConfig = {
  jwtStrategy,
}
