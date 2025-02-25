#!/bin/bash

# Exit on error
set -e

# Remove existing Gemfile.lock to avoid version conflicts
rm -f Gemfile.lock

# Install latest bundler
gem install bundler

# Install dependencies with clean environment
bundle install

# Build the site
bundle exec jekyll build 