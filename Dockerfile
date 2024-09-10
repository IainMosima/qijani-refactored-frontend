FROM node:16


WORKDIR /usr/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY .env.local ./

COPY .next ./.next

COPY next-env.d.ts ./

COPY next.config.js ./

EXPOSE 3000

# Define the command to run your app.
CMD ["npm", "run", "start"]
