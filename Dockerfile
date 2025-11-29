# --- build stage ---
FROM node:20-slim AS build
WORKDIR /app

# 1) install deps (uses package-lock for reproducible builds)
COPY package*.json ./
RUN npm ci

# 2) copy source
COPY . .

# 3) build SvelteKit + prune deve deps
RUN npm run build && npm prune --omit=dev 

# --- runtime stage ---
FROM node:20-slim AS runtime
ENV NODE_ENV production

WORKDIR /app

# 4) copy the built server bundle and package files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# 5) app listens on 3000
EXPOSE 3000

# 6) start the built SvelteKit server
CMD ["node", "build"]