import { PrismaClient } from '@prisma/client'
import { connect } from '@tidbcloud/serverless'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

const prismaClientSingleton = () => {
  // Use connection string from env
  const connectionString = process.env.DATABASE_URL
  
  if (!connectionString) {
    return new PrismaClient()
  }

  // Initialize TiDB connection over HTTP
  const connection = connect({ url: connectionString })
  const adapter = new PrismaTiDBCloud(connection)
  
  return new PrismaClient({ adapter })
}

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
