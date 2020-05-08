# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:12.16.3

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
CMD ["node", "build/main.js"]
EXPOSE 4000

RUN mkdir -p /opt/mailman/client2
WORKDIR /opt/mailman

# Install all dependencies of the current project.
COPY package.json package.json
# Client
COPY client2/package.json client2/package.json

RUN npm install && cd client2 && yarn install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build && cd client2 && yarn run build
