import { prisma } from "../database/prisma";

export class SessionRepository {
  async createSession(data: {
    userId: string;
    userAgent?: string;
    ipAddress?: string;
    expiresAt: Date;
  }) {
    return prisma.session.create({
      data,
    });
  }

  async createRefreshToken(data: {
    tokenHash: string;
    userId: string;
    sessionId: string;
    expiresAt: Date;
  }) {
    return prisma.refreshToken.create({
      data,
    });
  }

  async findRefreshToken(tokenHash: string) {
    return prisma.refreshToken.findUnique({
      where: {
        tokenHash,
      },
      include: {
        user: true,
        session: true,
      },
    });
  }

  async revokeRefreshToken(id: string) {
    return prisma.refreshToken.update({
      where: {
        id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async revokeSession(sessionId: string) {
    await prisma.$transaction([
      prisma.refreshToken.updateMany({
        where: {
          sessionId,
          revokedAt: null,
        },
        data: {
          revokedAt: new Date(),
        },
      }),

      prisma.session.update({
        where: {
          id: sessionId,
        },
        data: {
          expiresAt: new Date(),
        },
      }),
    ]);
  }

  async rotateRefreshToken(
    oldTokenId: string,
    newToken: {
      tokenHash: string;
      userId: string;
      sessionId: string;
      expiresAt: Date;
    },
  ) {
    return prisma.$transaction(async (tx) => {
      await tx.refreshToken.update({
        where: {
          id: oldTokenId,
        },
        data: {
          revokedAt: new Date(),
        },
      });

      return tx.refreshToken.create({
        data: newToken,
      });
    });
  }
}