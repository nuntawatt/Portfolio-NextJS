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

# Build the application
RUN pnpm run build

# --- Production Stage ---
FROM node:22-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

# Start the server
CMD ["node", "dist/main"]
