# Base image
FROM node:22-alpine AS development

# Create app directory
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy source code
COPY . .

# Install dependencies
RUN pnpm install

# Generate Prisma Client
RUN pnpm run prisma:generate

# Build the application
RUN pnpm run build

# --- Production Stage ---
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN npm install -g pnpm && pnpm install --prod

# Copy built application and generated Prisma Client from development stage
COPY --from=development /usr/src/app/dist ./dist
COPY --from=development /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=development /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

EXPOSE 3001

# Start the server
CMD ["node", "dist/main"]

