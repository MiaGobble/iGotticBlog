# frozen_string_literal: true

require "yaml"

Jekyll::Hooks.register :posts, :post_init do |post|
  custom = nil
  begin
    raw = File.read(post.path)
    if raw =~ /\A---\s*\n(.*?)\n---/m
      blob = Regexp.last_match(1)
      front = if YAML.method(:safe_load).parameters.include?([:key, :permitted_classes])
                YAML.safe_load(blob, permitted_classes: [Date, Time])
              else
                YAML.safe_load(blob, [Date, Time])
              end
      custom = front["url"] if front.is_a?(Hash)
    end
  rescue StandardError
    custom = nil
  end

  next if custom.nil?

  path = custom.to_s.strip
  next if path.empty?

  path = "/#{path}" unless path.start_with?("/")
  path = "#{path}/" unless path.end_with?("/") || path.end_with?(".html")
  post.data["permalink"] = path
end
