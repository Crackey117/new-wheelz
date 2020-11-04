class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :street_address, null: false 
      t.string :city, null: false 
      t.string :state, null: false 
      t.string :size, null: false 
      t.string :description, null: false
      t.string :traffic_level 
      t.integer :smoothness 
      t.timestamps
    end
  end
end