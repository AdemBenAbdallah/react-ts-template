FROM node:20-alpine

# Create app group and user
RUN addgroup -S app && adduser -S -G app app

# Set working directory
WORKDIR /app

# Copy package files with the correct ownership
COPY --chown=app:app package.json yarn.lock ./

# Install dependencies as root
USER root
RUN yarn install

# Change ownership of the entire app directory to the app user
RUN chown -R app:app /app

# Switch to app user
USER app

# Copy the rest of the application files with the correct ownership
COPY --chown=app:app . .

# Expose the port
EXPOSE 5173

# Start the application
CMD ["yarn", "dev"]
