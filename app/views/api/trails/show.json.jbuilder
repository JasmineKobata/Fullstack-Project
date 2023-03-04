# json.trail do
    json.extract! @trail, :id, :park_id, :park, :name, :difficulty, :description, :length, :time, :elevation, :long, :lat, :trail_type, :created_at, :updated_at
# end