FROM node:20-alpine
WORKDIR /app
# Copy everything from server, including the node_modules you just created
COPY server/ .
EXPOSE 8181
CMD ["node", "index.js"]