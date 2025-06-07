ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS base
WORKDIR /app

# Install dependencies of production
FROM base AS deps
RUN --mount=type=bind,source=package.json,target=package.json \
    npm install --omit=dev

# Install dependencies of development
FROM base AS build
RUN --mount=type=bind,source=package.json,target=package.json \
    npm install
COPY ./ ./
RUN npm run build

FROM base AS prod
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json .
COPY ./.env .env

CMD ["npm", "run", "start:prod"]
