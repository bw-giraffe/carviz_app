class VizualizationController < ApplicationController

  def home
    @states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"]
    @beers = ["Light Lager", "Pilsner", "European Amber Lager", "Dark Lager", "Bock", "Light Hybrid Beer", "Amber Hybrid Beer", "English Pale Ale", "Scottish And Irish Ale", "Merican Ale", "English Brown Ale", "Porter", "Stout", "India Pale Ale", "German Wheat And Rye Beer", "Belgian And French Ale", "Sour Ale", "Belgian Strong Ale", "Strong Ale", "Fruit Beer", "Vegetable Beer", "Smoke-flavored", "Wood-aged Beer"]
    render :home
  end

end
