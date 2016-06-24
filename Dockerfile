FROM node:argon

# Create app directory
RUN mkdir -p /opt/myVerses
WORKDIR /opt/myVerses

# Copy app
COPY . /opt/myVerses

# Install and Deploy
RUN npm run deploy

# Add Volume for user-database
VOLUME /opt/myVerses/database

# Expose Web Port and Set Start Command
EXPOSE 8080
CMD [ "npm", "start" ]
