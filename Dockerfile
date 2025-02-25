FROM ruby:3.1.3-alpine

WORKDIR /app

# Install dependencies
RUN apk add --no-cache build-base gcc cmake git

# Copy files
COPY . .

# Install bundler and gems
RUN gem install bundler && \
    bundle install

# Build the site
RUN bundle exec jekyll build

# Output is in _site directory 