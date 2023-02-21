# Get Nginx image from Docker hub
FROM nginx

COPY default.conf.template /etc/nginx/conf.d/default.conf.template

CMD /bin/bash -c “envsubst ‘\$PORT’ < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf” && nginx -g ‘daemon off;’

# Update available packages in Debian
RUN apt-get update
# Install curl cmd line tool
RUN apt-get install curl -y
# Fetch latest node v10.x from nodesource
RUN curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh
# Run setup script
RUN bash nodesource_setup.sh
# install nodejs and npm
RUN apt-get update && apt-get upgrade -y && \
    apt-get install -y nodejs \
    npm

# Copy everything
COPY . .
# Do a clean install based on package-lock file
RUN npm ci
# Build frontend
RUN npm run build
# Expose port picked by Heroku. Otherwise we couldn't connect to the server running inside a docker container
EXPOSE $PORT
