class AddLatLngToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :lat, :decimal, {:precision=>10, :scale=>6, :null=>false}
    add_column :locations, :lng, :decimal, {:precision=>10, :scale=>6, :null=>false}
  end
end