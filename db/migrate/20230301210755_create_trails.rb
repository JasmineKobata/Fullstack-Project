class CreateTrails < ActiveRecord::Migration[7.0]
  def change
    create_table :trails do |t|
      t.bigint :park_id, null: false
      t.string :name, null: false
      t.string :description, null: false
      t.string :length, null: false
      t.integer :elevation, null: false
      t.string :long, null: false
      t.string :lat, null: false
      t.string :type, null: false

      t.timestamps
    end
    add_index :trails, :park_id, unique: true
    add_index :trails, :name, unique: true
  end
end
