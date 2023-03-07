json.extract! @trail, :id, :park_id, :park, :name, :difficulty, :description, :length, :time, :elevation, :long, :lat, :trail_type, :created_at, :updated_at
json.imageUrl @trail.image.attached? ? @trail.image.url : nil
json.imageUrls trail.images.map { |file| file.url }