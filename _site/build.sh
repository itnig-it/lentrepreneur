#!/bin/bash

# Exit on error
set -e

# Install specific bundler version
gem install bundler -v 2.3.26

# Install dependencies
bundle install

# Build the site
bundle exec jekyll build 