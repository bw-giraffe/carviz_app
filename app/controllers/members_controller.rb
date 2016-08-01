class MembersController < ApplicationController
  
  def beer
    p "you hit the beer api!!!"
    brew = params['memberBeer']
    @members = Member.where(:beer => brew)
    render json: {matchingMembers: @members}
  end

  def state
    p "You hit the state api!!!!"
    state = params['memberState']
    @members = Member.where(:state => state)
    render json: {matchingMembers: @members}
  end 

end
