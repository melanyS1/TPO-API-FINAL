# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source and build
COPY . .
RUN npm run build

# --- Runtime stage ---
FROM nginx:1.27-alpine AS runtime

# Remove default config and add our SPA config
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Healthcheck for nginx
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -q -O - http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
