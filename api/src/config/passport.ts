// import { prisma } from "@prisma/client"
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"
import { env } from "./env"
import { tokenTypes } from "./tokens"

const jwtOptions = {
  secretOrKey: env.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type")
    }
    const user = null //await prisma.user.findById(payload.sub)
    if (!user) {
      return done(null, false)
    }
    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export const passportConfig = {
  jwtStrategy,
}
