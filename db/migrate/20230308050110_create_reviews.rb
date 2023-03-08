class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :body
      t.text :type
      t.bigint :author_id
      t.bigint :park_or_trail_id

      t.timestamps
    end
  end
end
