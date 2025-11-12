This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Dockerで開発環境を構築する方法

1. 開発環境を起動する方法

   ```bash
   docker compose --profile dev up db dev
   ```

   The Next.js dev server is available at [http://localhost:3000](http://localhost:3000) and hot reload works because the repository is bind-mounted into the container.

   開発サーバーは[http://localhost:3000](http://localhost:3000)からアクセスできる。このディレクトリはコンテナにマウントされているので、編集結果はすぐに開発サーバーに反映される。 

2. マイグレーションの適用(このタイミングでprisma crientも生成される)

   ```bash
   docker compose exec  npx prisma migrate dev
   ```

### Useful commands

- Stop the stack: `docker compose down`
- Remove containers and volumes (fresh database): `docker compose down -v`
- Install a new npm package inside the dev container: `docker compose exec npm install <package>`
- Open Prisma Studio: `docker compose exec  npx prisma studio`

## Local (non-Docker) workflow

If you prefer running everything on the host machine, install dependencies once (`npm install`) and start the server with `npm run dev`. You still need a PostgreSQL instance running locally and a valid `DATABASE_URL` in `.env`.


## デプロイ時に設定すべき環境変数

DATABASE_URL(Vercelにデプロイする場合は不要かも)
DISCORD_CLIENT_ID
DISCORD_CLIENT_SECRET
NEXTAUTH_URL
NEXTAUTH_SECRET
ALLOWED_GUILD_ID
GA_ID
の設定を行なってください
