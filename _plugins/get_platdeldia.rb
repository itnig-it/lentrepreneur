require 'yaml'
require 'net/http'
require 'uri'
require 'nokogiri'

module Jekyll
  class CsvToYamlGenerator < Generator
    safe true
    priority :high

    def generate(site)
      begin
        url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRvU3aZacpKdYpQIIWc-qZrIpyI9bZmh9s2sZmuKXlCU_uA8wnewhSX833VIkbVpjFmGNwqk-fMGhty/pubhtml"
        
        uri = URI(url)
        http = Net::HTTP.new(uri.host, uri.port)
        http.use_ssl = uri.scheme == 'https'
        request = Net::HTTP::Get.new(uri)
        response = http.request(request)
        
        if response.is_a?(Net::HTTPSuccess)
          doc = Nokogiri::HTML(response.body)
          table = doc.css('table')
          yaml_data = {}
          
          rows = table.css('tr')
          rows[1..-1].each do |row|
            cells = row.css('td')
            next if cells.empty?
            
            checkbox = cells[0].css('svg use').first
            is_checked = checkbox && checkbox['href'] == '#checked-checkbox-id'
            
            day = cells[1]&.text&.strip&.downcase
            main = cells[2]&.text&.strip
            sides = cells[3]&.text&.strip&.split(';')&.map(&:strip)&.reject(&:empty?)
            
            next unless is_checked
            
            yaml_data[day] = {
              'main' => main,
              'sides' => sides
            }
          end
          
          File.open('_data/platdia.yml', 'w:UTF-8') do |f|
            f.write("---\n")
            yaml_data.each do |day, data|
              f.write("#{day}:\n")
              f.write("  main: #{data['main'].inspect}\n")
              f.write("  sides:\n")
              data['sides'].each do |side|
                f.write("  - #{side.inspect}\n")
              end
            end
          end
        end
      rescue => e
      end
    end
  end
end
