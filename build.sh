#!/bin/bash

# Exit on error
set -e

# Install latest bundler
gem install bundler

# Install dependencies
bundle install

# Build the site
bundle exec jekyll build 