import { PrismaClient } from '@prisma/client'
import { connect } from '@tidbcloud/serverless'
import { PrismaTiDBCloud } from '@tidbcloud/prisma-adapter'

const prismaClientSingleton = () => {
  // Use connection string from env or a dummy string to prevent build crash on Edge
  const connectionString = process.env.DATABASE_URL || "mysql://dummy:dummy@dummy:4000/test"
  
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
