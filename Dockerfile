# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# 1) install deps (uses package-lock for reproducible builds)
COPY package*.json ./
RUN npm ci

# 2) copy source
COPY . .

# 3) build SvelteKit + prune deve deps
RUN npm run build && npm prune --omit=dev 

# --- runtime stage ---
FROM node:20-alpine
WORKDIR /app

# 4) copy the built server bundle and package files
COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./

# 5) install only prod deps
RUN npm ci --omit=dev

# 6) app listens on 3000
EXPOSE 3000

# 7) start the built SvelteKit server
CMD ["node", "build"]