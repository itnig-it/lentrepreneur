source "https://rubygems.org"

# Jekyll and its dependencies
gem "jekyll", "~> 4.2.0"

# Jekyll plugins
gem "jekyll-feed", "~> 0.12"

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.1", :platforms => [:mingw, :x64_mingw, :mswin]

# Lock webrick to ensure compatibility with Ruby 3.0+
gem "webrick", "~> 1.7"

# Explicitly specify ffi version compatible with Ruby 3.1
gem "ffi", "~> 1.15.5" 