This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Docker development stack

The repository ships with a Docker Compose setup that runs the Next.js dev server, PostgreSQL, and Prisma in one command.

1. Copy the default environment file and adjust values if you need to.

   

2. Start the stack (build happens automatically the first time).

   ```bash
   docker compose --profile dev up db dev
   ```

   The Next.js dev server is available at [http://localhost:3000](http://localhost:3000) and hot reload works because the repository is bind-mounted into the container.

3. Apply the Prisma schema whenever you change it (this also generates the Prisma client).

   ```bash
   docker compose exec next npx prisma migrate dev
   ```

### Useful commands

- Stop the stack: `docker compose down`
- Remove containers and volumes (fresh database): `docker compose down -v`
- Install a new npm package inside the dev container: `docker compose exec next npm install <package>`
- Open Prisma Studio: `docker compose exec next npx prisma studio`

## Local (non-Docker) workflow

If you prefer running everything on the host machine, install dependencies once (`npm install`) and start the server with `npm run dev`. You still need a PostgreSQL instance running locally and a valid `DATABASE_URL` in `.env`.
