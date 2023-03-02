json.array! @trails do |trail|
    json.extract! trail , :id, :park_id, :name, :description, :length, :elevation, :long, :lat, :trail_type, :created_at, :updated_at
end