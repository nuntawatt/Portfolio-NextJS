# --- Stage 1: Build & Development ---
FROM node:22-alpine AS development

WORKDIR /usr/src/app

RUN npm install -g pnpm

# Cache optimization: copy package lists first so code changes don't invalidate pnpm cache
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install

COPY . .

# Generate engine binaries inside dev node_modules before compiling code
RUN pnpm run prisma:generate && pnpm run build


# --- Stage 2: Production ---
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY prisma ./prisma

# Install production dependencies only (strips development test frameworks/compilers)
# and regenerate client mapping for the production node_modules directory
RUN npm install -g pnpm && pnpm install --prod && pnpm run prisma:generate

# Copy compiled JS outputs only, keeping raw TS source code out of the production image
COPY --from=development /usr/src/app/dist ./dist

# Change ownership of all files to node user to prevent runtime permission issues
RUN chown -R node:node /usr/src/app

# Switch to non-root "node" user
USER node

EXPOSE 3001

CMD ["node", "dist/src/main"]
